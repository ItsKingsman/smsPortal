import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { sendgroupid } from '../smsredux/slices/groupSlice';


export default function Showgroup() {
  const [data, setData] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchParticulars = async () => {
      try {
        const response = await fetch("http://localhost:4000/group");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching particulars:", error);
      }
    };

    fetchParticulars();
  }, []);

  function myfunc(id){
     dispatch(sendgroupid(id))
  }
  return (
    <div>
     
      <ul>
        {data && data.length > 0 && data.map(({groupName,id}) => <li onClick={() => myfunc(id)}>{groupName}</li>)}
      </ul>
    </div>
  )
}
