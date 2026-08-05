import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";


export const dynamic = "force-dynamic";
export const revalidate = 0;



export async function GET(){


try{


const {data,error}=await supabaseAdmin
.from("nominations")
.select("id,status");



if(error){

console.error(
"STATS ERROR:",
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




const stats={


total:data?.length || 0,


pending:
data?.filter(
(item)=>item.status==="pending"
).length || 0,


approved:
data?.filter(
(item)=>item.status==="approved"
).length || 0,


rejected:
data?.filter(
(item)=>item.status==="rejected"
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
