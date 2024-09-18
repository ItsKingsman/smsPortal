import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendcontactid } from '../smsredux/slices/contactSlice';

export default function ShowContact() {
  const groupid = useSelector((state) => state.group.value);
  const [data, setData] = useState([]);
  let dispatch = useDispatch()

  useEffect(() => {
    const fetchParticulars = async () => {
      try {
        console.log(`Fetching data for groupid: ${groupid}`);
        const response = await fetch(`http://localhost:4000/contact?groupName=${groupid}`); // Changed 'id' to 'groupid'
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.length === 0) {
          console.log("No contacts found for the given groupid");
        }

        setData(data);
      } catch (error) {
        console.error('Error fetching particulars:', error);
      }
    };

    fetchParticulars();

    return () => {
      setData([]); // Clear data on unmount
    };
  }, [groupid]);

  function f1(PersonName,PersonNumber,PersonEmail){
    console.log(PersonName,PersonNumber,PersonEmail);
    dispatch(sendcontactid([PersonName,PersonNumber,PersonEmail]))
}

  return (
    <div>
      {/* <h3>Contacts</h3> */}
      <ul>
        {data && data.length > 0 ? (
          data.map(({PersonName,PersonNumber,PersonEmail}) => (
            <li>
              {/* <p>Group Name: {value.groupName}</p> */}
              <p onClick={()=>{f1(PersonName,PersonNumber,PersonEmail)}}>Person Name: {PersonName}</p>
              {/* <p onClick={()=>{f1(PersonNumber)}}>Person Number: {PersonNumber}</p>
              <p onClick={()=>{f1(PersonEmail)}}>Person Email: {PersonEmail}</p> */}
            </li>
          ))
        ) : (
          <li>No contacts available</li>
        )}
      </ul>
    </div>
  );
}
