// route to get all orders of a user

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
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
            select: {
                orders: true
            }
        });
    
        if (!user.orders) {
            return NextResponse.json({ message: "Orders not found" }, { status: 404 });
        }

        return NextResponse.json(user.orders);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}