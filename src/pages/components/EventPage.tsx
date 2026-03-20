import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Background from "../../assets/dashboard-bg.png";

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
        alert("you are the owner of this event");
    }

    const font_size = "2vw";
    return (
        <div style={{
                width:"100vw",
                height:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                backgroundImage:`url(${Background})`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover"
            }}>
            <div
            style={{
                backgroundColor:"white",
                borderRadius:"20px",
                outline:"2px solid black",
                width:"70vw",
                height:"70vh",
                display:"grid",
                gridTemplateColumns:"1fr 1fr 1fr",
                justifyItems:"center",
                padding:"20px"
            }}>
            <h1 style={{gridColumn:"2", fontSize:"2.5vw"}}>{event.Title}</h1>
            <h3 style={{gridColumn: "2", fontSize:font_size}}>{event.Description}</h3>

            <div style={{gridColumn:"1", display:"flex", alignItems:"center", gap:"1em"}}><h2 style={{fontSize:font_size}}>Host:</h2><a style={{fontSize:font_size}}>{username}</a></div>
            <div style={{gridColumn:"3", display:"flex", alignItems:"center", gap:"1em"}}><h2 style={{fontSize:font_size}}>Location:</h2><a style={{fontSize:font_size}}>{event.Location}</a></div>
            <div style={{gridColumn:"1", display:"flex", alignItems:"center", gap:"1em"}}><h2 style={{fontSize:font_size}}>Start Time:</h2><a style={{fontSize:font_size}}>{event.StartTime}</a></div>
            <div style={{gridColumn:"3", display:"flex", alignItems:"center", gap:"1em"}}><h2 style={{fontSize:font_size}}>End Time:</h2><a style={{fontSize:font_size}}>{event.EndTime}</a></div>
            <div style={{gridColumn:"2", display:"flex", alignItems:"center", gap:"1em"}}><h2 style={{fontSize:font_size}}>Date:</h2><a style={{fontSize:font_size}}>{event.Date}</a></div>

            </div>
        </div>
    )
}