# StrictCSV (*.s.csv)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

StrictCSV is a strict CSV format.

## Usage

```js
import { StrictCSV } from "https://code4fukui.github.io/StrictCSV/js/StrictCSV.js";

const data = await StrictCSV.load("test.s.csv") || [{ name: "a", val: 1 }, { name: "b", val: 1 }];

const s = StrictCSV.stringify(data);
console.log(s);

const data2 = StrictCSV.parse(s);
console.log(data2);
```

## Format

### Specification

- File extension is `.s.csv`
- Character encoding is UTF-8 with BOM
- Newline code is LF
- Header line is required
- Allows zero records
- Use double quotes to include commas, line breaks, and double quotes (double quotes are escaped as two double quotes)
- Missing fields are assumed to be omitted fields that existed before the previous line (not compatible with CSV)

### ABNF

```abnf
file = BOM header *(LF record) [LF]
header = name *(COMMA name)
record = field *(COMMA field)
name = field
field = (escaped / non-escaped)
escaped = DQUOTE *(TEXTDATA / COMMA / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA = %x2C
DQUOTE = %x22
LF = %x0A
TEXTDATA = %x20-21 / %x23-2B / %x2D-D7FF / %xE000-10FFFF
BOM = %xFEFF
```

## References

- [Blog by Taisuke Fukuno](https://fukuno.jig.jp/3240)
- [RFC4180 - Common Format and MIME Type for Comma-Separated Values (CSV) Files](https://datatracker.ietf.org/doc/html/rfc4180)

## License

MIT