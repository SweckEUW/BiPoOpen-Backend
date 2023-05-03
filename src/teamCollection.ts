import {Collection, MongoClient} from "mongodb"
import {Request, Response} from "express";

let teamsCollection: Collection;

export class teamCollection{
    static async retrieveTeamCollection(client : MongoClient){
        if(teamsCollection)
            return 
        
        try{
            teamsCollection = await client.db('bipoopen').collection("teams");
            if(teamsCollection)
                console.log("Retrieved teamsCollection")
            else
                console.error("Error retrieving teamsCollection")
        }catch(error){
            console.error("cant connect to teamsCollection database" + error);
        }
    }

    static async getTeams(request: Request, response: Response){
        let teams = await teamsCollection.find().toArray();

        if(teams)
            response.json({success: true, message: 'Teams gefunden', teams: teams});
        else    
            response.json({success: false, message: 'Keine Teams gefunden'}); 
    }

    static async createTeam(request: Request, response: Response) {
        let tournament = request.body;

        // Add tournament to collection
        await teamsCollection.insertOne(tournament);

        response.json({success: true, message: 'Team erstellt'});
    }

}