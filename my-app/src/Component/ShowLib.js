import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendlibraryid } from "../smsredux/slices/librarySlice";

export default function ShowLib() {
  const [data, setData] = useState("")
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchParticulars = async () => {
      try {
        const response = await fetch("http://localhost:4000/library");
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
     dispatch(sendlibraryid(id))
  }
  return (
    <div>
      {/* <h5>Liabraries</h5> */}
      <ul>
        {data && data.length > 0 && data.map(({libName,id}) => <li  onClick={() => myfunc(id)}>{libName}</li>)}
      </ul>
    </div>
  );
}
