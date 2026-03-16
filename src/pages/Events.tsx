import { useNavigate } from "react-router-dom";
import EventCard from "./components/EventCard"
import {useState, useEffect, useEffectEvent} from "react";

interface Event {
    Title: string;
    Description: string;
    HostUsername: string;
}

function getData(index : number) {
    const [event, setEvent] = useState<Event>({Title:"Loading...", Description:"Loading...", HostUsername:"Loading..."});
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch("http://localhost:8080/events");
            result.json().then(json => {
                    setEvent({Title:json[index].Name, Description:json[index].Description, HostUsername:json[index].Host.username});
            })
        }
        fetchData();
    }, [])
    return ( 
        <EventCard Title={event.Title} Description={event?.Description} HostUsername={event?.HostUsername} Id={index}></EventCard>
    )
}

export default function FC() {
    const navigate = useNavigate();

    let K = 2;

    return (
        <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
            <div style={{display:"grid", gridTemplateColumns:"auto auto", gap:"50px"}}>
                {
                    Array.from({length : K}, (_, k) => (
                        getData(k)
                    ))
                }
            </div>
        </div>
    );
}