"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORT}@cluster0.wpwuaak.mongodb.net/?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
client.connect()
    .catch(error => {
    console.error(error);
    process.exit(1);
}).then((client) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
        console.log('Server started');
    });
}));
app.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send('Express + TypeScript Server New');
}));
app.get('/restaurants', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let collection = yield client.db('sample_restaurants').collection("restaurants").find().toArray();
    response.send(collection);
}));
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
