class StrictCSV {
  static parse(s) {
    return this.toJSON(this.decode(s));
  }
  static stringify(json) {
    return this.encode(this.fromJSON(json));
  }
  static fetch = async (url) => {
    try {
      const txt = await (await fetch(url)).text();
      return this.parse(txt);
    } catch (e) {
    }
    return null;
  }
  static load = async (fn) => {
    try {
      const txt = await Deno.readTextFile(fn);
      return this.parse(txt);
    } catch (e) {
    }
    return null;
  }
  // util
  static addBOM(s) {
    return "\ufeff" + s;
  }
  static removeBOM(s) {
    if (s && s.charAt(0) === "\ufeff") {
      return s.substring(1);
    }
    return s;
  }
  static decode(s) {
    s = this.removeBOM(s);
    const res = [];
    let st = 0;
    let line = [];
    let sb = null;
    if (!s.endsWith("\n")) s += "\n";
    const len = s.length;
    for (let i = 0; i < len; i++) {
      const c = s.charAt(i);
      if (c === "\r") continue;
      if (st === 0) {
        if (c === "\n") {
          if (line.length > 0) line.push("");
          res.push(line);
          line = [];
        } else if (c == ",") {
          line.push("");
        } else if (c == '"') {
          sb = "";
          st = 2;
        } else {
          sb = c;
          st = 1;
        }
      } else if (st === 1) {
        if (c === "\n") {
          line.push(sb);
          res.push(line);
          line = [];
          st = 0;
          sb = null;
        } else if (c === ",") {
          line.push(sb);
          sb = null;
          st = 0;
        } else {
          sb += c;
        }
      } else if (st === 2) {
        if (c === '"') {
          st = 3;
        } else {
          sb += c;
        }
      } else if (st === 3) {
        if (c === '"') {
          sb += c;
          st = 2;
        } else if (c === ",") {
          line.push(sb);
          sb = null;
          st = 0;
        } else if (c === "\n") {
          line.push(sb);
          res.push(line);
          line = [];
          st = 0;
          sb = null;
        }
      }
    }
    if (sb != null) {
      line.push(sb);
    }
    if (line.length > 0) {
      res.push(line);
    }
    return res;
  }
  static encode(csvar) {
    let s = [];
    for (let i = 0; i < csvar.length; i++) {
      let s2 = [];
      const line = csvar[i];
      for (let j = 0; j < line.length; j++) {
        const v = line[j];
        if (v == undefined || v.length == 0) {
          s2.push("");
        } else if (typeof v == "number") {
          s2.push(v);
        } else if (typeof v != "string") {
          s2.push('"' + v + '"');
        } else if (v.indexOf('"') >= 0) {
          s2.push('"' + v.replace(/\"/g, '""') + '"');
        } else if (v.indexOf(",") >= 0 || v.indexOf("\n") >= 0) {
          s2.push('"' + v + '"');
        } else {
          s2.push(v);
        }
      }
      s.push(s2.join(","));
    }
    return this.addBOM(s.join("\n")) + "\n";
  }
  static checkHeader(head) {
    const d = {};
    for (const n of head) {
      if (d[n]) {
        throw new Error("duplicated header name");
      }
      d[n] = head;
    }
  }
  static toJSON(csv) {
    const res = [];
    const head = csv[0];
    this.checkHeader(head);
    let last = csv[1];
    for (let i = 1; i < csv.length; i++) {
      const d = {};
      const csvi = csv[i];
      const l = head.length - csvi.length;
      if (!l) {
        for (let j = 0; j < head.length; j++) {
          d[head[j]] = csvi[j];
        }
        last = csvi;
      } else if (l > 0) {
        for (let j = 0; j < csvi.length; j++) {
          d[head[j]] = last[j] = csvi[j];
        }
        for (let j = csvi.length; j < head.length; j++) {
          d[head[j]] = last[j];
        }
      } else {
        throw new Error("header too short:", csvi);
      }
      res.push(d);
    }
    return res;
  }
  static fromJSON(json) {
    if (!Array.isArray(json)) {
      throw new Error("is not array!");
    }
    const head = [];
    for (const d of json) {
      for (const name in d) {
        if (head.indexOf(name) == -1) {
          head.push(name);
        }
      }
    }
    const last = {};
    const res = [head];
    for (const d of json) {
      const line = [];
      let match = 0;
      for (let j = head.length - 1; j >= 0; j--) {
        if (d[head[j]] != last[head[j]]) {
          break;
        }
        match++;
      }
      for (let i = 0; i < head.length - match; i++) {
        const v = d[head[i]];
        if (v == undefined) {
          line.push("");
        } else {
          line.push(v);
        }
        last[head[i]] = v;
      }
      res.push(line);
    }
    return res;
  }
}

export { StrictCSV };
