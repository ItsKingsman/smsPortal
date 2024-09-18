import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import apiCallFunction from "./apiCallfunction";
import moviedbvalues from "./env";
import useDataprocess1 from "./customhook/useDataprocess1";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Message() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  let ansGroup = useDataprocess1(moviedbvalues.smsApiPath + "library");

  useEffect(() => {
    const fetchParticulars = async () => {
      try {
        const response = await fetch("http://localhost:4000/message");
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

  const onSubmit = (data) => {
    console.log(data);
    if (editingId) {
      apiCallFunction(`${moviedbvalues.smsApiPath}message/${editingId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          setMessage("Message Updated");
          setData(
            data.map((item) => (item.id === editingId ? res.data : item))
          );
          setEditingId(null);
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiCallFunction(moviedbvalues.smsApiPath + "message", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          console.log("res");
          setMessage("Message Added");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

    const handleEditClick = (id, message) => {
      console.log("Editing item:", { id, message });
      setEditingId(Number(id));
      setValue("message", message);
    };

    const handleDelete = async (id) => {
      try {
        const res = await fetch(`http://localhost:4000/message/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Failed to delete");
        }
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Error deleting library:", err);
      }
    };
  
  return (
    <div>
      <div className="container pt-4 pb-4">
        <h1 className="text-center text-uppercase">Add Messages</h1>
        <div className="row">
          <div className="col-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="groupSelect" className="form-label">
                  Select Libarary
                </label>
                <select
                  id="groupSelect"
                  className="form-control"
                  {...register("libid", { required: "Lib is required" })}
                >
                  <option value="">Please Select Lib</option>
                  {ansGroup &&
                    ansGroup.map(({ id, libName }) => (
                      <option key={id} value={id}>
                        {libName}
                      </option>
                    ))}
                </select>
                {errors.groupId && <p>{errors.groupId.message}</p>}
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Enter Message
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Message"
                  {...register("message", { required: true })}
                ></textarea>
                {errors.message?.type === "required" && (
                  <p role="alert">Plz write some messages!</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                {editingId ? "Update" : "Add"}
              </button>
              {message && <p>{message}</p>}
            </form>
          </div>

          <div class="col-6">
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">Id</th> */}
                  <th scope="col">Your Message</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((obj) => (
                    <tr>
                      {/* <td>{index+ 1}</td> */}
                      <td>{obj.message}</td>
                      <td>
                        <button
                          onClick={() => handleEditClick(obj.id, obj.message)}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(obj.id)}
                          className="btn btn-danger"
                        >
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
    </div>
  );
}
