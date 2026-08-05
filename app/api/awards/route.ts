import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';


export async function GET() {

  try {


    const { data, error } =
      await supabaseAdmin
        .from('nominations')
        .select(`
          id,
          nomination_code,
          nominee_name,
          nominee_phone,
          nominee_email,
          nominee_image_url,
          reason,
          status,
          categories(
            id,
            name
          )
        `)
        .eq('status', 'approved')
        .order('created_at', {
          ascending:false
        });



    if(error){

      return NextResponse.json(
        {
          error:error.message
        },
        {
          status:400
        }
      );

    }







    return NextResponse.json(data);



  } catch(error:any){


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