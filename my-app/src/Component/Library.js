import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import apiCallFunction from './apiCallfunction';
import moviedbvalues from './env';

export default function Library() {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState();

    useEffect(() => {
        const fetchParticulars = async () => {
            try {
                const response = await fetch('http://localhost:4000/library');
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

    const onSubmit = (data) => {
        if (editingId) {
            apiCallFunction(
                `${moviedbvalues.smsApiPath}library/${editingId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...data,
                        id: Number(data),
                    })
                }
            ).then(res => {
                setMessage('Library Updated');
                setData(data.map(item => item.id === editingId ? res.data : item)); 
                setEditingId(null); 
                reset();
            }).catch(err => {
                console.log(err);
            });
        } else {
            apiCallFunction(
                moviedbvalues.smsApiPath+"library",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            ).then(res => {
                setMessage('Library Added');
                setData([...data, res.data]); 
                reset();
            }).catch(err => {
                console.log(err);
            });
        }
    };

    const handleEditClick = (id, libName) => {
        console.log("Editing item:", { id, libName });
        setEditingId(id); 
        setValue("libName", libName); 
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/library/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                throw new Error('Failed to delete');
            }
            setData(data.filter(item => item.id !== id));
        } catch (err) {
            console.error('Error deleting library:', err);
        }
    };

    return (
        <div>
            <div className="container pt-4 pb-4">
                <h1 className="text-center text-uppercase">{editingId ? "Edit Library" : "Add Library"}</h1>
                <div className="row">
                    <div className="col-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="txtData" className="form-label">Library Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Number"
                                    id-type="number"
                                    placeholder='Enter library name'
                                    {...register("libName", { required: true })}
                                />
                                {errors.libName?.type === "required" && (
                                    <p role='alert'>Library name is required</p>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">{editingId ? "Update" : "Add"}</button>
                            {message && <p>{message}</p>}
                        </form>
                    </div>
                    <div className="col-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Lib Name</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((obj) => (
                                    <tr key={obj.id}>
                                        <td>{obj.libName}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(obj.id, obj.libName)} className="btn btn-primary">Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(obj.id)} className="btn btn-danger">Delete</button>
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
