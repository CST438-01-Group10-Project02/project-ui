import {FC, SyntheticEvent, useState} from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    Title: string | undefined;
    Description: string;
    HostUsername: string;
    Id: number;
}

const EventCard : FC<Props> = ({Title, Description, HostUsername, Id}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        Id++;
        navigate("/events/" + Id);
    }

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
            <h1>{Title}</h1>
            <h3>{Description}</h3>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}><h3>Host:</h3><a>{HostUsername}</a></div>
        </div>
    );
}

export default EventCard;