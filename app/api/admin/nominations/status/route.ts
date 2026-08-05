import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';


export async function POST(
  request: Request
) {

  try {


    const {
      id,
      status
    } = await request.json();



    if(!id || !status){

      return NextResponse.json(
        {
          error:'Missing information'
        },
        {
          status:400
        }
      );

    }



    const allowedStatuses = [
      'pending',
      'approved',
      'rejected'
    ];



    if(!allowedStatuses.includes(status)){


      return NextResponse.json(
        {
          error:'Invalid status'
        },
        {
          status:400
        }
      );


    }




    const { error } =
      await supabaseAdmin
        .from('nominations')
        .update({
          status:status
        })
        .eq('id', id);



    if(error){


      console.log(error);


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
      {
        success:true,
        message:
        `Nomination ${status} successfully`
      }
    );



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