import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

console.log(
    'SUPABASE URL:',
    process.env.NEXT_PUBLIC_SUPABASE_URL
);


export async function GET() {
  const { data, error } =
    await supabaseAdmin
      .from('categories')
      .select('*')
      .order('name');

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { name } = await request.json();

  const { error } =
    await supabaseAdmin
      .from('categories')
      .insert({
        name,
        active: true
      });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true
  });
}
