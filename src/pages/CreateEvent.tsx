import { SyntheticEvent, useState } from "react";

export default function CreateEvent() {
    const token = sessionStorage.getItem("token");
    const user = parseJwt(token);

    console.log("resolved token:", token);
    console.log("decoded user:", user);

    const username =
        user?.user_metadata?.username ??
        "Unknown";

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
            description: description,
            location: location,
            startTime: sTime,
            endTime: eTime,
            date: date
        };

        try {
            const response = await fetch("https://project-api-r7ox.onrender.com/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
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

function parseJwt(token: string | null) {
    if (!token) {
        return null;
    }

    try {
        const payload = token.split(".")[1];
        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(Math.ceil(payload.length / 4) * 4, "=");

        return JSON.parse(atob(base64));
    } catch (error) {
        console.error("Failed to parse token:", error);
        return null;
    }
}