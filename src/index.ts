import express, { Express} from "express";
import cors from "cors";
import {MongoClient, ServerApiVersion} from "mongodb"
import * as dotenv from "dotenv";

import {tournamentCollection} from "./tournamentCollection"
import {teamCollection} from "./teamCollection"

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORT}@cluster0.wpwuaak.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect()
.catch(error => { 
  console.error(error);
  process.exit(1);
}).then(async client =>{
  console.log("Connected to Database")

  await tournamentCollection.retrieveTournamentsCollection(client);
  await teamCollection.retrieveTeamCollection(client);

  app.listen(process.env.PORT, () =>{
    console.log('Server started')
  });
})

app.post('/createTournament', tournamentCollection.createTournament);
app.get('/tournaments', tournamentCollection.getTournaments);

app.post('/createTeam', teamCollection.createTeam);
app.get('/teams', teamCollection.getTeams);

// let filename = fileURLToPath(import.meta.url);
// let dirname = path.dirname(filename);
// app.use(express.static(path.join(dirname, 'public')));