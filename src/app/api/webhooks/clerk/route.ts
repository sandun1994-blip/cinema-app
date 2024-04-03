import { prisma } from "@/db/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request:Request){
    const payload:WebhookEvent =await request.json()

    
    

    if (payload.type ==='user.created') {

        const {id,first_name,last_name,image_url} =payload.data

        try {
           
            
            await prisma.user.create({data:{
                id,name:`${first_name} ${last_name}`,
                image:image_url
            }})

            return NextResponse.json({status:'success'})
        } catch (error) {
            console.log(error);
            
            return NextResponse.json({status:'unsupported'})
        }
        
    }
}