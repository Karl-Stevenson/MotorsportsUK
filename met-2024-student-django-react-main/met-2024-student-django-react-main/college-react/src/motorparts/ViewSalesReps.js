import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function App() {

    const id = window.location.pathname.split('/')[2]

    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [position, setPosition] = useState(null);
    const [email, setEmail] = useState(null);
    const [team, setTeam] = useState(null);

    const [status, setStatus] = useState(false);

    function SetSalesRep(data){
        setName(data.name)
        setPosition(data.position)
        setEmail(data.email)
        setPhone(data.phone)
        setTeam(data.team)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "name": name,
            "position": position,
            "phone": phone,
            "email": email,
            "team": team
        };
        const requestOptions = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/sales-representatives/' + id + '/', requestOptions)
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

        fetch('/api/sales-representatives/' + id + '/', requestOptions)
            .then((response) => response.json())
            .then((data) => SetSalesRep(data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <center>
            <div className="text-5xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900">
                    View & Update Sales Representative
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
                                id="grid-zip" type="text" placeholder="Jane Doe"
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
                                Position
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="grid-first-name" type="text" placeholder="Sales Associate"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)} 
                                required/>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Phone
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="grid-last-name" type="text" placeholder="7XXXXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} 
                                required
                                pattern="^(?:0|\+?44)(?:\d\s?){9,10}$"/>
                                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Please enter a valid UK phone number
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Email
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                id="grid-password" type="email" placeholder="jane@motorparts.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Please enter a valid email
                            </span>
                        </div>
                    </div>
                <div class="flex flex-wrap -mx-3 mb-6 content-center px-2">
                    <Link to='/salesreps' class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                        Go Back
                    </Link>
                    <button class="m-1 bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded group-invalid:pointer-events-none group-invalid:opacity-30" type='submit'>
                        Update
                    </button>
                </div>
            </form>
            :
            <div className='w-full max-w-lg'>
            <div className="text-3xl font-bold p-3">Sales Representative Updated &#x2705;</div>
            <div class="mx-3 mb-6 content-center p-3">
                <Link to='/salesreps' class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                    Go Back to List
                </Link>
            </div>
        </div>
}
        </center>
    )
}