// returns particular product details
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function GET(req, { params }) {
    try{
        const { id } = params;
        const product = await prisma.product.findFirst({
            where: {
                id,
            },
        });
    
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(product);
}
