import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(req) {
    try {
        const { category } = await req.json();
        const products = await prisma.product.findMany({
            where: {
                category: category,
            },
        });

        if (!products) {
            return NextResponse.json({ message: "Products not found" }, { status: 404 });
        }

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}