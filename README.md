# StrictCSV *.s.csv

StrictCSV is a strict CSV format

## usage 使い方

```js
import { StrictCSV } from "https://code4fukui.github.io/StrictCSV/js/StrictCSV.js";

const data = await StrictCSV.load("test.s.csv") || [{ name: "a", val: 1 }, { name: "b", val: 1 }];

const s = StrictCSV.stringify(data);
console.log(s);

const data2 = StrictCSV.parse(s);
console.log(data2);
```

## format 書式

### 書式

- 文字コードはBOM付きUTF-8
- 改行コードはLF
- ヘッダー行は必須
- レコード0件を許容する
- ダブルクォート、コンマ、改行を含める場合はダブルクォートで囲む（ダブルクォートは2つにする）
- 存在しないフィールドは前行以前に存在したフィールドが省略されたものとする

### format

- character encoding is UTF-8 with BOM
- newline code is LF
- header line is required
- allow no records
- use double quotes to include commas, line breaks and double quotes (double double quote)
- field that doesn't exist is assumed to be an omitted field that existed before the previous line

## ABNF

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

## reference

- [blog by Taisuke Fukuno](https://fukuno.jig.jp/3240)
- [rfc4180 - Common Format and MIME Type for Comma-Separated Values (CSV) Files](https://datatracker.ietf.org/doc/html/rfc4180)
