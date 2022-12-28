import { MongoClient, ObjectId } from 'mongodb';
import React from 'react';
import Head from 'next/head';
import MeetUpDetail from '../../components/meetups/MeetupDetail';

function MeetUpDetails(props){



    return (
        <React.Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='desciption' content={props.meetupData.description}/>
            </Head>
            <MeetUpDetail 
            title= {props.meetupData.title}
            image= {props.meetupData.image}
            description= {props.meetupData.description}
            address= {props.meetupData.address}
            />
        </React.Fragment>
    );
}


export async function getStaticPaths(){
    //connected data
    //fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://makov:RdfJs293FKuviVnX@cluster0.xx0ofml.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();
;

    client.close();

    //return obj
    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) =>({
            params:{ meetupId: meetup._id.toString()},
        })),   
    }
}
export async function getStaticProps(context){
    //get URL ID
    const meetupId = context.params.meetupId;
    //fetch data for single meetup from API
    const client = await MongoClient.connect('mongodb+srv://makov:RdfJs293FKuviVnX@cluster0.xx0ofml.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
      });


    return {
        props: {
            meetupData: {
                image: selectedMeetup.image,
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                address: selectedMeetup.address,
            }
        }
    }
}

export default MeetUpDetails;