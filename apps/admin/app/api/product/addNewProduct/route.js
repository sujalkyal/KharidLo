// route to add new product

import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function POST(req) {
    try{
        const {name,image,description,price,stock} = await req.json();
        const product = await prisma.product.create({
            data:{
                name,
                image,
                description,
                price,
                stock
            }
        });    
        return NextResponse.json({product});
    }
    catch(error){
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}