import { useNavigate } from "react-router-dom";
import EventCard from "./components/EventCard"
import {useState, useEffect, useEffectEvent} from "react";
import Background from "../assets/dashboard-bg.png";

export default function FC() {
    const [numberEvents, setNumberEvents] = useState(0);
    const URL = "https://project-api-r7ox.onrender.com/events";
    // const URL = "http://localhost:8080/events";
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
        <div style=
        {{
            display:"flex",
            height:"100vh",
            flexDirection:"column",
            gap:"25px",
            justifyContent:"center",
            alignItems:"center",
            backgroundImage:`url(${Background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover"
        }}>
            {
                Array.from({length : numberEvents}, (_, k) => (
                    <EventCard Id={k+1}></EventCard>
                ))
            }
        </div>
    );
}