# StrictCSV *.s.csv

StrictCSV is the stricted CSV format

## usage 使い方

```js
import { StrictCSV } from "https://code4fukui.github.io/StrictCSV/js/StrictCSV.js";

const data = await StrictCSV.load("test.s.csv");

const s = StrictCSV.stringify(data);
console.log(s);

const data2 = StrictCSV.parse(s);
console.log(data2);
```

## format 書式

### 書式

- 文字コードはBOM付きUTF-8)
- 改行コードはLF)
- ヘッダー行は必須)
- レコード0件を許容)
- CSVと同様のダブルクォートエスケープ)

### format

- charset is UTF-8 with BOM
- newline code is LF
- must have header line
- accept no records
- escape with double quote same as CSV

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
