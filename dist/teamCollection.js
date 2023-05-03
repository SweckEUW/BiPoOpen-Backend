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
exports.teamCollection = void 0;
let teamsCollection;
class teamCollection {
    static retrieveTeamCollection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (teamsCollection)
                return;
            try {
                teamsCollection = yield client.db('bipoopen').collection("teams");
                if (teamsCollection)
                    console.log("Retrieved teamsCollection");
                else
                    console.error("Error retrieving teamsCollection");
            }
            catch (error) {
                console.error("cant connect to teamsCollection database" + error);
            }
        });
    }
    static getTeams(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let teams = yield teamsCollection.find().toArray();
            if (teams)
                response.json({ success: true, message: 'Teams gefunden', teams: teams });
            else
                response.json({ success: false, message: 'Keine Teams gefunden' });
        });
    }
    static createTeam(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournament = request.body;
            // Add tournament to collection
            yield teamsCollection.insertOne(tournament);
            response.json({ success: true, message: 'Team erstellt' });
        });
    }
}
exports.teamCollection = teamCollection;
