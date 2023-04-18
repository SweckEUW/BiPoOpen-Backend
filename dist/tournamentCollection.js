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
let tournamentsCollection;
class tournamentCollection {
    static retrieveUsersCollection(client) {
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
            // TODO: Add tournament to collection
            const result = yield tournamentsCollection.insertOne(tournament);
            response.json({ success: true, message: 'Tournament erstellt' });
        });
    }
}
exports.tournamentCollection = tournamentCollection;
