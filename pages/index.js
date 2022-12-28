import React from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';


import MeetupList from '../components/meetups/MeetupList';
export async function getStaticProps(){
    //fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://makov:RdfJs293FKuviVnX@cluster0.xx0ofml.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    //return obj
    return {
        props:{
            meetups:meetups.map(meetup => ({
                id:meetup._id.toString(),
                title:meetup.title,
                image:meetup.image,
                address:meetup.address,
                description:meetup.description
            }))
        },
        revalidate: 1,
    };
}; 


function HomePage(props){

    return (
        <React.Fragment>
            <Head>
                <title>Meetup App</title>
                <meta name='desciption' content='Meetup app lets you add list of data and display as list created in React and Nextjs'/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </React.Fragment>

    )
};


//CALL REACT FUNCTION

export default HomePage;