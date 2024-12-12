import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function App() {

    const id = window.location.pathname.split('/')[2]

    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [manager, setManager] = useState(null);
    const [customer, setCustomer] = useState(null);

    const [status, setStatus] = useState(false);

    function SetLocation(data) {
        setManager(data.manager)
        setPhone(data.phone)
        setAddress(data.address)
        setCustomer(data.customer)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "address": address,
            "manager": manager,
            "phone": phone,
            "customer": customer
        };
        const requestOptions = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/locations/' + id + '/', requestOptions)
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

        fetch('/api/locations/' + id + '/', requestOptions)
            .then((response) => response.json())
            .then((data) => SetLocation(data))
            .catch((e) => console.log(e));
    }, []);

    const [locations, setLocations] = useState([])

    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/locations/', requestOptions)
            .then((response) => response.json())
            .then((data) => setLocations(data))
            //.then((data) => console.log(data))
            .catch((e) => console.log(e));
    }, []);

    const validateAddress = (data) => {
        let element = document.getElementById("address");
        if (locations.map((a) => a.address).indexOf(data) >= 0) {
            element.setCustomValidity("Duplicate Address");
            element.reportValidity();
        } else {
            element.setCustomValidity("");
        }
        setAddress(data)
    }

    const validatePhone = (data) => {
        let element = document.getElementById("phone");
        if (locations.map((a) => a.phone).indexOf(data) >= 0) {
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
                    View & Update Location
                </span>
            </div>
            {!status ?
                <form className='w-full max-w-lg group' onSubmit={handleSubmit} noValidate>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address">
                                Address
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="address" type="text" placeholder="Newtownabbey, Belfast"
                                value={address}
                                onChange={(e) => validateAddress(e.target.value)}
                                required />
                            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Please enter a valid address
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                                Phone
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
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Manager
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="grid-password" type="text" placeholder="John Doe"
                                value={manager}
                                onChange={(e) => setManager(e.target.value)}
                                required />
                            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Please enter a manager
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 content-center px-2">
                        <Link to={'/customers/' + customer + '/'} class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                            Go Back
                        </Link>
                        <button class="m-1 bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded group-invalid:pointer-events-none group-invalid:opacity-30" type='submit'>
                            Update
                        </button>
                    </div>
                </form>
                :
                <div className='w-full max-w-lg'>
                    <div className="text-3xl font-bold p-3">Client Updated &#x2705;</div>
                    <div class="mx-3 mb-6 content-center p-3">
                        <Link to={'/customers/' + customer + '/'} class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                            Go Back to List
                        </Link>
                    </div>
                </div>
            }
        </center>
    )
}