import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Event {
    Title: string;
    Description: string;
    HostId: number;
    Location: string;
    StartTime: string;
    EndTime: string;
    Date: string;
}

function getData(index : number) {
    const [event, setEvent] = useState<Event>({Title:"Loading...", Description:"Loading...", HostId:0, Location:"Loading", StartTime:"Loading", EndTime:"Loading", Date:"Loading"});
    const URL = "https://project-api-r7ox.onrender.com/events/";
    // const URL = "http://localhost:8080/events/";
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL+index);
            result.json().then(json => {
                    setEvent({Title:json.name, Description:json.description, HostId:json.hostId, Location:json.location, StartTime:json.startTime, EndTime:json.endTime, Date:json.date});
            })
        }
        fetchData();
    }, [])
    return event;
}

function getUsername(id : number){
    const URL = "https://project-api-r7ox.onrender.com/users/" + id;
    // const URL = "http://localhost:8080/users/" + id;
    const [username, setUsername] = useState("Loading...");
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL);
            if(!result.ok) {
                return "NULL";
            }
            result.json().then(json => {
                setUsername(json.username);
            })
        }
        fetchData();
    })
    return username;
}

function getUserId() {
    const token = sessionStorage.getItem("token");
    if(!token)
        return null;
    const tokenJSON = JSON.parse(token);
    const email = tokenJSON.user.email;
    // const URL = "http://localhost:8080/users?email="+email;
    const URL = "https://project-api-r7ox.onrender.com/users?email=" + email;
    const [id, setId] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL);
            result.json().then(json => {
                setId(json.id);
            })
        }
        fetchData();
    })
    return id;
}

export default function EventPage() {
    const {id} = useParams();

    if(!id)
        return;

    const event = getData(parseInt(id));
    const username = getUsername(event.HostId);
    if(event.HostId == getUserId()){
        //alert("you are the owner of this event");
    }
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

            <div style={{gridColumn:"1", display:"flex", alignItems:"center", gap:"5px"}}><h2>Host:</h2><a href={"./../users/"+event.HostId}>{username}</a></div>
            <div style={{gridColumn:"3", display:"flex", alignItems:"center", gap:"5px"}}><h2>Location:</h2><a>{event.Location}</a></div>
            <div style={{gridColumn:"1", display:"flex", alignItems:"center", gap:"5px"}}><h2>Start Time:</h2><a>{event.StartTime}</a></div>
            <div style={{gridColumn:"3", display:"flex", alignItems:"center", gap:"5px"}}><h2>End Time:</h2><a>{event.EndTime}</a></div>
            <div style={{gridColumn:"2", display:"flex", alignItems:"center", gap:"5px"}}><h2>Date:</h2><a>{event.Date}</a></div>

            </div>
        </div>
    )
}