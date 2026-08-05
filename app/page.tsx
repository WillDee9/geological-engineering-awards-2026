import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">

        <p className="mb-5 text-sm font-bold tracking-[.2em] text-amber-300">
          GEOLOGICAL ENGINEERING DEPARTMENT AWARDS & DINNER NIGHT
        </p>


        <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight md:text-7xl">
          Celebrate the people who make us proud.
        </h1>


        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
          Nominate exceptional students for recognition at our Department Awards & Dinner Night and celebrate outstanding achievements.
        </p>



        <div className="mt-10 flex flex-wrap gap-4">


          <Link
            href="/nominate"
            className="rounded-xl bg-violet-500 px-6 py-3 font-semibold hover:bg-violet-400"
          >
            Nominate a Student
          </Link>



          <Link
            href="/awards"
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800"
          >
            View Awards
          </Link>



        </div>


      </div>
    </main>
  );
}