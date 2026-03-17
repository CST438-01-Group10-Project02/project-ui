import {FC, SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    Id: number;
}

interface Event {
    Title: string;
    Description: string;
    HostUsername: string;
}

function getData(index : number) {
    const [event, setEvent] = useState<Event>({Title:"Loading...", Description:"Loading...", HostUsername:"Loading..."});
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch("http://localhost:8080/events/"+index);
            result.json().then(json => {
                    setEvent({Title:json.name, Description:json.description, HostUsername:json.host.username});
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
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}><h3>Host:</h3><a>{event.HostUsername}</a></div>
        </div>
    );
}

export default EventCard;