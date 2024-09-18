import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendmessageid } from '../smsredux/slices/messageSlice';

export default function ShowMessage() {
    const libraryid = useSelector((state) => state.library.value);
    const [data, setData] = useState([]);
    let dispatch = useDispatch()

    useEffect(() => {
        const fetchParticulars = async () => {
            try {
                console.log(`Fetching data for libraryid: ${libraryid}`);
                
                
                const response = await fetch(`http://localhost:4000/message?libid=${libraryid}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("Fetched data:", data);

                if (data.length === 0) {
                    console.log("No messages found for the given libraryid");
                }

                setData(data);
            } catch (error) {
                console.error('Error fetching particulars:', error);
            }
        };

        fetchParticulars();

        return () => {
            setData([]); 
        };
    }, [libraryid]);

    function f1(value){
        dispatch(sendmessageid(value))
    }

    return (
        <div>
            {/* <h3>Messages {libraryid}</h3> */}
            <ul>
                {data && data.length > 0 ? (
                    data.map((value, index) => (
                        <li key={index} onClick={()=>{f1(value.message)}}>{value.message}</li>
                    ))
                ) : (
                    <li>No messages available</li>
                )}
            </ul>
        </div>
    );
}
