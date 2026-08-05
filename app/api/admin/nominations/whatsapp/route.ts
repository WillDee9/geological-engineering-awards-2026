import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';


export async function POST(request: Request) {

  try {

    const { id } = await request.json();


    if (!id) {

      return NextResponse.json(
        {
          error: 'Nomination ID missing'
        },
        {
          status:400
        }
      );

    }


    const { error } = await supabaseAdmin
      .from('nominations')
      .update({
        whatsapp_sent:true
      })
      .eq('id', id);



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



    return NextResponse.json({
      success:true
    });



  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:'Server error'
      },
      {
        status:500
      }
    );

  }

}