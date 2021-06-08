import * as t from "https://deno.land/std/testing/asserts.ts";
import { StrictCSV } from "./StrictCSV.js";

Deno.test("parse", async () => {
  const s = StrictCSV.parse(await Deno.readTextFile("../test.s.csv"));
  const chk = [
    { code: "1", name: "abc", category: "a" },
    { code: "2", name: "def", category: "a" },
    { code: "3", name: "ghi", category: "b" },
    { code: "4", name: "jkl", category: "b" },
    { code: "5", name: "mno", category: "b" },
  ];
  t.assertEquals(s, chk);
});
Deno.test("stringify", async () => {
  const json = [
    { code: "1", name: "abc", category: "a" },
    { code: "2", name: "def", category: "a" },
    { code: "3", name: "ghi", category: "b" },
    { code: "4", name: "jkl", category: "b" },
    { code: "5", name: "mno", category: "b" },
  ];
  const chk = StrictCSV.stringify(json);
  const s = StrictCSV.addBOM(await Deno.readTextFile("../test.s.csv"));
  t.assertEquals(s, chk);
});
Deno.test("too long data", async () => {
  t.assertThrows(() => {
    const s = "a,b\n1,2,3\n";
    StrictCSV.parse(s);
  });
});
Deno.test("duplicated header name", async () => {
  t.assertThrows(() => {
    const s = "a,a\n1,2,3\n";
    StrictCSV.parse(s);
  });
});
Deno.test("null start", async () => {
  const s = "a,b\n1\n";
  const json = StrictCSV.parse(s);
  t.assertEquals(json, [{ a: "1", b: undefined }]);
});
Deno.test("null data", async () => {
  const s = "a,b\n1,\n";
  const json = StrictCSV.parse(s);
  t.assertEquals(json, [{ a: "1", b: "" }]);
});
