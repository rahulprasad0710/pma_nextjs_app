"use client";

import { Calendar1Icon, ChevronDown, Minus, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { format } from "date-fns";

type TRoom = {
    id: number;
    name: string;
    description: string | null;
    facilities:
        | (
              | "WIFI"
              | "AIR_CONDITIONING"
              | "TV"
              | "MINI_BAR"
              | "ROOM_SERVICE"
              | "SWIMMING_POOL"
              | "GYM"
              | "PARKING"
              | "BREAKFAST_INCLUDED"
              | "PET_FRIENDLY"
              | "SEA_VIEW"
              | "BALCONY"
              | "SAFE_BOX"
              | "HAIR_DRYER"
              | "COFFEE_MAKER"
          )[]
        | null;
    isActive: boolean;
    thumbnailUrlId: string | null;
    roomPrice: string;
    totalNumberOfRooms: number;
    thumbnailPublicUrl: string | null;
    slug: string;
    rooms: Rooms[];
};

type Rooms = {
    id: number;
    roomNumber: string;
};

type TRoomAvailableRooms = {
    roomTypeId: number;
    roomIdList: number[];
    rooms: Rooms[];
    totalRooms: number;
};

const BookingPage = () => {
    const [payloadRoomTypeId, setPayloadRoomTypeId] = useState<number[]>([]);
    const [payloadCheckInDate, setCheckInDate] = useState<Date | undefined>(
        undefined
    );
    const [payloadCheckOutDate, setCheckOutDate] = useState<Date | undefined>(
        undefined
    );

    const [isAvailableChecked, setIsAvailableChecked] = useState(false);

    const [noOfAdult, setNoOfAdult] = useState<number>(2);
    const [noOfAChild, setNoOfChild] = useState<number>(0);

    const [data, setData] = useState<TRoom[] | undefined>([]);
    const [availableRooms, setAvailableRooms] = useState<
        TRoomAvailableRooms[] | undefined
    >([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/rooms?withRooms=true");
            console.log("LOG: ~ fetchData ~ response:", response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("LOG: ~ fetchData ~ result:", result);
            setData(result);
        } catch (err) {
            // setError(err.message);
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const sendData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/available", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomTypeId: [1, 8, 9],
                    checkInDate: new Date(),
                    checkOutDate: new Date(),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("LOG: ~ sendData ~ result:", result);
            setAvailableRooms(result);
            setIsAvailableChecked(true);
        } catch (err) {
            // setError(err.message);
            console.error("Error sending data:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data && data?.length > 0) {
            const temp = data.map((e) => {
                return e.id;
            });
            setPayloadRoomTypeId(temp);
        }
    }, [data]);

    const showAvailableRooms = (
        selectedRoomTypeId: number,
        totalRoomLength: number
    ) => {
        const temp = availableRooms?.find(
            (e) => e.roomTypeId === selectedRoomTypeId
        );

        const aRoomLength = temp?.roomIdList?.length || 0;

        return totalRoomLength - aRoomLength;
    };

    return (
        <div>
            <div className='relative w-full h-80 group overflow-hidden'>
                <h1 className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white '>
                    Booking
                </h1>
                <Image
                    src='/images/h2.jpg'
                    alt='room image'
                    fill
                    className='z-10 object-cover'
                />
            </div>
            <div className='max-w-7xl mx-auto -mt-10 relative z-20 '>
                <div className=' w-full lg:h-[70px] '>
                    <div className='flex h-full w-full flex-col lg:flex-row shadow-sm'>
                        <div className='flex-1 border-r'>
                            <div className='relative h-full w-full bg-white'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='flex h-full  items-center justify-between px-8  w-full cursor-pointer'>
                                        {payloadCheckInDate
                                            ? format(
                                                  new Date(payloadCheckInDate),
                                                  "yyyy-MM-dd"
                                              )
                                            : "Check In"}
                                        <Calendar1Icon className='text-base text-accent-hover' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full!'>
                                        <Calendar
                                            mode='single'
                                            selected={payloadCheckInDate}
                                            onSelect={setCheckInDate}
                                            className='w-full !border-0 focus-visible:ring-0'
                                            captionLayout='dropdown'
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className='flex-1 border-r'>
                            <div className='relative h-full w-full bg-white'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='flex h-full  items-center justify-between px-8  w-full cursor-pointer'>
                                        {payloadCheckOutDate
                                            ? format(
                                                  new Date(payloadCheckOutDate),
                                                  "yyyy-MM-dd"
                                              )
                                            : "Check Out"}
                                        <Calendar1Icon className='text-base text-accent-hover' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full!'>
                                        <Calendar
                                            mode='single'
                                            selected={payloadCheckOutDate}
                                            onSelect={setCheckOutDate}
                                            className='w-full !border-0 focus-visible:ring-0'
                                            captionLayout='dropdown'
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className='flex-1 border-r'>
                            <div className='relative h-full w-full bg-white'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='flex h-full w-full items-center justify-between px-8'>
                                        <div className='flex gap-1 items-center justify-between  w-full cursor-pointer'>
                                            <div>Guests</div>
                                            <ChevronDown size={18} />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full'>
                                        <div className='flex items-center justify-between w-[270px] px-4 py-2 mb-2'>
                                            <div className='flex gap-1 items-center justify-between'>
                                                <div>Adult</div>
                                            </div>

                                            <div className='flex gap-1'>
                                                <button
                                                    disabled={noOfAdult === 0}
                                                    onClick={() => {
                                                        if (noOfAdult === 0)
                                                            return;
                                                        setNoOfAdult(
                                                            (prev) => prev - 1
                                                        );
                                                    }}
                                                    className='px-2 bg-gray-100 rounded cursor-pointer'
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <div className='px-2 font-bold'>
                                                    {noOfAdult}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (noOfAdult === 4)
                                                            return;
                                                        setNoOfAdult(
                                                            (prev) => prev + 1
                                                        );
                                                    }}
                                                    disabled={noOfAdult === 4}
                                                    className='px-2 bg-gray-100 rounded cursor-pointer'
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between w-[270px] px-4 py-2 '>
                                            <div className='flex gap-1 items-center justify-between'>
                                                <div>Child</div>
                                            </div>

                                            <div className='flex gap-1'>
                                                <button
                                                    onClick={() => {
                                                        if (noOfAChild === 0)
                                                            return;
                                                        setNoOfAdult(
                                                            (prev) => prev - 1
                                                        );
                                                    }}
                                                    className='px-2 bg-gray-100 rounded cursor-pointer'
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <div className='px-2 font-medium'>
                                                    {noOfAChild}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (noOfAChild === 4)
                                                            return;
                                                        setNoOfChild(
                                                            (prev) => prev + 1
                                                        );
                                                    }}
                                                    className='px-2 bg-gray-100 rounded cursor-pointer'
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className='flex-1 '>
                            <div className='relative h-full w-full bg-white'>
                                <Button
                                    onClick={sendData}
                                    className='flex h-full bg-primary w-full items-center text-xl justify-between px-8 cursor-pointer'
                                >
                                    Check Availability
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-w-6xl mx-auto'>
                    <div className='  grid grid-cols-6 md:grid-cols-6 gap-8 min-h-[300px] mt-6 m-4 '>
                        {data?.map((roomItem) => (
                            <div
                                className='col-span-6 md:col-span-3 border border-amber-300 '
                                key={roomItem.id}
                            >
                                <div className='grid grid-cols-8  gap-2 border m-4 border-gray-200'>
                                    <div className='col-span-8  md:col-span-2 relative bg-[rgba(58,53,53,0.5)]'>
                                        <Image
                                            src={
                                                roomItem?.thumbnailPublicUrl ??
                                                "/images/h3.jpg"
                                            }
                                            alt='room image'
                                            width={250}
                                            height={100}
                                            className='w-full transition-all duration-1000 group-hover:scale-110 object-cover'
                                        />
                                        <h3 className='font-semibold text-amber-50 text-center bg-[rgba(58,53,53,0.5)] absolute bottom-0 w-full'>
                                            {roomItem.name}
                                        </h3>
                                    </div>
                                    <div
                                        className='col-span-8  md:col-span-6
                                     p-4'
                                    >
                                        <div className='flex justify-between '>
                                            <h3 className='font-semibold text-amber-700'>
                                                {roomItem.name}
                                            </h3>
                                            <div className='text-right'>
                                                <p className='text-gray-400'>
                                                    Total Room :{" "}
                                                    {roomItem?.rooms?.length ||
                                                        0}
                                                </p>
                                                {!isAvailableChecked ? (
                                                    <p className='text-teal-400'>
                                                        Check Available
                                                    </p>
                                                ) : (
                                                    <p className='text-teal-400'>
                                                        Available :{" "}
                                                        {showAvailableRooms(
                                                            roomItem.id,
                                                            roomItem?.rooms
                                                                ?.length
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className='flex justify-between '>
                                            <div>
                                                <p className='text-sm'>
                                                    Room Capacity : 3 Adult.
                                                    Child: 1
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    Room Rates Inclusive of Tax
                                                </p>
                                            </div>
                                            <div>
                                                <h2 className='text-2xl font-extrabold text-right'>
                                                    ${roomItem.roomPrice}
                                                </h2>
                                                <p className='text-xs text-gray-500'>
                                                    Price for 1 Nights
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
