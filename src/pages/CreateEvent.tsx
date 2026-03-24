import {SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateEvent() {
    const naviagte = useNavigate();

    const token = sessionStorage.getItem("token");
    const username = getUserUsername();
    const userID = getUserID();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [sTime, setSTime] = useState<string>("");
    const [eTime, setETime] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const newEvent = {
            name: title,
            hostId: userID,
            description: description,
            location: location,
            startTime: sTime,
            endTime: eTime,
            date: date
        };

        try {
            //const response = await fetch("http://localhost:8080/events", {
            const response = await fetch("https://project-api-r7ox.onrender.com/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEvent)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const createdEvent = await response.json();
            console.log("Created event:", createdEvent);
            setMessage("Event created successfully!");

            setTitle("");
            setDescription("");
            setLocation("");
            setSTime("");
            setETime("");
            setDate("");
            naviagte("/events/" + createdEvent.id);
        } catch (error) {
            console.error("Error creating event:", error);
            setMessage("Failed to create event.");
        }
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
                <div
                    style={{gridColumn:"1",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div
                    style={{gridColumn:"3",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div
                    style={{gridColumn:"1",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <h2>Host:</h2><a>{username}</a>
                </div>
                <div
                    style={{gridColumn:"3",
                        display:"flex",
                        alignItems:"center",
                        gap:"5px"}}>
                    <label>Location:</label>
                    <input
                        type="text"
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
                    <label>Start Time:</label>
                    <input
                        type="time"
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
                    <label>End Time:</label>
                    <input
                        type="time"
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
                    <label>Date:</label>
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

function getUserID() {
    const token = sessionStorage.getItem("token");
    if(!token)
        return "NULL";
    const tokenJSON = JSON.parse(token);
    const email = tokenJSON.user.email;
    const [id, setId] = useState("Loading...");
    // const URL = "http://localhost:8080/users?email="+email;
    const URL = "https://project-api-r7ox.onrender.com/users?email="+email;
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL);
            result.json().then(json => {
                setId(json.id);
            })
        }
        fetchData();
    }, [])
    console.log(id);

    return id;
}

function getUserUsername() {
    const token = sessionStorage.getItem("token");
    if(!token)
        return "NULL";
    const tokenJSON = JSON.parse(token);
    const email = tokenJSON.user.email;
    const [username, setUsername] = useState("Loading...");
    // const URL = "http://localhost:8080/users?email="+email;
    const URL = "https://project-api-r7ox.onrender.com/users?email="+email;
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(URL);
            result.json().then(json => {
                setUsername(json.username);
            })
        }
        fetchData();
    }, [])

    return username;
}