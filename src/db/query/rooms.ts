import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { roomType } from "@/db/schema"; // adjust path to your schema

export async function getRoomById(id: string) {
    return db
        .select()
        .from(roomType)
        .where(eq(roomType.id, Number(id)))
        .then((res) => res[0]);
}

export async function getRoomBySlug(slug: string) {
    return db
        .select()
        .from(roomType)
        .where(eq(roomType.slug, slug))
        .then((res) => res[0]);
}

export async function getAllRooms() {
    const allRooms = await db
        .select()
        .from(roomType)
        .where(eq(roomType.isActive, true))
        .orderBy(asc(roomType.name));
    console.log({
        allRooms,
    });
    return allRooms;
}
