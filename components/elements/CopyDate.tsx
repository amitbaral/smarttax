import React, { useEffect, useState } from 'react'

export default function CopyDate() {
    const [year, setYear] = useState(null);

    const getDateTime = async () => {
        try {
            const res = await fetch('/api/date-time');
            const data = await res.json();
            setYear(data.year);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDateTime();
    }, []);
    return (
        <span className="color-gray-400 text-body-lead">© Smart Tax & Accounting {year}</span>
    )
}
