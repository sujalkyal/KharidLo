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

        const id = session.user.id;
        const orderDetails = await req.json();

        // Validate required fields
        if (!orderDetails.products || !Array.isArray(orderDetails.products) || orderDetails.products.length === 0) {
            return NextResponse.json({ message: "Products list is required and must be an array" }, { status: 400 });
        }

        const { products, amount, name, address, phone, paymentMode = "COD" } = orderDetails;

        // Create order in database
        const order = await prisma.orders.create({
            data: {
                userId: id, // Corrected user connection
                products, // Prisma supports direct JSON array insertion
                amount,
                phone,
                name,
                address,
                paymentMode,
            },
        });

        // Clear the user's cart after order placement by setting it to an empty array
        await prisma.user.update({
            where: { id },
            data: { cart: [] },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Error placing order:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
