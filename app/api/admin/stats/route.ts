import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";


export async function GET(){

  try {

    const {data, error} =
      await supabaseAdmin
        .from("nominations")
        .select("*");


    console.log("ADMIN READ TEST:", data);


    if(error){

      console.log("SUPABASE ERROR:", error);

      return NextResponse.json({
        error:error.message
      });

    }


    return NextResponse.json({

      count:data?.length || 0,

      nominations:data

    });


  }
  catch(error:any){

    console.log(error);

    return NextResponse.json({
      error:error.message
    });

  }

}
