import {React, useState, useEffect} from 'react';

export default function LastUpdated({time, convertTime}){
    const [lastUpdatedString, setLastUpdatedString] = useState();

    useEffect(() => {
        setLastUpdatedString(time ? convertTime(Date.now()-time) : "Just Now")
    }, [time, convertTime]);

    return (
        <div className="lastUpdated">{"Last Updated: " + lastUpdatedString}</div>
    )
}