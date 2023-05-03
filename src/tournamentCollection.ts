import {Collection, MongoClient} from "mongodb"
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

}