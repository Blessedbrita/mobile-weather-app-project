import React, { useState, useEffect } from "react";

export default function DateDisplay() {
    let [formattedDateTime, setFormattedDateTime] = useState("");

    useEffect(() => {
        let currentDate = new Date();
        let options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        let formattedDateTimeString = currentDate.toLocaleDateString('en-US', options);
        setFormattedDateTime(formattedDateTimeString);
    }, []);

    return (
        <div>{formattedDateTime}</div>
    );
}
