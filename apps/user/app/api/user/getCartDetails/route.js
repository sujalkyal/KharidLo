// returns all cart details of a user

import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(req) {
    try{
        const session = await getServerSession(authOptions);
        if(!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const id = session.user.id;
        //const id = "28d82cba-fcc6-4c93-a213-4961fc58e542";
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
            select: {
                cart: true
            }
        });
    
        if (!user.cart) {
            return NextResponse.json({ message: "Cart details not found" }, { status: 404 });
        }

        let result = [];
        const platformFee = 20;
        let totalAmount = 0 ;

        // iterate over the cart items and get the product details
        for (let i = 0; i < user.cart.length; i++) {
            const product = await prisma.product.findFirst({
                where: {
                    id: user.cart[i].productId
                }
            });
            result.push({
                ...user.cart[i],
                product: product
            });
            totalAmount += (product.price*user.cart[i].quantity)
        }

        totalAmount+=platformFee;

        return NextResponse.json({result,totalAmount});
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}