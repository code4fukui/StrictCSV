import { StrictCSV } from "./StrictCSV.js";

const data = await StrictCSV.load("test.s.csv");

const s = StrictCSV.stringify(data);
console.log(s);

const data2 = StrictCSV.parse(s);
console.log(data2);
