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
const mongodb_1 = require("mongodb");
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
    static getTournamentByName(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournamentName = request.body.tournamentName;
            let tournaments = yield tournamentsCollection.find().toArray();
            let tournament = tournaments.find((tournament) => tournament.name == tournamentName);
            if (tournaments)
                response.json({ success: true, message: 'Tournament "' + tournamentName + '" gefunden', tournament: tournament });
            else
                response.json({ success: false, message: 'Keine Tournaments gefunden' });
        });
    }
    static createTournament(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournament = request.body;
            // DEBUG!!
            if (tournament.teams)
                for (let i = 0; i < tournament.teams.length; i++)
                    tournament.teams[i]._id = new mongodb_1.ObjectId().toString();
            // Add tournament to collection
            yield tournamentsCollection.insertOne(tournament);
            response.json({ success: true, message: 'Tournament "' + tournament.name + '" erstellt' });
        });
    }
    // Teams
    static addTeam(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let team = request.body.team;
            team._id = new mongodb_1.ObjectId().toString();
            let tournamentID = request.body.tournamentID;
            yield tournamentsCollection.updateOne({ "_id": { $eq: mongodb_1.ObjectId.createFromHexString(tournamentID) } }, { $push: { teams: team } });
            response.json({ success: true, message: 'Team "' + team.name + '" hinzugefügt' });
        });
    }
    static editTeam(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let team = request.body.team;
            let tournamentID = request.body.tournamentID;
            // TODO: Replace complete team element instead of single team values
            yield tournamentsCollection.updateOne({ "_id": { $eq: mongodb_1.ObjectId.createFromHexString(tournamentID) }, "teams._id": team._id }, { $set: { "teams.$.name": team.name, "teams.$.players": team.players } });
            response.json({ success: true, message: 'Team "' + team.name + '" bearbeitet' });
        });
    }
    static removeTeam(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournamentID = request.body.tournamentID;
            let teamID = request.body.teamID;
            yield tournamentsCollection.updateOne({ "_id": { $eq: mongodb_1.ObjectId.createFromHexString(tournamentID) } }, { $pull: { teams: { _id: teamID } } });
            response.json({ success: true, message: 'Team gelöscht' });
        });
    }
    static setGroups(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournamentID = request.body.tournamentID;
            let groups = request.body.groups;
            yield tournamentsCollection.updateOne({ "_id": { $eq: mongodb_1.ObjectId.createFromHexString(tournamentID) } }, { $set: { "groupPhase.groups": groups } });
            response.json({ success: true, message: 'Gruppen gesetzt' });
        });
    }
    static setMatchesGroupPhase(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournamentID = request.body.tournamentID;
            let matches = request.body.matches;
            matches.forEach((matchesForGroup) => {
                matchesForGroup.forEach((match) => {
                    match._id = new mongodb_1.ObjectId().toString();
                });
            });
            yield tournamentsCollection.updateOne({ "_id": { $eq: mongodb_1.ObjectId.createFromHexString(tournamentID) } }, { $set: { "groupPhase.matches": matches } });
            response.json({ success: true, message: 'Matches für Gruppenphase gesetzt' });
        });
    }
    static setMatchesKOPhase(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let tournamentID = request.body.tournamentID;
            let matches = request.body.matches;
            matches.forEach((stage) => {
                stage.forEach((match) => {
                    match._id = new mongodb_1.ObjectId().toString();
                });
            });
            yield tournamentsCollection.updateOne({ "_id": { $eq: mongodb_1.ObjectId.createFromHexString(tournamentID) } }, { $set: { "koPhase.matches": matches } });
            response.json({ success: true, message: 'Matches für KO-Phase gesetzt' });
        });
    }
}
exports.tournamentCollection = tournamentCollection;
