import { and, eq, gte, inArray, lte } from "drizzle-orm";
import { booking, bookingRoom, room } from "@/db/schema";

import { db } from "@/db"; // your drizzle instance

export async function getRoomTypeAvailability({
    roomTypeId,
    checkInDate,
    checkOutDate,
}: {
    roomTypeId: number[];
    checkInDate: string;
    checkOutDate: string;
}) {
    console.log({ roomTypeId, checkInDate, checkOutDate });

    // Fetch all matching booking rooms in one query
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
    const result = roomTypeId.map((id) => ({
        roomTypeId: id,
        roomIdList: bookingRooms
            .filter((br) => br.roomTypeId === id)
            .map((br) => br.roomId),
    }));

    return result;
}
