import express, { Express, Request, Response} from "express";
import cors from "cors";
import {MongoClient, ServerApiVersion} from "mongodb"
import * as dotenv from "dotenv";

import {tournamentCollection} from "./tournamentCollection"

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

  await tournamentCollection.retrieveUsersCollection(client);

  app.listen(process.env.PORT, () =>{
    console.log('Server started')
  });
})

app.post('/createTournament', tournamentCollection.createTournament);
app.get('/tournaments', tournamentCollection.getTournaments);

// // MotileParts
// app.get('/MotileParts', motilePartsCollection.getMotileParts);

// // Login/Register
// app.post('/Login', UsersCollection.login);
// app.post('/LoginJWT', Middleware.verifyJWT, UsersCollection.loginJWT);
// app.post('/StayAlive', Middleware.verifyJWT, UsersCollection.stayAlive);
// app.post('/Register', UsersCollection.addUser);
// app.get('/VerifyEmail', UsersCollection.verifyUser);

// // UserData
// app.post('/User/Data', Middleware.verifyJWT, UsersCollection.getUserDataFromUser);
// app.post('/User/Data/AddAddress', Middleware.verifyJWT, userDataCollection.addAddress);
// app.post('/User/Data/RemoveAddress', Middleware.verifyJWT, userDataCollection.removeAddress);
// app.post('/User/Data/UploadProfilePic',  multer({ storage: ImageUploadHandler.getStorage() }).single('file'), Middleware.verifyJWT, userDataCollection.updateProfilePic);
// app.post('/User/Data/Modify', Middleware.verifyJWT, userDataCollection.modifyUserData);

// // UserConfigurations
// app.post('/User/Configs', Middleware.verifyJWT, UsersCollection.getConfigFromUser);
// app.post('/User/Configs/Remove', Middleware.verifyJWT, UserConfigsCollection.removeUserConfiguration);
// app.post('/User/Configs/Add', Middleware.verifyJWT, UserConfigsCollection.addUserConfiguration);
// app.post('/User/Configs/GenerateThumbnail', Middleware.verifyJWT, BlenderJobs.renderThumbnail);
// app.post('/User/Configs/Buy', Middleware.verifyJWT, UserConfigsCollection.setUserConfigToBought)

// // static assets - public folder
// let filename = fileURLToPath(import.meta.url);
// let dirname = path.dirname(filename);
// app.use(express.static(path.join(dirname, 'public')));

// export default app