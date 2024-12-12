import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function App() {

    const id = window.location.pathname.split('/')[2]

    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [industry, setIndustry] = useState(null);
    const [email, setEmail] = useState(null);

    const [status, setStatus] = useState(false);

    const [clients, setClients] = useState([]);
    const [locations, setLocations] = useState([]);

    function DeleteCL(id) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
    
        fetch("/api/clients/" + id+ "/", requestOptions)
            .then((response) => response.json())
            .then(window.location.reload())
            .catch((e) => console.log(e));
    }

    function DeleteLoc(id) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
    
        fetch("/api/locations/" + id+ "/", requestOptions)
            .then((response) => response.json())
            .then(window.location.reload())
            .catch((e) => console.log(e));
    }

    function TableBodyCL(prop) {
        return (
            <tr className="odd:bg-white even:bg-slate-50" key={prop.data.id}>
                <td>{prop.data.name}</td>
                <td>{prop.data.position}</td>
                <td>{prop.data.phone}</td>
                <td>{prop.data.email}</td>
                <td>
                    <Link to={`/clients/${prop.data.id}/`}  class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded">
                        View
                    </Link>
                    <button onClick={() => window.confirm("Are you sure you want to delete?") ? DeleteCL(prop.data.id) : console.log("Cancelled")} class="m-1 bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded">
                        Delete
                    </button>
                </td>
            </tr>
        )
    }

    function TableBodyLoc(prop) {
        return (
            <tr className="odd:bg-white even:bg-slate-50" key={prop.data.id}>
                <td>{prop.data.address}</td>
                <td>{prop.data.manager}</td>
                <td>{prop.data.phone}</td>
                <td>
                    <Link to={`/locations/${prop.data.id}/`}  class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded">
                        View
                    </Link>
                    <button onClick={() => window.confirm("Are you sure you want to delete?") ? DeleteLoc(prop.data.id) : console.log("Cancelled")} class="m-1 bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded">
                        Delete
                    </button>
                </td>
            </tr>
        )
    }

    function SetCustomer(data) {
        setName(data.name)
        setIndustry(data.industry)
        setEmail(data.email)
        setPhone(data.phone)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "name": name,
            "industry": industry,
            "phone": phone,
            "email": email
        };
        const requestOptions = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/customers/' + id + '/', requestOptions)
            .then((response) => response.json())
            .then(() => setStatus(true))
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/customers/' + id + '/', requestOptions)
            .then((response) => response.json())
            .then((data) => SetCustomer(data))
            .catch((e) => console.log(e));

        fetch(`/api/customer/${id}/clients/`, requestOptions)
            .then((response) => response.json())
            .then((data) => setClients(data))
            .catch((e) => console.log(e));

        fetch(`/api/customer/${id}/locations/`, requestOptions)
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((e) => console.log(e));

    }, []);


    const [customers, setCustomers] = useState([])

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

    const validateEmail = (data) => {
        let element = document.getElementById("email");
        if (customers.map((a) => a.email).indexOf(data) >= 0) {
            element.setCustomValidity("Duplicate Email Address");
            element.reportValidity();
        } else {
            element.setCustomValidity("");
        }
        setEmail(data)
    }

    const validatePhone = (data) => {
        let element = document.getElementById("phone");
        if (customers.map((a) => a.phone).indexOf(data) >= 0) {
            element.setCustomValidity("Duplicate Phone Number");
            element.reportValidity();
        } else {
            element.setCustomValidity("");
        }
        setPhone(data)
    }

    return (
        <center>
            <div className="text-5xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900">
                    View & Update Customer
                </span>
            </div>
            {!status ?
                <form className='w-full max-w-lg group' onSubmit={handleSubmit} noValidate>
                                        <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="grid-zip" type="text" placeholder="Fauxall UK"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Please enter a name
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Industry
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="grid-first-name" type="text" placeholder="Automotive Manufacturer"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                required />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                                Business Phone
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="phone" type="text" placeholder="7XXXXXXXXX"
                                value={phone}
                                onChange={(e) => validatePhone(e.target.value)}
                                required
                                pattern="^(?:0|\+?44)(?:\d\s?){9,10}$" />
                            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Please enter a valid UK phone number
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                                Business Email
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="email" type="email" placeholder="sales@fauxall.co.uk"
                                value={email}
                                onChange={(e) => validateEmail(e.target.value)}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            />
                            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Please enter a valid email
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 content-center px-2">
                        <Link to='/customers' class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                            Go Back
                        </Link>
                        <button class="m-1 bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded group-invalid:pointer-events-none group-invalid:opacity-30" type='submit'>
                            Update
                        </button>
                    </div>
                </form>
                :
                <div className='w-full max-w-lg'>
                    <div className="text-3xl font-bold p-3">Customer Updated &#x2705;</div>
                    <div class="mx-3 mb-6 content-center p-3">
                        <Link to='/customers' class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                            Go Back to List
                        </Link>
                    </div>
                </div>
            }
            <br/>
            <div>
            <div className="text-3xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900 content-left">
                    {clients.length} Clients in {name}
                </span>
            </div>
            <br/>
            <Link to={'/createclient/'+ id + '/?n=' + name  } class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded">
                    Add a Client
            </Link>
            </div>
            <br/>
            <table className='my-3 table-fixed sm:table-auto w-5/6'>
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
                    {clients.map((client) => <TableBodyCL data={client} />)}
                </tbody>
            </table>
            <div>
            <div className="text-3xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900 content-left">
                    {locations.length} Locations in {name}
                </span>
            </div>
            <br/>
            <Link to={'/createlocation/'+ id + '/?n=' + name  } class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded">
                    Add a Location
            </Link>
            </div>
            <br/>
            <table className='my-3 table-fixed sm:table-auto w-5/6'>
                <thead className='text-left'>
                    <tr className='bg-slate-100'>
                        <th>Address</th>
                        <th>Manager</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => <TableBodyLoc data={location} />)}
                </tbody>
            </table>
        </center>
    )
}