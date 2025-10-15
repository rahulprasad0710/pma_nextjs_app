import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { getAllRooms } from "@/db/query/rooms";
import { unstable_cache } from "next/cache";

const RoomPage = async () => {
    const getCachedRoom = unstable_cache(
        async () => {
            const rooms = await getAllRooms();
            return rooms;
        },
        ["all-rooms"],
        {
            tags: ["rooms"],
        }
    );

    const roomsTypeList = await getCachedRoom();

    return (
        <section>
            <div className='relative w-full h-80 group overflow-hidden'>
                <h1 className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white '>
                    Rooms
                </h1>
                <Image
                    src='/images/r1.jpg'
                    alt='room image'
                    fill
                    className='z-10 object-cover'
                />
            </div>
            <div className='max-w-6xl mx-auto mt-20'>
                <div>
                    {roomsTypeList.map((room) => (
                        <div
                            key={room.id}
                            className='p-4 border border-amber-300 mb-6 grid grid-cols-6 md:grid-cols-6 gap-8 m-4'
                        >
                            <div className='col-span-6 md:col-span-4'>
                                <h2 className='text-2xl font-bold mb-2'>
                                    {room.name}
                                </h2>
                                <p className='mb-2'>{room.description}</p>
                                <p className='mb-2'>Price: ${room.roomPrice}</p>
                                <p className='mb-2'>
                                    Total Rooms Available:{" "}
                                    {room.totalNumberOfRooms}
                                </p>
                                <p className='mb-2'>
                                    Facilities:{" "}
                                    {room.facilities &&
                                    room.facilities.length > 0
                                        ? room.facilities.join(", ")
                                        : "No facilities listed"}
                                </p>
                                <div className='flex justify-end'>
                                    <Button className='bg-amber-700 hover:bg-amber-800 cursor-pointer py-3 px-6 mt-4'>
                                        BOOK NOW
                                    </Button>
                                </div>
                            </div>
                            <div className='col-span-6 md:col-span-2'>
                                <div className='overflow-hidden'>
                                    <Image
                                        src={
                                            room?.thumbnailPublicUrl ??
                                            "/images/h3.jpg"
                                        }
                                        alt='room image'
                                        width={200}
                                        height={100}
                                        className='w-full transition-all duration-1000 group-hover:scale-110 object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoomPage;
