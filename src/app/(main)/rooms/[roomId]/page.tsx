import { getAllRooms, getRoomBySlug } from "@/db/query/rooms";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { unstable_cache } from "next/cache";

export const dynamicParams = false;

export type Room = {
    id: number;
    name: string;
    description: string;
    facilities: string[];
    isActive: boolean;
    thumbnailUrlId: string | null;
    roomPrice: string; // could also be number if you parse it
    totalNumberOfRooms: number;
};

export async function generateStaticParams() {
    try {
        const rooms = await getAllRooms();

        return rooms.map((room) => ({
            roomId: room?.slug?.toString(),
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

const RoomDetailsPage = async ({
    params,
}: {
    params: Promise<{ roomId: string }>;
}) => {
    const { roomId } = await params;
    const getCachedRoom = unstable_cache(
        async () => {
            return getRoomBySlug(roomId);
        },
        [roomId],
        {
            tags: [`room-${roomId}`],
        }
    );
    const room = await getCachedRoom();

    if (!room) {
        return <div>Room not found</div>;
    }

    return (
        <div className='relative'>
            <div className='w-full  h-[500px] overflow-hidden relative '>
                <Image
                    src={room?.thumbnailPublicUrl ?? "/images/h3.jpg"}
                    alt='room image'
                    fill
                    className='transition-all duration-1000 group-hover:scale-110 object-cover'
                />
            </div>
            <div className='max-w-6xl mx-auto mt-2 h-[300px]'>
                <div>
                    <h1 className='text-3xl font-semibold text-amber-600 mt-4 '>
                        {" "}
                        {room.name}
                    </h1>
                    <p>{room.description}</p>
                    <div className='flex justify-between items-baseline-last'>
                        <div>
                            <p>Price: ${room.roomPrice}</p>
                        </div>
                        <div className='p-4 bg-amber-50'>
                            <Link
                                href={`/booking?roomType=${room.id}`}
                                type='button'
                                className='transition font-medium shadow-sm text-xl bg-amber-700 px-4 py-2  text-white hover:bg-amber-800'
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailsPage;
