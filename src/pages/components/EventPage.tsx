import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Event {
    Title: string;
    Description: string;
    HostUsername: string;
    HostId: number;
    Location: string;
    StartTime: string;
    EndTime: string;
    Date: string;
}

function getData(index : number) {
    const [event, setEvent] = useState<Event>({Title:"Loading...", Description:"Loading...", HostUsername:"Loading...", HostId:0, Location:"Loading", StartTime:"Loading", EndTime:"Loading", Date:"Loading"});
    const URL = "https://project-api-r7ox.onrender.com/events/";
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL+index);
            result.json().then(json => {
                    setEvent({Title:json.name, Description:json.description, HostUsername:json.host.username, HostId:json.host.id, Location:json.location, StartTime:json.startTime, EndTime:json.endTime, Date:json.date});
            })
        }
        fetchData();
    }, [])
    return event;
}


export default function EventPage() {
    const {id} = useParams();

    if(!id)
        return;

    const event = getData(parseInt(id));
    return (
        <div style={{width:"100vw", display:"flex", justifyContent:"center"}}>
            <div
            style={{
                backgroundColor:"gray",
                borderRadius:"20px",
                outline:"2px solid black",
                height:"fit-content",
                display:"grid",
                gridTemplateColumns:"1fr 1fr 1fr",
                justifyItems:"center",
                padding:"20px"
            }}>
            <h1 style={{gridColumn:"2"}}>{event.Title}</h1>
            <h3 style={{gridColumn: "2"}}>{event.Description}</h3>

            <div style={{gridColumn:"1", display:"flex", alignItems:"center", gap:"5px"}}><h2>Host:</h2><a href={"./../users/"+event.HostId}>{event.HostUsername}</a></div>
            <div style={{gridColumn:"3", display:"flex", alignItems:"center", gap:"5px"}}><h2>Location:</h2><a>{event.Location}</a></div>
            <div style={{gridColumn:"1", display:"flex", alignItems:"center", gap:"5px"}}><h2>Start Time:</h2><a>{event.StartTime}</a></div>
            <div style={{gridColumn:"3", display:"flex", alignItems:"center", gap:"5px"}}><h2>End Time:</h2><a>{event.EndTime}</a></div>
            <div style={{gridColumn:"2", display:"flex", alignItems:"center", gap:"5px"}}><h2>Date:</h2><a>{event.Date}</a></div>

            </div>
        </div>
    )
}

/*
.event_card
{
  background-color: gray;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 20px;
}
*/