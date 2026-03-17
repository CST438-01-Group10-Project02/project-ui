import {FC, SyntheticEvent, useEffect, useState} from "react";
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


export default function CreateEvent() {
    const {id} = useParams();

    if(!id)
        return;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [sTime, setSTime] = useState<string>("");
    const [eTime, setETime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const event = getData(parseInt(id));

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={handleSubmit}>
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
                <label>Title</label>
                <input
                    style={{gridColumn:"2"}}
                    type="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Description</label>
                <input
                    style={{gridColumn:"2"}}
                    type="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <div
                    style={{gridColumn:"1",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <h2>Host:</h2><a>{event.HostUsername}</a>
                </div>
                <div
                    style={{gridColumn:"3",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <label>Location</label>
                    <input
                        type="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div
                    style={{gridColumn:"1",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <label>Start Time</label>
                    <input
                        type="sTime"
                        value={sTime}
                        onChange={(e) => setSTime(e.target.value)}
                        required
                    />
                </div>
                <div
                    style={{gridColumn:"3",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <label>End Time</label>
                    <input
                        type="eTime"
                        value={eTime}
                        onChange={(e) => setETime(e.target.value)}
                        required
                    />
                </div>
                <div
                    style={{gridColumn:"1",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div style={{gridColumn:"3",
                    display:"flex",
                    alignItems:"center",
                    gap:"5px"}}>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </div>
        </form>
    )
}