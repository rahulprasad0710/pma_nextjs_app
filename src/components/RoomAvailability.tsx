"use client";

import { Calendar1Icon, ChevronDown, Minus, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { format } from "date-fns";

const RoomAvailability = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const [checkInDate, setCheckInDate] = React.useState<Date | undefined>(
        undefined
    );
    const [checkOutDate, setCheckOutDate] = React.useState<Date | undefined>(
        undefined
    );

    const handleDayClick = (day: Date) => {
        setBeforeCheckOutDate(day);
        setCheckOutDate(undefined);
    };

    const [beforeCheckOutDate, setBeforeCheckOutDate] =
        React.useState<Date>(today);

    return (
        <div className='relative max-w-6xl m-auto  '>
            <div className='mt-4 bg-accent/20 p-4 lg:absolute lg:inset-x-0 lg:-top-20 lg:z-30 lg:p-0  lg:shadow-xl '>
                <div className='h-[400px] w-full lg:h-[70px] bg-teal-300'>
                    <div className='flex h-full w-full flex-col lg:flex-row '>
                        <div className='flex-1 border-r'>
                            <div className='relative h-full w-full bg-white'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='flex h-full  items-center justify-between px-8  w-full cursor-pointer'>
                                        {checkInDate
                                            ? format(
                                                  checkInDate ?? new Date(),
                                                  "PPP"
                                              )
                                            : "Check In"}
                                        <Calendar1Icon className='text-base text-accent-hover' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full!'>
                                        <Calendar
                                            mode='single'
                                            selected={checkInDate}
                                            onSelect={setCheckInDate}
                                            onDayClick={handleDayClick}
                                            className='w-full !border-0 focus-visible:ring-0'
                                            captionLayout='dropdown'
                                            disabled={{ before: today }}
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className='flex-1 border-r'>
                            <div className='relative h-full w-full bg-white'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='flex h-full  items-center justify-between px-8  w-full cursor-pointer'>
                                        {checkOutDate
                                            ? format(
                                                  checkOutDate ?? new Date(),
                                                  "PPP"
                                              )
                                            : "Check Out"}
                                        <Calendar1Icon className='text-base text-accent-hover' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full!'>
                                        <Calendar
                                            mode='single'
                                            selected={checkOutDate}
                                            onSelect={setCheckOutDate}
                                            className='w-full !border-0 focus-visible:ring-0'
                                            captionLayout='dropdown'
                                            disabled={{
                                                before: beforeCheckOutDate,
                                            }}
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
                                                <button className='px-2 bg-gray-100 rounded cursor-pointer'>
                                                    <Minus size={14} />
                                                </button>
                                                <div className='px-2 font-medium'>
                                                    2
                                                </div>
                                                <button className='px-2 bg-gray-100 rounded cursor-pointer'>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between w-[270px] px-4 py-2 '>
                                            <div className='flex gap-1 items-center justify-between'>
                                                <div>Child</div>
                                            </div>

                                            <div className='flex gap-1'>
                                                <button className='px-2 bg-gray-100 rounded cursor-pointer'>
                                                    <Minus size={14} />
                                                </button>
                                                <div className='px-2 font-medium'>
                                                    2
                                                </div>
                                                <button className='px-2 bg-gray-100 rounded cursor-pointer'>
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
                                <Button className=' h-full bg-primary w-[300px] text-center  text-xl  px-8 cursor-pointer'>
                                    Check Availability
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomAvailability;
