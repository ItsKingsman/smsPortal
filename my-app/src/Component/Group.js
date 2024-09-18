import React, { useEffect } from 'react'
import { useForm} from "react-hook-form"
import apiCallFunction from './apiCallfunction';
import moviedbvalues from './env';
import useDataprocess1 from './customhook/useDataprocess1';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Group() {
    const[message,setMessage]=useState("")
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const[data,setData]= useState([])
    const [editingId, setEditingId] = useState();

    useEffect(() => {
      const fetchParticulars = async () => {
        try {
          const response = await fetch('http://localhost:4000/group');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching particulars:', error);
        }
      };
  
      fetchParticulars();
    }, []);
    
    const onSubmit = (data)=>{
        // console.log(data);
        if (editingId) {
          apiCallFunction(
              `${moviedbvalues.smsApiPath}group/${editingId}`,
              {
                  method: 'PUT',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              }
          ).then(res => {
              setMessage('Group Updated');
              setData(data.map(item => item.id === editingId ? res.data : item)); 
              setEditingId(); 
            
          }).catch(err => {
              console.log(err);
          });
      } else{
        apiCallFunction(moviedbvalues.smsApiPath+"group",
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>{
            console.log("res");
            setMessage("Group Added")
            setData(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }
  }
  const handleEditClick = (id, groupName) => {
    console.log("Editing item:", { id, groupName });
    setEditingId(id); 
    setValue("groupName", groupName); 
};
    const handleDelete = async (id) => {
      try {
          const res = await fetch(`http://localhost:4000/group/${id}`, { method: 'DELETE' });
          if (!res.ok) {
              throw new Error('Failed to delete');
          }
          setData(data.filter(item => item.id !== id));
      } catch (err) {
          console.error('Error deleting library:', err);
      }
  }
  return (
     <div>
        <div className="container pt-4 pb-4">
            <h1 className="text-center text-uppercase">Add Group</h1>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Group Name</label>
                          <input type="text" 
                          className="form-control" 
                          placeholder='Enter Group name'
                         {...register("groupName",{required:true})}
                          />
                          {errors.groupName?.type === "required" &&(
                            <p role='alert'>Group name is required</p>
                            
                          )}
                        </div>
                        
                        
                        <button type="submit" className="btn btn-primary">{editingId ? "Update" : "Add"}</button>
                        {message && <p>{message}</p>}
                      </form>
                </div>

                <div class="col-6">
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Group Name</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>                           
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data && data.map(obj=>
                             <tr>
                                <td>{obj.groupName}</td>
                                <td>
                                            <button onClick={() => handleEditClick(obj.id, obj.groupName)} className="btn btn-primary">Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(obj.id)} className="btn btn-danger">Delete</button>
                                        </td>
                             </tr>    
                            )
                          }
                                                   
                        </tbody>
                      </table>
                </div>
            </div>
      </div>
    </div>
  )
}
