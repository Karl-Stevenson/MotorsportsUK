import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Delete(id) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch("/api/customers/" + id + "/", requestOptions)
        .then((response) => response.json())
        .then(window.location.reload())
        .catch((e) => console.log(e));
}

function TableBody({ data, setCustomers }) {
    return (
        <tr className="odd:bg-white even:bg-slate-50" key={data.id}>
            <td>{data.name}</td>
            <td>{data.industry}</td>
            <td>{data.phone}</td>
            <td>{data.email}</td>
            <td>
                <Link to={`/customers/${data.id}/`} class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded">
                    View
                </Link>
                <button onClick={() => window.confirm("Are you sure you want to delete?") ? Delete(data.id) : console.log("Cancelled")} class="m-1 bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded">
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default function App() {
    const [customers, setCustomers] = useState([])

    const [filterName, setFilterName] = useState('');
    const [filterIndustry, setFilterIndustry] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/customers/', requestOptions)
            .then((response) => response.json())
            .then((data) => setCustomers(data))
            //.then((data) => console.log(data))
            .catch((e) => console.log(e));
    }, []);

    const sortData = (data) => {
        if (!sortConfig.key) return data;

        const sortedData = [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortedData;
    };

    const filteredAndSortedData = sortData(
        customers.filter((customer) =>
            customer.name.toLowerCase().includes(filterName.toLowerCase()) &&
            customer.industry.toLowerCase().includes(filterIndustry.toLowerCase())
        )
    );

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <center>
            <div className="text-5xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900">
                    Customers
                </span>
            </div>
            <br />
            <Link to='/createcustomer/' class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded">
                Add a Customer
            </Link>
<br/>
<br/>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="p-2 border rounded mx-2"
                />
                <input
                    type="text"
                    placeholder="Filter by industry"
                    value={filterIndustry}
                    onChange={(e) => setFilterIndustry(e.target.value)}
                    className="p-2 border rounded mx-2"
                />
            </div>

            <table className='my-3 table-fixed sm:table-auto w-5/6'>
                <caption className="caption-top p-3">
                    List of Customers
                </caption>
                <thead className='text-left'>
                    <tr className='bg-slate-100'>
                        <th onClick={() => handleSort('name')} className="cursor-pointer">Name</th>
                        <th onClick={() => handleSort('industry')} className="cursor-pointer">Industry</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedData.map((cust) => (
                        <TableBody key={cust.id} data={cust} setCustomers={setCustomers} />
                    ))}
                </tbody>
            </table>
        </center>
    )
}