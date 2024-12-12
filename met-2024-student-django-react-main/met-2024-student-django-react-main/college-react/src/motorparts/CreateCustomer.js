import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function App() {

    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [industry, setIndustry] = useState(null);
    const [email, setEmail] = useState(null);

    const [status, setStatus] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "name": name,
            "industry": industry,
            "phone": phone,
            "email": email
        };
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/customers/', requestOptions)
            .then((response) => response.json())
            .then(() => setStatus(true))
            .catch((e) => console.log(e));
    };

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
                    Add Customer
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
                        <button class="m-1 bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded group-invalid:pointer-events-none group-invalid:opacity-30" type='submit'>
                            Add
                        </button>
                    </div>
                </form>
                :
                <div className='w-full max-w-lg'>
                    <div className="text-3xl font-bold p-3">Customer Added &#x2705;</div>
                    <div class="mx-3 mb-6 content-center p-3">
                        <Link to='/customers' class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                            Go Back to List
                        </Link>
                        <Link to='/createcustomers/' class="m-1 bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded" type='submit'>
                            Add More
                        </Link>
                    </div>
                </div>

            }
        </center>
    )
}