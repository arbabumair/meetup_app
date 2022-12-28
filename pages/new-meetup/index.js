// our-domain.com/new-meetup
import React from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import NewMeetupForm from "../../components/meetups/NewMeetupForm"; 

 function NewMeetUpPage(){
    const route = useRouter();

    async function addMeetupHandler(enteredMeetupValue){
        console.log(enteredMeetupValue)
        const response =  await fetch('/api/new-meetup', {
            method : 'POST',
            body: JSON.stringify(enteredMeetupValue),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        route.push('/');

    }
    return (
        <React.Fragment>
            <Head>
                <title>Add Your Meetup</title>
                <meta name='desciption' content='Add your meetup detail into the form'/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </React.Fragment>
        
    );

};

export default NewMeetUpPage;