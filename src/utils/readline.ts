import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { logPath } from "./log";

// 运行 ./node_modules/.bin/ts-node readline.ts

const fillName = (filename: string) => path.join(logPath, filename);

const readStream = (filename: string) =>
  fs.createReadStream(fillName(filename));

const logCategory = (filename: string) => readStream(filename);

// 逐行读取
const rlAccess = readline.createInterface({
  input: logCategory("access.log")
});

let chromeNum = 0;
let sum = 0;

rlAccess.on("line", (lineData) => {
  if (!lineData) {
    return;
  }
  sum++;

  const arr = lineData.split("--");
  if (arr[2] && arr[2].indexOf("Chrome") > 0) {
    chromeNum++;
  }
});

rlAccess.on("close", () => {
  console.log(`chrome 占比: ${chromeNum / sum}`);
});
