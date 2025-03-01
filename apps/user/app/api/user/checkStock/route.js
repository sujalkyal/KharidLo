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

        const { cart } = await req.json(); // Array of { productId, quantity }
        if (!cart || cart.length === 0) {
            return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
        }

        const productIds = cart.map(item => item.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, stock: true }
        });

        let outOfStock = [];

        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product || product.stock < item.quantity) {
                outOfStock.push({
                    productId: item.productId,
                    name: product ? product.name : "Unknown Product",
                    availableStock: product ? product.stock : 0,
                    requestedQuantity: item.quantity
                });
            }
        });

        if (outOfStock.length > 0) {
            return NextResponse.json({
                message: "Some items are out of stock",
                outOfStock
            }, { status: 400 });
        }

        return NextResponse.json({ message: "All items are in stock" }, { status: 200 });
    } catch (error) {
        console.error("Error in checkStock API:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
