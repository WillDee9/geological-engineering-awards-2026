'use client';

import { useEffect, useState } from 'react';


type Nominee = {

  id:string;

  nominee_name:string;

  nominee_image_url:string;

  reason:string;

  nomination_code:string;

  categories:{
    id:string;
    name:string;
  };

};



type CategoryGroup = {

  category:string;

  nominees:Nominee[];

};




export default function AwardsPage(){


const [groups,setGroups] =
useState<CategoryGroup[]>([]);


const [loading,setLoading] =
useState(true);





useEffect(()=>{


async function loadAwards(){


try{


const response =
await fetch(
'/api/awards',
{
cache:'no-store'
}
);



const data:Nominee[] =
await response.json();




const grouped =

Object.values(

data.reduce(
(acc:any, nominee)=>{


const category =
nominee.categories?.name ||
'Other';



if(!acc[category]){

acc[category] = [];

}



acc[category].push(nominee);



return acc;


},
{})


).map((nominees:any)=>(


{

category:
nominees[0].categories.name,

nominees


}


));




setGroups(grouped);



}

catch(error){

console.error(error);

}



setLoading(false);



}



loadAwards();



},[]);







if(loading){


return (

<div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">

Loading Official Nominees...

</div>

);


}








return (

<main className="min-h-screen bg-black text-white">



{/* HERO SECTION */}


<section className="relative overflow-hidden px-6 py-24 text-center">


<div className="absolute inset-0 bg-gradient-to-b from-yellow-900/30 to-black"/>



<div className="relative mx-auto max-w-5xl">


<p className="text-lg tracking-[0.4em] text-yellow-400">

GEOLOGICAL ENGINEERING

</p>



<h1 className="mt-6 text-5xl font-extrabold md:text-7xl">

AWARDS NIGHT 2026

</h1>




<p className="mt-6 text-xl text-gray-300">

Celebrating Excellence,
Leadership and Outstanding Achievements

</p>



<div className="mx-auto mt-10 h-1 w-40 bg-yellow-400"/>


</div>


</section>










{/* NOMINEES SECTION */}



<section className="px-6 py-16">


<div className="mx-auto max-w-7xl">



<h2 className="mb-16 text-center text-4xl font-bold text-yellow-400">

🏆 OFFICIAL NOMINEES

</h2>







<div className="space-y-20">



{

groups.map((group)=>(



<section key={group.category}>


<div className="mb-10 text-center">


<h3 className="text-3xl font-bold uppercase text-yellow-300">

🏆 {group.category}

</h3>


<div className="mx-auto mt-4 h-[2px] w-32 bg-yellow-400"/>


</div>








<div className="grid gap-10 md:grid-cols-3">



{

group.nominees.map((nominee)=>(



<div

key={nominee.id}

className="group overflow-hidden rounded-3xl bg-white text-black shadow-2xl transition duration-300 hover:-translate-y-3"

>



<div className="overflow-hidden">


<img

src={
nominee.nominee_image_url ||
'/placeholder.png'
}

alt={nominee.nominee_name}

className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"

/>


</div>







<div className="p-6">


<h4 className="text-2xl font-bold">

{nominee.nominee_name}

</h4>



<p className="mt-3 text-sm leading-relaxed text-gray-600">

{nominee.reason}

</p>





<div className="mt-5 inline-block rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">


Official Nominee


</div>



</div>



</div>



))

}


</div>



</section>



))


}



</div>






{

groups.length===0 &&


<p className="text-center text-gray-400">

No approved nominees available.

</p>


}



</div>


</section>







{/* FOOTER */}


<footer className="border-t border-yellow-900 py-8 text-center text-gray-400">


Geological Engineering Awards Night 2026

<br/>

Celebrating Excellence


</footer>



</main>


);


}