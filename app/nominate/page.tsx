'use client';

import { FormEvent, useEffect, useState } from 'react';


type Category = {
  id: string;
  name: string;
};


export default function Nominate() {


  const [categories, setCategories] = useState<Category[]>([]);

  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);



  useEffect(() => {


    async function loadCategories() {

      try {


        const response = await fetch(
          '/api/categories'
        );


        const data = await response.json();


        if(response.ok){

          setCategories(data);

        }
        else{

          throw new Error(
            'Failed loading categories'
          );

        }



      } catch(error){

        console.error(error);

        setMessage(
          'Unable to load award categories.'
        );

      }


    }


    loadCategories();


  }, []);








  async function submit(
    e: FormEvent<HTMLFormElement>
  ){


    e.preventDefault();



    if(loading){

      return;

    }



    setLoading(true);

    setMessage('');



    const formElement = e.currentTarget

    const form = 
      new FormData(
        formElement
      );





    const image =
      form.get(
        'nominee_image'
      ) as File;




    if(!image || image.size === 0){


      setMessage(
        'Please upload the nominee picture.'
      );


      setLoading(false);

      return;

    }





    if(!image.type.startsWith('image/')){


      setMessage(
        'Only image files are allowed.'
      );


      setLoading(false);

      return;

    }





    if(image.size > 5 * 1024 * 1024){


      setMessage(
        'Image size must be less than 5MB.'
      );


      setLoading(false);

      return;

    }








    try {



      const response = await fetch(
        '/api/nominations',
        {

          method:'POST',

          body:form

        }

      );





      let data:any = {};



      try{

        data =
          await response.json();

      }
      catch(jsonError){

        console.error(
          "Response JSON error:",
          jsonError
        );

      }





      console.log(
        "Nomination response:",
        response.status,
        data
      );






      if(
        response.status === 200 ||
        response.status === 201
      ){



        setMessage(

        `Nomination submitted successfully.

        Thank you for recognizing excellence.

        We will contact the nominee to seek his/her approval before the nomination is officially confirmed.

        Awards Night Team`

        );



        formElement.reset();



      }
      else{


        setMessage(

          data?.error ||
          'Unable to submit nomination. Please try again.'

        );


      }





    }
    catch(error){


      console.error(
        "Submission error:",
        error
      );



      setMessage(
        'There was a problem submitting your nomination. Please try again.'
      );



    }
    finally{


      setLoading(false);


    }



  }









  return (

    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">


      <h1 className="font-display text-4xl font-bold">

        Award Nominations

      </h1>



      <p className="mt-3 text-slate-600">

        Nominate a deserving person for an award category.

      </p>






      <form

        onSubmit={submit}

        className="mt-10 space-y-5 rounded-2xl bg-white p-7 shadow-sm"

      >





        <h2 className="text-xl font-semibold">

          Nominator Information

        </h2>




        <input

          name="nominator_name"

          required

          placeholder="Your full name"

          className="w-full rounded-lg border p-3"

        />





        <input

          type="tel"

          name="nominator_phone"

          required

          placeholder="Your phone number"

          className="w-full rounded-lg border p-3"

        />






        <hr />






        <h2 className="text-xl font-semibold">

          Nominee Information

        </h2>





        <input

          name="nominee_name"

          required

          placeholder="Nominee's full name"

          className="w-full rounded-lg border p-3"

        />





        <label className="block text-sm font-medium">

          Nominee Picture

        </label>





        <input

          type="file"

          name="nominee_image"

          accept="image/*"

          required

          className="w-full rounded-lg border p-3"

        />





        <input

          type="tel"

          name="nominee_phone"

          required

          placeholder="Nominee's WhatsApp number"

          className="w-full rounded-lg border p-3"

        />





        <input

          type="email"

          name="nominee_email"

          placeholder="Nominee email (optional)"

          className="w-full rounded-lg border p-3"

        />







        <select

          name="category_id"

          required

          className="w-full rounded-lg border p-3"

        >


          <option value="">

            Select Award Category

          </option>



          {
            categories.map(category=>(


              <option

                key={category.id}

                value={category.id}

              >

                {category.name}

              </option>


            ))
          }



        </select>







        <textarea

          name="reason"

          required

          minLength={20}

          placeholder="Why does this person deserve this award?"

          className="min-h-32 w-full rounded-lg border p-3"

        />








        <button

          type="submit"

          disabled={loading}

          className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white disabled:opacity-50"

        >

          {
            loading
            ?
            'Submitting...'
            :
            'Submit Nomination'
          }


        </button>







        {
          message && (


            <div className="whitespace-pre-line rounded-lg bg-slate-100 p-3 text-sm text-slate-700">

              {message}

            </div>


          )
        }





      </form>



    </main>

  );


}