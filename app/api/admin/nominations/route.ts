import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function GET() {

  try {


    const { data, error } =
      await supabaseAdmin
        .from("nominations")
        .select(`
          *,
          categories(
            name
          )
        `)
        .order(
          "created_at",
          {
            ascending:false
          }
        );



    if(error){

      console.error(
        "ADMIN NOMINATIONS ERROR:",
        error
      );


      return NextResponse.json(
        {
          error:error.message
        },
        {
          status:400
        }
      );

    }




    return NextResponse.json(
      data || [],
      {
        status:200,
        headers:{
          "Cache-Control":"no-store"
        }
      }
    );



  }
  catch(error:any){


    console.error(
      "SERVER ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );


  }


}
