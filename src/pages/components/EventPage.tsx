import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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


export default function EventPage() {
    const {id} = useParams();

    if(!id)
        return;

    return (
        <div
        style={{
            width:"100vw",
            height:"50vh",
            backgroundColor:"green",
            display:"flex",
            justifyContent:"center"
        }}>
            <h1>{getData(parseInt(id)).Title}</h1>
        </div>
    )
}