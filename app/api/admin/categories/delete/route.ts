import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';


export async function POST(request: Request) {

  try {


    const {
      id
    } = await request.json();



    if(!id){

      return NextResponse.json(
        {
          error:'Category ID required'
        },
        {
          status:400
        }
      );

    }



    // Check if category has nominations

    const { count } =
      await supabaseAdmin
        .from('nominations')
        .select(
          '*',
          {
            count:'exact',
            head:true
          }
        )
        .eq('category_id', id);



    if(count && count > 0){

      return NextResponse.json(
        {
          error:
          'Cannot delete this category because nominations already exist.'
        },
        {
          status:400
        }
      );

    }



    const { error } =
      await supabaseAdmin
        .from('categories')
        .delete()
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



  }catch(error:any){


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