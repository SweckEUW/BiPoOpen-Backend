import {Collection, MongoClient, ObjectId} from "mongodb"
import {Request, Response} from "express";

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

    static async getTournamentByName(request: Request, response: Response){
        let tournamentName = request.body.tournamentName;
        let tournaments = await tournamentsCollection.find().toArray();
        let tournament = tournaments.find((tournament:any) => tournament.name == tournamentName);
        if(tournaments)
            response.json({success: true, message: 'Tournaments gefunden', tournament: tournament});
        else    
            response.json({success: false, message: 'Keine Tournaments gefunden'}); 
    }

    static async createTournament(request: Request, response: Response) {
        let tournament = request.body;

        // DEBUG!!
        if(tournament.teams)
            for (let i = 0; i < tournament.teams.length; i++)
                tournament.teams[i]._id = new ObjectId().toString();      

        // Add tournament to collection
        await tournamentsCollection.insertOne(tournament);

        response.json({success: true, message: 'Tournament erstellt'});
    }


    // Teams
    static async addTeam(request: Request, response: Response) {
        let team = request.body.team;
        team._id = new ObjectId().toString();   

        let tournamentID = request.body.tournamentID;

        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}}, {$push: {teams: team}});

        response.json({success: true, message: 'Team hinzugefügt'});
    }

    static async editTeam(request: Request, response: Response) {
        let team = request.body.team;
        let tournamentID = request.body.tournamentID;

        // TODO: Replace complete team element instead of single team values
        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}, "teams._id": team._id }, { $set: { "teams.$.name": team.name, "teams.$.players": team.players } });
        
        response.json({success: true, message: 'Team bearbeitet'});
    }

    static async removeTeam(request: Request, response: Response) {
        let tournamentID = request.body.tournamentID;
        let teamID = request.body.teamID;
      
        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}}, { $pull: { teams: { _id: teamID } } });

        response.json({success: true, message: 'Team gelöscht'});
    }

    static async setGroups(request: Request, response: Response) {
        let tournamentID = request.body.tournamentID;
        let groups = request.body.groups;
      
        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}}, {$set: {"groupPhase.groups": groups}});

        response.json({success: true, message: 'Gruppen gesetzt'});
    }

    static async setMatches(request: Request, response: Response) {
        let tournamentID = request.body.tournamentID;
        let matches = request.body.matches;

        await tournamentsCollection.updateOne({"_id": {$eq: ObjectId.createFromHexString(tournamentID)}}, {$set: {"groupPhase.matches": matches}});

        response.json({success: true, message: 'Matches gesetzt'});
    }

}