# StrictCSV (*.s.csv)

StrictCSVはCSVの厳格な形式です。

## 機能

- BOM付きUTF-8文字コード
- LFの改行コード
- ヘッダー行が必須
- 0件のレコードを許可
- ダブルクォート、コンマ、改行を含む場合はダブルクォートで囲む
- 存在しないフィールドは前行のものが省略されたものと見なされる

## 使い方

```js
import { StrictCSV } from "https://code4fukui.github.io/StrictCSV/js/StrictCSV.js";

const data = await StrictCSV.load("test.s.csv") || [{ name: "a", val: 1 }, { name: "b", val: 1 }];

const s = StrictCSV.stringify(data);
console.log(s);

const data2 = StrictCSV.parse(s);
console.log(data2);
```

## ライセンス

MIT License