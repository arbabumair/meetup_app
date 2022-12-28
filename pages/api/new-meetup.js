import { MongoClient } from 'mongodb'; 
//API - NEW-MEETUP

//API HANDLER FUNCTIONS ONLY

async function handler(req , res){
    if(req.method === 'POST'){
    const data = req.body;
    // const {title, image, id, description, address} = data;

    const client = await MongoClient.connect('mongodb+srv://makov:RdfJs293FKuviVnX@cluster0.xx0ofml.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);


    client.close();

    res.status(201).json({
        message: 'Meetup data inserted',
    });

    } 
}


export default handler;