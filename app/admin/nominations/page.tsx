'use client';

import { useEffect, useState } from 'react';


type Nomination = {

  id:string;

  nomination_code:string;

  nominee_name:string;

  nominee_phone:string;

  nominee_email:string;

  nominee_image_url:string;

  nominator_name:string;

  nominator_phone:string;

  nominator_email:string;

  reason:string;

  status:string;

  whatsapp_sent:boolean;

  accepted_status:string;

  created_at:string;


  categories?:{
    name:string;
  };

};





export default function AdminNominations(){


const [nominations,setNominations] = useState<Nomination[]>([]);

const [loading,setLoading] = useState(true);

const [updating,setUpdating] = useState(false);

const [message,setMessage] = useState('');

const [search,setSearch] = useState('');

const [statusFilter,setStatusFilter] = useState('all');

const [categoryFilter,setCategoryFilter] = useState('all');




async function loadNominations(){


try{


const response = await fetch(
'/api/admin/nominations?time=' + Date.now(),
{
cache:'no-store'
}
);


const data = await response.json();


if(Array.isArray(data)){

setNominations(data);

}
else{

setMessage(
'Unable to load nominations'
);

}



}
catch(error){

console.error(error);

setMessage(
'Failed to load nominations'
);

}


setLoading(false);


}







useEffect(()=>{

loadNominations();
const interval = setInterval(
loadNominations,
10000
);


return ()=>clearInterval(interval);
},[]);


const categories = Array.from(
  new Set(
    nominations.map(
      item => item.categories?.name
    ).filter(Boolean)
  )
);



const filteredNominations = nominations.filter(
  (nomination)=>{


    const matchesSearch =
      nomination.nominee_name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );


    const matchesStatus =
      statusFilter === 'all'
      ||
      nomination.status === statusFilter;



    const matchesCategory =
      categoryFilter === 'all'
      ||
      nomination.categories?.name === categoryFilter;



    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );


  }
);










async function updateStatus(
id:string,
status:string
){


setUpdating(true);

setMessage('');



try{


const response = await fetch(
'/api/admin/nominations/status',
{

method:'POST',

headers:{
'Content-Type':'application/json'
},


body:JSON.stringify({

id,

status

})

}

);



const data = await response.json();



if(!response.ok){

throw new Error(
data.error || 'Update failed'
);

}





setNominations(prev =>

prev.map(item =>

item.id === id

?

{

...item,

status:status,

whatsapp_sent:false

}

:

item

)

);



setMessage(
`Nomination ${status} successfully`
);



}
catch(error:any){


console.error(error);


setMessage(
error.message
);


}
finally{


setUpdating(false);


}


}









function whatsappLink(
nomination:Nomination
){


let phone =
nomination.nominee_phone.replace(/\D/g,'');



if(phone.startsWith('0')){

phone =
'233' + phone.substring(1);

}




const message = 
`
Hello ${nomination.nominee_name},

Congratulations 🎉

You have been nominated for:

🏆 ${nomination.categories?.name || 'an award category'}

at the Awards Night.

Your nomination code is:

${nomination.nomination_code}

Do you wish to accept this nomination please?

Answer Yes or No.

We wish you the very best.

Awards Night Team
`;



return (

`https://wa.me/${phone}?text=${encodeURIComponent(message)}`

);


}









async function markWhatsappSent(
id:string
){


try{


const response = await fetch(
'/api/admin/nominations/whatsapp',
{

method:'POST',

headers:{
'Content-Type':'application/json'
},


body:JSON.stringify({
id
})

}

);



const data = await response.json();



if(!response.ok){

throw new Error(
data.error || 'Failed to save WhatsApp status'
);

}





setNominations(prev =>

prev.map(item =>

item.id === id

?

{
...item,
whatsapp_sent:true
}

:

item

)

);



setMessage(
'WhatsApp notification recorded'
);



}
catch(error:any){

console.error(error);

setMessage(
error.message
);

}



}






// DELETE NOMINATION

async function deleteNomination(id:string){


const confirmDelete = confirm(
'Are you sure you want to permanently delete this nomination?'
);


if(!confirmDelete){
return;
}



try{


const response = await fetch(
'/api/admin/nominations/delete',
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
id
}),
cache:'no-store'
}
);



const data = await response.json();



if(!response.ok){

throw new Error(
data.error || 'Delete failed'
);

}



// REMOVE FROM SCREEN IMMEDIATELY

setNominations(prev =>
prev.filter(
item=>item.id !== id
)
);



setMessage(
'Nomination deleted successfully'
);



}
catch(error:any){

console.error(error);

setMessage(
error.message
);

}


}









if(loading){


return (

<div className="p-10">

Loading nominations...

</div>

);


}









return (

<main className="min-h-screen bg-slate-50 px-8 py-12">


<h1 className="text-4xl font-bold">

Nomination Management

</h1>



<p className="mt-2 text-slate-600">

Review nominations and notify nominees.

</p>





{
message &&

<p className="mt-4 rounded bg-blue-100 p-3 text-blue-700">

{message}

</p>

}









<div className="mt-8">


<div className="mb-8 grid gap-4 md:grid-cols-3">


<input

type="text"

placeholder="Search nominee name..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="rounded-lg border p-3"

/>



<select

value={statusFilter}

onChange={(e)=>setStatusFilter(e.target.value)}

className="rounded-lg border p-3"

>

<option value="all">
All Status
</option>


<option value="pending">
Pending
</option>


<option value="approved">
Approved
</option>


<option value="rejected">
Rejected
</option>


</select>




<select

value={categoryFilter}

onChange={(e)=>setCategoryFilter(e.target.value)}

className="rounded-lg border p-3"

>

<option value="all">
All Categories
</option>


{
categories.map(category=>(

<option
key={category}
value={category}
>

{category}

</option>

))
}


</select>


</div>







{

filteredNominations.map((nomination)=>(



<div

key={nomination.id}

className="rounded-xl bg-white p-6 shadow"

>







<div className="flex gap-6">



<img

src={
nomination.nominee_image_url ||
'/placeholder.png'
}

alt={nomination.nominee_name}

className="h-32 w-32 rounded-xl object-cover"

/>







<div className="flex-1">



<h2 className="text-2xl font-bold">

{nomination.nominee_name}

</h2>





<p>

🏆 Category:

<b>

{' '}

{nomination.categories?.name}

</b>

</p>







<p className="mt-2">

Nomination Code:

<b>

{' '}

{nomination.nomination_code}

</b>

</p>







<p className="mt-3">

Reason:

<br/>

{nomination.reason}

</p>









<div className="mt-4 text-sm text-gray-600">


<p>
📞 Nominee:
{nomination.nominee_phone}
</p>



{
nomination.nominee_email &&

<p>
✉️ Email:
{nomination.nominee_email}
</p>

}



<p>
Submitted by:
{nomination.nominator_name}
</p>




</div>








<div className="mt-4 flex gap-3">


<span

className={`rounded-full px-3 py-1 text-sm font-semibold

${
nomination.status === 'approved'

?

'bg-green-100 text-green-700'

:

nomination.status === 'rejected'

?

'bg-red-100 text-red-700'

:

'bg-yellow-100 text-yellow-700'

}

`}

>

{nomination.status}



</span>

<div className="mt-3">

<p className="font-semibold">
Nominee Response:
</p>


<span
className={`rounded-full px-3 py-1 text-sm font-semibold

${
nomination.accepted_status === 'accepted'

?

'bg-green-100 text-green-700'

:

nomination.accepted_status === 'declined'

?

'bg-red-100 text-red-700'

:

'bg-yellow-100 text-yellow-700'

}

`}
>

{
nomination.accepted_status === 'accepted'

?

'✅ Accepted'

:

nomination.accepted_status === 'declined'

?

'❌ Declined'

:

'⏳ Pending'

}

</span>

</div>


{
nomination.whatsapp_sent &&

<span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

WhatsApp Sent ✅

</span>

}





</div>






</div>


</div>









<div className="mt-6 flex flex-wrap gap-3">








<button

disabled={updating}

onClick={()=>updateStatus(
nomination.id,
'approved'
)}

className="rounded-lg bg-green-600 px-5 py-2 text-white disabled:opacity-50"

>

Approve

</button>









<button

disabled={updating}

onClick={()=>updateStatus(
nomination.id,
'rejected'
)}

className="rounded-lg bg-red-600 px-5 py-2 text-white disabled:opacity-50"

>

Reject

</button>







<button

onClick={()=>deleteNomination(
nomination.id
)}

className="rounded-lg bg-red-900 px-5 py-2 text-white"

>

🗑 Delete

</button>








{
nomination.status === 'approved' &&

(

nomination.whatsapp_sent

?

<span className="rounded-lg bg-green-100 px-5 py-2 text-green-700">

📲 WhatsApp Sent

</span>


:

<a

href={whatsappLink(nomination)}

target="_blank"

rel="noopener noreferrer"

onClick={()=>markWhatsappSent(nomination.id)}

className="rounded-lg bg-green-500 px-5 py-2 text-white"

>

📲 Send WhatsApp

</a>

)

}








</div>








</div>



))

}





{
nominations.length === 0 &&

<p className="text-slate-500">

No nominations found.

</p>

}



</div>



</main>

);


}
