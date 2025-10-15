import { room, roomType } from "@/db/schema";

import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const withRooms = searchParams.get("withRooms");

        let result = [];

        if (withRooms === "true") {
            const roomTypeResult = await db
                .select()
                .from(roomType)
                .where(eq(roomType.isActive, true));

            result = await Promise.all(
                roomTypeResult.map(async (rt) => {
                    const rooms = await db
                        .select()
                        .from(room)
                        .where(eq(room.roomTypeId, rt.id));

                    return {
                        ...rt,
                        rooms,
                    };
                })
            );
        } else {
            result = await db
                .select()
                .from(roomType)
                .where(eq(roomType.isActive, true));
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
