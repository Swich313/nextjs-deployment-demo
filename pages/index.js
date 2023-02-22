import {MongoClient} from "mongodb";
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {id: 'm1',
     title: 'Meeting1',
     image: 'https://plus.unsplash.com/premium_photo-1672252617602-e5de5c6aba9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
     address: 'Some address 12345',
     description: 'Description of Meeting 1',
    },
    {id: 'm2',
        title: 'Meeting2',
        image: 'https://images.unsplash.com/photo-1481253127861-534498168948?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
        address: 'Some address 6455321',
        description: 'Description of Meeting 2',
    },
    {id: 'm3',
        title: 'Meeting3',
        image: 'https://images.unsplash.com/photo-1550136513-548af4445338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
        address: 'Some address 987654',
        description: 'Description of Meeting 3',
    }
];

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>NextJS Meetups</title>
                <meta name='description' content='Browse a huge list of highly active React meetups'/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
};

//for server-side rendering
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// for rendering static pages at building app
export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect('mongodb+srv://Swich313:Heisen313berg@cluster0.9uteo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray();
    await client.close();
    return {
        props: {
            meetups: meetups.map(meetup => {
                return {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    description: meetup.description,
                    id: meetup._id.toString()
                }
            })
        },
        revalidate: 10             //allows us to change static page upon request within 10 seconds
    }
}

export default HomePage;