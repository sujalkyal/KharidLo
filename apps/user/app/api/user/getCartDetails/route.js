// returns all cart details of a user
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function GET(req, { params }) {
    try{
        const { id } = params;
        const user = await prisma.user.findFirst({
            where: {
                id,
            },
        });
    
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const cartDetails = await prisma.product.findMany({
            where: { id: { in: user.cart } },
        });

        return NextResponse.json(cartDetails);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}