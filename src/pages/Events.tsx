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
    const URL = "https://project-api-r7ox.onrender.com/events";
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL);
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