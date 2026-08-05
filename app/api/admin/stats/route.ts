import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {

  try {

    const { count, error } = await supabaseAdmin
      .from('nominations')
      .select('*', {
        count: 'exact',
        head: true
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



    const { data, error: statusError } =
      await supabaseAdmin
        .from('nominations')
        .select('status');


    if(statusError){

      return NextResponse.json(
        {
          error:statusError.message
        },
        {
          status:400
        }
      );

    }



    const stats = {

      total: count || 0,

      pending:
        data?.filter(
          item => item.status === 'pending'
        ).length || 0,


      approved:
        data?.filter(
          item => item.status === 'approved'
        ).length || 0,


      rejected:
        data?.filter(
          item => item.status === 'rejected'
        ).length || 0

    };



    return NextResponse.json(
      stats,
      {
        headers:{
          "Cache-Control":"no-store"
        }
      }
    );


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
