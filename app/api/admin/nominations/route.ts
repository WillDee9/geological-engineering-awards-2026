import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';



export async function GET(){


const {data,error}=await supabaseAdmin

.from('nominations')

.select(`
*,
categories(
name
)
`)

.order(
'created_at',
{
ascending:false
}
);



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


}