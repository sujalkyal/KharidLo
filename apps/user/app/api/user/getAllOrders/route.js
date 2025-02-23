// route to get all orders of a user
//not crrected

import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function GET(req, { params }) {
    try{
        const { id } = params;
        const orders = await prisma.order.findMany({
            where: {
                userId: id,
            },
        });
    
        if (!orders) {
            return NextResponse.json({ message: "Orders not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(orders);
}