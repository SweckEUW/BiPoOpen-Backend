"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// const dotenv = require('dotenv');
// dotenv.config();
const port = 8000; //process.env.PORT
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (request, response) => {
    response.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
