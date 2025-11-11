import { and, eq, gte, inArray, lte } from "drizzle-orm";
import { booking, bookingRoom, room } from "@/db/schema";

import { NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(req: Request) {
    try {
        const resolvedParams = await req.json();
        const roomTypeId = resolvedParams.roomTypeId;
        const checkInDate = resolvedParams.checkInDate;
        const checkOutDate = resolvedParams.checkOutDate;

        console.log({
            roomTypeId,
            checkInDate,
            checkOutDate,
        });

        const bookingRooms = await db
            .select({
                roomTypeId: room.roomTypeId,
                roomId: room.id,
            })
            .from(bookingRoom)
            .leftJoin(booking, eq(bookingRoom.bookingId, booking.id))
            .leftJoin(room, eq(bookingRoom.roomById, room.id))
            .where(
                and(
                    inArray(room.roomTypeId, roomTypeId),
                    gte(booking.checkInDate, checkInDate),
                    lte(booking.checkOutDate, checkOutDate)
                )
            );

        // Group by roomTypeId
        const result = roomTypeId.map((id: number) => ({
            roomTypeId: id,
            roomIdList: bookingRooms
                .filter((br) => br.roomTypeId === id)
                .map((br) => br.roomId),
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching room:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
