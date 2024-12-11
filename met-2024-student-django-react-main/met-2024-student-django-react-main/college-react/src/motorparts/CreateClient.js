import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function App() {

    const customerId = window.location.pathname.split('/')[2]
    const params = new URLSearchParams(window.location.search);
    const businessName = params.get("n")

    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [position, setPosition] = useState(null);
    const [email, setEmail] = useState(null);

    const [status, setStatus] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "name": name,
            "position": position,
            "phone": phone,
            "email": email,
            "customer": customerId
        };
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/api/clients/', requestOptions)
            .then((response) => response.json())
            .then(() => setStatus(true))
            .catch((e) => console.log(e));
    };

    return (
        <center>
            <div className="text-5xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900">
                    Add Client for {businessName}
                </span>
            </div>
            {!status ?
                <form className='w-full max-w-lg' onSubmit={handleSubmit}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-zip" type="text" placeholder="Jane Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Position
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-first-name" type="text" placeholder="Sales Associate"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)} />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Phone
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name" type="tel" placeholder="7XXXXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Email
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-password" type="email" placeholder="jane@motorparts.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 content-center px-2">
                        <Link to='/salesreps' class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                            Go Back
                        </Link>
                        <button class="m-1 bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded" type='submit'>
                            Add
                        </button>
                    </div>
                </form>
                :
                <div className='w-full max-w-lg'>
                    <div className="text-3xl font-bold p-3">Client Added &#x2705;</div>
                    <div class="mx-3 mb-6 content-center p-3">
                        <Link to={'/customers/'+ customerId + '/' } class="m-1 bg-transparent hover:bg-slate-900 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded">
                            Go Back to List
                        </Link>
                        <Link to={()=>window.location.reload()} class="m-1 bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded" type='submit'>
                            Add More
                        </Link>
                    </div>
                </div>
                
            }
        </center>
    )
}