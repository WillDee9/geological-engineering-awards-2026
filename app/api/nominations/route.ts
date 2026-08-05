import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';



async function generateNominationCode() {


  while (true) {


    const randomNumber =
      Math.floor(100000 + Math.random() * 900000);


    const code = `AW26-${randomNumber}`;



    const { data, error } =
      await supabaseAdmin
        .from('nominations')
        .select('id')
        .eq('nomination_code', code)
        .maybeSingle();



    if(error){

      throw new Error(
        "Unable to generate nomination code."
      );

    }



    if(!data){

      return code;

    }


  }


}





export async function POST(
  request: Request
) {


  try {


    const formData =
      await request.formData();



    const nominator_name =
      String(
        formData.get('nominator_name') || ''
      );



    const nominator_phone =
      String(
        formData.get('nominator_phone') || ''
      );



    const nominee_name =
      String(
        formData.get('nominee_name') || ''
      );



    const nominee_phone =
      String(
        formData.get('nominee_phone') || ''
      );



    const nominee_email =
      String(
        formData.get('nominee_email') || ''
      ) || null;



    const category_id =
      String(
        formData.get('category_id') || ''
      );



    const reason =
      String(
        formData.get('reason') || ''
      );





    if(
      !nominator_name ||
      !nominator_phone ||
      !nominee_name ||
      !nominee_phone ||
      !category_id ||
      !reason
    ){

      return NextResponse.json(
        {
          error:
          "Please complete all required fields."
        },
        {
          status:400
        }
      );

    }






    const nomination_code =
      await generateNominationCode();





    const image =
      formData.get(
        'nominee_image'
      ) as File;



    let nominee_image_url = null;





    if(image && image.size > 0){



      const bytes =
        await image.arrayBuffer();



      const buffer =
        Buffer.from(bytes);



      const fileName =
        `${Date.now()}-${image.name.replace(/\s+/g,'-')}`;



      const {
        error:uploadError
      } =
      await supabaseAdmin
        .storage
        .from('nominee-images')
        .upload(
          fileName,
          buffer,
          {
            contentType:image.type
          }
        );




      if(uploadError){


        return NextResponse.json(
          {
            error:
            `Image upload failed: ${uploadError.message}`
          },
          {
            status:400
          }
        );


      }





      const {
        data:urlData
      } =
      supabaseAdmin
        .storage
        .from('nominee-images')
        .getPublicUrl(
          fileName
        );



      nominee_image_url =
        urlData.publicUrl;



    }







    const {
      data,
      error
    } =
    await supabaseAdmin
      .from('nominations')
      .insert({

        nomination_code,

        nominator_name,

        nominator_phone,


        nominee_name,

        nominee_phone,

        nominee_email,


        nominee_image_url,


        category_id,


        reason,


        status:'pending',

      })
      .select()
      .single();






    if(error){


      console.error(
        "DATABASE ERROR:",
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






    return NextResponse.json(
      {
        success:true,
        message:
        "Nomination submitted successfully."
      },
      {
        status:201
      }
    );






  }

  catch(error:any){



    console.error(
      "NOMINATION ERROR:",
      error
    );



    return NextResponse.json(
      {
        error:
        error.message ||
        "Server error while submitting nomination."
      },
      {
        status:500
      }
    );



  }


}