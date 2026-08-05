'use client';

import { useEffect, useState } from 'react';



export default function EventsPage(){


const eventDate = new Date(
  "2026-08-15T18:00:00"
);



const [timeLeft,setTimeLeft] =
useState("");



useEffect(()=>{


const timer = setInterval(()=>{


const now = new Date().getTime();

const distance =
eventDate.getTime() - now;



if(distance <= 0){

setTimeLeft(
"Event has started 🎉"
);

return;

}



const days =
Math.floor(
distance /
(1000 * 60 * 60 * 24)
);



const hours =
Math.floor(
(distance %
(1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);



const minutes =
Math.floor(
(distance %
(1000 * 60 * 60))
/
(1000 * 60)
);



const seconds =
Math.floor(
(distance %
(1000 * 60))
/
1000
);



setTimeLeft(
`${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
);



},1000);



return ()=>clearInterval(timer);


},[]);





return (

<main className="min-h-screen bg-slate-950 px-6 py-16 text-white">


<div className="mx-auto max-w-5xl">



<p className="text-center text-sm font-bold tracking-[.3em] text-amber-300">

GEOLOGICAL ENGINEERING DEPARTMENT

</p>




<h1 className="mt-5 text-center text-5xl font-bold">

Awards & Dinner Night

</h1>




<p className="mt-5 text-center text-lg text-slate-300">

Celebrating excellence, leadership and outstanding achievements.

</p>





<div className="mt-10 rounded-2xl bg-white p-8 text-center text-slate-900 shadow-xl">


<h2 className="text-2xl font-bold">

Countdown To The Event

</h2>


<p className="mt-5 text-4xl font-bold text-violet-600">

{timeLeft}

</p>


</div>







<div className="mt-10 grid gap-6 md:grid-cols-3">



<div className="rounded-xl bg-white p-6 text-slate-900">


<h3 className="font-bold text-xl">

📅 Date

</h3>


<p className="mt-3">

Saturday, 15th August 2026

</p>


</div>





<div className="rounded-xl bg-white p-6 text-slate-900">


<h3 className="font-bold text-xl">

📍 Venue

</h3>


<p className="mt-3">

To be announced

</p>


</div>





<div className="rounded-xl bg-white p-6 text-slate-900">


<h3 className="font-bold text-xl">

👔 Dress Code

</h3>


<p className="mt-3">

Black & Gold

</p>


</div>




</div>







<section className="mt-12 rounded-xl bg-white p-8 text-slate-900">


<h2 className="text-3xl font-bold">

Programme Outline

</h2>



<ul className="mt-5 space-y-3">


<li>
⭐ Arrival & Registration
</li>


<li>
⭐ Opening Ceremony
</li>


<li>
⭐ Awards Presentation
</li>


<li>
⭐ Dinner & Entertainment
</li>


<li>
⭐ Closing Remarks
</li>


</ul>


</section>







<section className="mt-10 rounded-xl bg-white p-8 text-slate-900">


<h2 className="text-3xl font-bold">

Our Sponsors

</h2>


<p className="mt-4 text-slate-600">

Sponsor logos and partners will appear here.

</p>


</section>






</div>


</main>

);


}