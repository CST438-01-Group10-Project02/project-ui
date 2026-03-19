import {FC, SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    Id: number;
}

interface Event {
    Title: string;
    Description: string;
    HostId: number;
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

function getData(index : number) {
    const URL = "https://project-api-r7ox.onrender.com/events/";
    // const URL = "http://localhost:8080/events/";
    const [event, setEvent] = useState<Event>({Title:"Loading...", Description:"Loading...", HostId:0});
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL+index);
            result.json().then(json => {
                    setEvent({Title:json.name, Description:json.description, HostId:json.hostId});
            })
        }
        fetchData();
    }, [])
    return event;
}

const EventCard : FC<Props> = ({Id}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/events/" + Id);
    }

    const event = getData(Id);
    const username = getUsername(event.HostId);

    return (
        <div className="event_card"
        style={{
            width:"fit-content",
            backgroundColor:"gray",
            borderRadius:"20px",
            outline:"2px solid black",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            padding:"20px",
            cursor:"pointer"
        }}
        onClick={handleClick}>
            <h1>{event.Title}</h1>
            <h3>{event.Description}</h3>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}><h3>Host:</h3><a>{username}</a></div>
        </div>
    );
}

export default EventCard;