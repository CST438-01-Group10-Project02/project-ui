import { useNavigate } from "react-router-dom";
import EventCard from "./components/EventCard"
import {useState, useEffect, useEffectEvent} from "react";

interface Event {
    Title: string;
    Description: string;
    HostUsername: string;
}

export default function FC() {
    const [numberEvents, setNumberEvents] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch("http://localhost:8080/events");
            result.json().then(json => {
                setNumberEvents(json.length);
            })
        }
        fetchData();
    }, [])

    return (
        <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
            <div style={{display:"grid", gridTemplateColumns:"auto auto", gap:"50px"}}>
                {
                    Array.from({length : numberEvents}, (_, k) => (
                        <EventCard Id={k+1}></EventCard>
                    ))
                }
            </div>
        </div>
    );
}