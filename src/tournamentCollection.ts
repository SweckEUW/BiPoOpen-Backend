import {Collection, MongoClient} from "mongodb"
import {Request, Response} from "express";
import { ObjectId } from "bson";

let tournamentsCollection: Collection;

export class tournamentCollection{
    static async retrieveTournamentsCollection(client : MongoClient){
        if(tournamentsCollection)
            return 
        
        try{
            tournamentsCollection = await client.db('bipoopen').collection("tournaments");
            if(tournamentsCollection)
                console.log("Retrieved tournamentCollection")
            else
                console.error("Error retrieving tournamentCollection")
        }catch(error){
            console.error("cant connect to tournamentCollection database" + error);
        }
    }

    // General
    static async getTournaments(request: Request, response: Response){
        let tournaments = await tournamentsCollection.find().toArray();

        if(tournaments)
            response.json({success: true, message: 'Tournaments gefunden', tournaments: tournaments});
        else    
            response.json({success: false, message: 'Keine Tournaments gefunden'}); 
    }

    static async createTournament(request: Request, response: Response) {
        let tournament = request.body;

        // Add tournament to collection
        await tournamentsCollection.insertOne(tournament);

        response.json({success: true, message: 'Tournament erstellt'});
    }


    // Teams
    static async addTeam(request: Request, response: Response) {
        let team = request.body.team;
        let tournamentID = request.body.tournamentID;

        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}},{$push: {teams: team}});

        response.json({success: true, message: 'Team hinzugefügt'});
    }

    static async editTeam(request: Request, response: Response) {
        let team = request.body.team;
        let tournamentID = request.body.tournamentID;
        let selectedTeamName = request.body.selectedTeamName;

        // TODO: Replace complete team element instead of single team values
        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}, "teams.name": selectedTeamName }, { $set: { "teams.$.name": team.name, "teams.$.players": team.players } });
        
        response.json({success: true, message: 'Team bearbeitet'});
    }

    static async removeTeam(request: Request, response: Response) {
        let tournamentID = request.body.tournamentID;
        let selectedTeamName = request.body.selectedTeamName;
      
        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}}, { $pull: { teams: { name: selectedTeamName } } });

        response.json({success: true, message: 'Team gelöscht'});
    }

}