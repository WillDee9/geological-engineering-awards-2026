import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';


export const dynamic = 'force-dynamic';
export const revalidate = 0;



export async function GET(){

try{


const {data,error}=await supabaseAdmin
.from('nominations')
.select('status');



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



const stats={

total:data.length,


pending:data.filter(
item=>item.status==='pending'
).length,


approved:data.filter(
item=>item.status==='approved'
).length,


rejected:data.filter(
item=>item.status==='rejected'
).length

};



return NextResponse.json(
stats,
{
headers:{
'Cache-Control':'no-store'
}
}
);



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
