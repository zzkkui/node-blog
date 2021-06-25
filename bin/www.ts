const http = require("http");
import severHandle from "../src/app";

const PORT = 3000;

const server = http.createServer(severHandle);

server.listen(PORT);
