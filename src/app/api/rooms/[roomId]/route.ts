import { and, eq } from "drizzle-orm";

import { NextResponse } from "next/server";
import { db } from "@/db"; // adjust path to your drizzle instance
import { roomType } from "@/db/schema"; // adjust path to your schema

export async function GET(
    req: Request,
    params: { params: Promise<{ roomId: string }> }
) {
    console.log({
        params,
    });
    try {
        const resolvedParams = await params.params;
        const roomId = Number(resolvedParams.roomId);

        if (isNaN(roomId)) {
            return NextResponse.json(
                { error: "Invalid roomId" },
                { status: 400 }
            );
        }

        const result = await db
            .select()
            .from(roomType)
            .where(and(eq(roomType.id, roomId), eq(roomType.isActive, true)))
            .limit(1);

        if (result.length === 0) {
            return NextResponse.json(
                { error: "Room not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error fetching room:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
