import * as fs from "fs";
import * as path from "path";

const env = process.env.NODE_ENV || "dev";
export const logPath =
  env === "production"
    ? "C:/Users/13210/Desktop/learn/node/blog/logs"
    : "C:/Users/13210/Desktop/learn/node/blog/logs";

function createWriteStream(filename: string) {
  const fullFilename = path.join(logPath, filename);
  return fs.createWriteStream(fullFilename, {
    flags: "a" // 追加 ，覆盖为 'w'
  });
}

function writeLog(writeStream: fs.WriteStream, log: string) {
  if (env === "production") {
    writeStream.write(`${log}\n`);
  } else {
    console.log(`${log}\n`);
  }
}

const accessWriteStream = createWriteStream("access.log");
const eventWriteStream = createWriteStream("event.log");
const errorWriteStream = createWriteStream("error.log");

export function access(log: string) {
  writeLog(accessWriteStream, log);
}

export function event(log: string) {
  writeLog(eventWriteStream, log);
}

export function error(log: string) {
  writeLog(errorWriteStream, log);
}
