'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';


type Stats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};



export default function AdminDashboard() {


  const [stats, setStats] = useState<Stats>({
    total:0,
    pending:0,
    approved:0,
    rejected:0
  });



  useEffect(()=>{

    async function loadStats(){

     try{

      const response = await fetch(
        '/api/admin/stats?time=' + Date.now(),
        {
        cache:'no-store'
        }
      );


      const data = await response.json();


      setStats(data);


    }catch(error){

      console.error(
        "Failed to load dashboard stats",
        error
      );

    }

  }



  loadStats();


  const interval = setInterval(
    loadStats,
    5000
  );


  return () => clearInterval(interval);


},[]);





  return (


    <main className="min-h-screen bg-slate-50 px-8 py-12">



      <h1 className="text-4xl font-bold">
        Awards Admin Dashboard
      </h1>



      <p className="mt-2 text-slate-600">
        Manage awards, nominations and categories.
      </p>





      <div className="mt-10 grid gap-6 md:grid-cols-4">


        <Card
          title="Total Nominations"
          value={stats.total}
        />



        <Card
          title="Pending"
          value={stats.pending}
        />



        <Card
          title="Approved"
          value={stats.approved}
        />



        <Card
          title="Rejected"
          value={stats.rejected}
        />


      </div>






      <div className="mt-10 rounded-xl bg-white p-6 shadow">


        <h2 className="text-xl font-bold">
          Quick Actions
        </h2>



        <p className="mt-2 text-sm text-slate-500">
          Manage nominations, categories and view the public awards page.
        </p>





        <div className="mt-6 flex flex-wrap gap-4">



          <Link

            href="/admin/nominations"

            className="
            rounded-lg
            bg-violet-600
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-violet-700
            "

          >

            View Nominations

          </Link>






          <Link

            href="/admin/categories"

            className="
            rounded-lg
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-blue-700
            "

          >

            Manage Categories

          </Link>







          <Link

            href="/awards"

            target="_blank"

            className="
            rounded-lg
            bg-green-600
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-green-700
            "

          >

            View Public Awards

          </Link>





        </div>


      </div>





    </main>


  );

}









function Card({

  title,

  value

}:{

  title:string;

  value:number;

}){


  return (


    <div className="rounded-xl bg-white p-6 shadow">


      <h2 className="text-sm text-slate-500">

        {title}

      </h2>



      <p className="mt-3 text-3xl font-bold">

        {value}

      </p>


    </div>


  );


}
