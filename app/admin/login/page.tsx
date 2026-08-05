'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function AdminLogin(){

const router = useRouter();

const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const [error,setError] = useState('');



async function login(e:React.FormEvent){

e.preventDefault();

setError('');

const response = await fetch(
'/api/admin/login',
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
username,
password
})
}
);


const data = await response.json();


if(response.ok){

router.push('/admin');

}
else{

setError(
data.error || 'Login failed'
);

}


}



return (

<main className="min-h-screen flex items-center justify-center bg-slate-50">


<form
onSubmit={login}
className="bg-white p-8 rounded-xl shadow w-full max-w-md"
>


<h1 className="text-3xl font-bold mb-6">
Admin Login
</h1>


<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="w-full border p-3 rounded mb-4"
/>



<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-3 rounded mb-4"
/>



<button
className="bg-violet-600 text-white px-5 py-3 rounded w-full"
>
Login
</button>



{
error &&
<p className="mt-4 text-red-600">
{error}
</p>
}


</form>


</main>

);


}