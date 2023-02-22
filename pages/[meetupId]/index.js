import {MongoClient, ObjectId} from "mongodb";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
return (
    <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description}/>
        </Head>
        <MeetupDetail meetupData={props.meetupData}/>
    </>
);
};

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://Swich313:Heisen313berg@cluster0.9uteo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();
    await client.close();
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => {
            return {params: {
                meetupId: meetup._id.toString()
                }}
        })
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://Swich313:Heisen313berg@cluster0.9uteo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetup = await meetupCollection.findOne({_id: new ObjectId(meetupId)});

    await client.close();
    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description
            },
        }
    }
}

export default MeetupDetails;
