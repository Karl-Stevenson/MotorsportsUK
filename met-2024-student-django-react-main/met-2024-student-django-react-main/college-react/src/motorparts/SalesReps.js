import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Delete(id) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch("/api/sales-representatives/" + id+ "/", requestOptions)
        .then((response) => response.json())
        .then(window.location.reload())
        .catch((e) => console.log(e));
}

function TableBody(prop) {
    return (
        <tr className="odd:bg-white even:bg-slate-50" key={prop.data.id}>
            <td>{prop.data.name}</td>
            <td>{prop.data.position}</td>
            <td>{prop.data.phone}</td>
            <td>{prop.data.email}</td>
            <td>
                <Link to={`/salesreps/${prop.data.id}/`}  class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded">
                    View
                </Link>
                <button onClick={() => window.confirm("Are you sure you want to delete?") ? Delete(prop.data.id) : console.log("Cancelled")} class="m-1 bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded">
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default function App() {
    const [reps, setReps] = useState([])

    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/sales-representatives/', requestOptions)
            .then((response) => response.json())
            .then((data) => setReps(data))
            //.then((data) => console.log(data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <center>
            <div className="text-5xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900">
                    Sales Representatives
                </span>
            </div>
            <br/>
            <Link to='/creatsalesrep' class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded">
                    Add a Sales Representative
            </Link>
            <table className='my-3 table-fixed sm:table-auto w-5/6'>
                <caption className="caption-top p-3">
                    List of Sales Representatives in your Team
                </caption>
                <thead className='text-left'>
                    <tr className='bg-slate-100'>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reps.map((rep) => <TableBody data={rep} />)}
                </tbody>
            </table>
        </center>
    )
}