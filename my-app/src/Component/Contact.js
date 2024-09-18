import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useDataprocess1 from "./customhook/useDataprocess1";
import moviedbvalues from "./env";
import apiCallFunction from "./apiCallfunction";
import { Link } from "react-router-dom";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let ansGroup = useDataprocess1(moviedbvalues.smsApiPath + "group");

  useEffect(() => {
    const fetchParticulars = async () => {
      try {
        const response = await fetch("http://localhost:4000/contact");
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

  const onSubmit = (formData) => {
    apiCallFunction(moviedbvalues.smsApiPath + "contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log("response", res);
        setMessage("Contact Added");
      })
      .catch((err) => {
        console.log("error", err);
        setMessage("Error adding contact");
      });
  };

  const handleDelete = async (id) => {
    try {
        const res = await fetch(`http://localhost:4000/contact/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            throw new Error('Failed to delete');
        }
        setData(data.filter(item => item.id !== id));
    } catch (err) {
        console.error('Error deleting library:', err);
    }
}

  return (
    <div className="container pt-4 pb-4">
      <h1 className="text-center text-uppercase">Add Contact</h1>
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="groupSelect" className="form-label">
                Select Group
              </label>
              <select
                id="groupid"
                className="form-control"
                {...register("groupName", { required: "Group is required" })}
              >
                <option value="">Please Select Group</option>
                {ansGroup &&
                  ansGroup.map(({ id, groupName }) => (
                    <option key={id} value={id}>
                      {groupName}
                    </option>
                  ))}
              </select>
              {errors.groupId && <p>{errors.groupId.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                className="form-control"
                {...register("PersonNumber", { required: "Number is required" })}
              />
              {errors.PersonNumber && <p>{errors.PersonNumber.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="contactName" className="form-label">
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                className="form-control"
                {...register("PersonName", { required: "Name is required" })}
              />
              {errors.PersonName && <p>{errors.PersonName.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="contactEmail" className="form-label">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                className="form-control"
                {...register("PersonEmail", { required: "Email is required" })}
              />
              {errors.PersonEmail && <p>{errors.PersonEmail.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <p>{message}</p>
          </form>
        </div>
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Contact Name</th>
                {/* <th scope="col">Group Name</th> */}
                <th scope="col">Contact Mobile</th>
                <th scope="col">Contact Email</th>
                
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((obj) => (
                  <tr key={obj.id}>
                    <td>{obj.PersonName}</td>
                    {/* <td>{obj.id}</td> */}
                    <td>{obj.PersonNumber}</td>
                    <td>{obj.PersonEmail}</td>
                    
                    <td>
                      <button onClick={() => handleDelete(obj.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
