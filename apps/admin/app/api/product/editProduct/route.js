// route to edit product

import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function POST(req) {
    try {
        const { productId, name, price, stock } = await req.json();

        // Check if the product exists
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return new Response("Product not found", { status: 404 });
        }

        // Use existing values if no new ones are provided
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name: name ?? product.name,
                price: price ?? product.price,
                stock: stock ?? product.stock
            }
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}