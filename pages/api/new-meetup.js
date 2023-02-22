import {MongoClient} from 'mongodb';

//api/new-meetup

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://Swich313:Heisen313berg@cluster0.9uteo.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);

        await client.close();

        res.status(201).json({message: 'Meetup created!'})
    }
};

export default handler;