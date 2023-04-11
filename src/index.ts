import express, { Express, Request, Response} from "express";
import cors from "cors";
// const dotenv = require('dotenv');

// dotenv.config();
const port = 8000; //process.env.PORT

const app: Express = express();
app.use(cors());

app.get('/', (request: Request, response: Response) => {
  response.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});