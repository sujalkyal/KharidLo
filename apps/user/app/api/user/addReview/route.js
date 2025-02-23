// route to add a review for a product

import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;
        //const userId = "28d82cba-fcc6-4c93-a213-4961fc58e542";

        const { productId, rating, comment } = await req.json();

        if (!productId || typeof rating !== "number" || !comment) {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        const newReview = await prisma.review.create({
            data: {
                productId,
                userId,
                rating,
                comment
            }
        });
        
        return NextResponse.json({ message: "Review added successfully", review: newReview }, { status: 201 });
    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}