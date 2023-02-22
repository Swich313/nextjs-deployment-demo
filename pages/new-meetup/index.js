import {useRouter} from "next/router";
import Head from 'next/head';

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredData) => {
        console.log({enteredData})
        const response = await  fetch('/api/new-meetup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(enteredData)
        })

        const data = await response.json();
        console.log({data});
        router.push('/');
    };
    return (
        <>
            <Head>
                <title>Add New Meetup</title>
                <meta name='description' content='Add your own meetup'/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </>
    );
};

export default NewMeetupPage;