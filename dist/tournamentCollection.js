"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentCollection = void 0;
const bson_1 = require("bson");
let tournamentsCollection;
class tournamentCollection {
    static retrieveTournamentsCollection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tournamentsCollection)
                return;
            try {
                tournamentsCollection = yield client.db('bipoopen').collection("tournaments");
                if (tournamentsCollection)
                    console.log("Retrieved tournamentCollection");
                else
                    console.error("Error retrieving tournamentCollection");
            }
            catch (error) {
                console.error("cant connect to tournamentCollection database" + error);
            }
        });
    }
    // General
    static getTournaments(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournaments = yield tournamentsCollection.find().toArray();
            if (tournaments)
                response.json({ success: true, message: 'Tournaments gefunden', tournaments: tournaments });
            else
                response.json({ success: false, message: 'Keine Tournaments gefunden' });
        });
    }
    static createTournament(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournament = request.body;
            // Add tournament to collection
            yield tournamentsCollection.insertOne(tournament);
            response.json({ success: true, message: 'Tournament erstellt' });
        });
    }
    // Teams
    static addTeam(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let team = request.body.team;
            let tournamentID = request.body.tournamentID;
            yield tournamentsCollection.updateOne({ "_id": { $eq: bson_1.ObjectId.createFromHexString(tournamentID) } }, { $push: { teams: team } });
            response.json({ success: true, message: 'Team hinzugefügt' });
        });
    }
    static editTeam(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let team = request.body.team;
            let tournamentID = request.body.tournamentID;
            let selectedTeamName = request.body.selectedTeamName;
            // TODO: Replace complete team element instead of single team values
            yield tournamentsCollection.updateOne({ "_id": { $eq: bson_1.ObjectId.createFromHexString(tournamentID) }, "teams.name": selectedTeamName }, { $set: { "teams.$.name": team.name, "teams.$.players": team.players } });
            response.json({ success: true, message: 'Team bearbeitet' });
        });
    }
    static removeTeam(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournamentID = request.body.tournamentID;
            let selectedTeamName = request.body.selectedTeamName;
            yield tournamentsCollection.updateOne({ "_id": { $eq: bson_1.ObjectId.createFromHexString(tournamentID) } }, { $pull: { teams: { name: selectedTeamName } } });
            response.json({ success: true, message: 'Team gelöscht' });
        });
    }
}
exports.tournamentCollection = tournamentCollection;
