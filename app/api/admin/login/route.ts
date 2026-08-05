import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';



export async function POST(
request:Request
){

const {
username,
password
}=await request.json();



const {data,error}=await supabaseAdmin
.from('admins')
.select('*')
.eq('username',username)
.eq('password',password)
.single();



if(error || !data){

return NextResponse.json(
{
error:'Invalid username or password'
},
{
status:401
}
);

}



const response = NextResponse.json({
success:true
});



response.cookies.set(
'admin_session',
'authenticated',
{
httpOnly:true,
secure:false,
sameSite:'lax',
maxAge:60*60*8
}
);



return response;


}