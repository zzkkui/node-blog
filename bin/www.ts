import * as http from "http";
import severHandle from "../src/app";

const PORT = 8000;

const server = http.createServer(severHandle);

server.listen(PORT);
