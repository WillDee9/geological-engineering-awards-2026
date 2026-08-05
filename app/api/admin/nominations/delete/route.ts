import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';


export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function POST(request: Request) {

  try {


    const { id } = await request.json();



    if(!id){

      return NextResponse.json(
        {
          error:'Nomination ID required'
        },
        {
          status:400
        }
      );

    }



    // Check if nomination exists

    const { data: nomination, error: findError } =
      await supabaseAdmin
        .from('nominations')
        .select('id, nominee_image_url')
        .eq('id', id)
        .single();



    if(findError || !nomination){

      return NextResponse.json(
        {
          error:'Nomination not found'
        },
        {
          status:404
        }
      );

    }



    // Delete nomination

    const { error: deleteError } =
      await supabaseAdmin
        .from('nominations')
        .delete()
        .eq('id', id);



    if(deleteError){

      return NextResponse.json(
        {
          error:deleteError.message
        },
        {
          status:400
        }
      );

    }



    // Verify deletion

    const { data: check } =
      await supabaseAdmin
        .from('nominations')
        .select('id')
        .eq('id', id);



    console.log(
      "DELETE CHECK:",
      check
    );



    return NextResponse.json({

      success:true,

      message:'Nomination deleted successfully'

    });



  }
  catch(error:any){


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