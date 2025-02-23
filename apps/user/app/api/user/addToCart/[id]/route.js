// add a particular product to the cart
// not corrected

import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function POST(req, { params }) {
    try{
        const { id } = params;
        const { userId, productId, quantity } = req.body;
        const cartDetails = await prisma.cart.create({
            data: {
                userId: userId,
                productId: productId,
                quantity: quantity,
            },
        });
    
        if (!cartDetails) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(cartDetails);
}