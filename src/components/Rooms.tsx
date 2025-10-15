import {
    Baby,
    Dumbbell,
    Heart,
    HeartHandshake,
    Wallet2,
    Waves,
} from "lucide-react";

import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { getAllRooms } from "@/db/query/rooms";
import { unstable_cache } from "next/cache";

const Rooms = async () => {
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

    const features = [
        {
            icon: <Waves className='w-12 h-12' />,
            title: "Swimming Pool",
            description:
                "Guests can immerse in the breathtaking views of the mountains and valley as they indulge in a refreshing swim in our infinity pool.",
        },
        {
            icon: <Wallet2 className='w-12 h-12' />,
            title: "Jacuzzi",
            description:
                "Right next to our infinity pool we have a Jacuzzi that can accommodate up to 15 people at a time.",
        },
        {
            icon: <Baby className='w-12 h-12' />,
            title: "Kids Club",
            description:
                "We have dedicated Kids Zone, Kids Swimming Pool, Ball Pit and Slides where your kids can play.",
        },
        {
            icon: <Dumbbell className='w-12 h-12' />,
            title: "GYM",
            description:
                "Guests can also make a use of our state of the art equipment in our gymnasium.",
        },
        {
            icon: <HeartHandshake className='w-12 h-12' />,
            title: "SPA - Sanar",
            description:
                "With tranquil surround, it is a perfect destination to pamper yourself with our Ayurvedic, hot stone or healing messages.",
        },
        {
            icon: <Heart className='w-12 h-12' />,
            title: "Wedding Destination",
            description:
                "We are a preferred destination for charming and intimate weddings, having successfully organized numerous weddings.",
        },
    ];
    return (
        <section className='rooms'>
            <div className=' max-w-6xl mx-auto py-12 '>
                <div className='text-left'>
                    <div className=' font-gildaDisplay text-[24px] lg:text-[32px]'>
                        Select Your Room
                    </div>
                    <div className=' mb-8 font-gildaDisplay text-[15px] uppercase tracking-[4px]'>
                        ENJOY WORLD-CLASS STAY EXPERIENCE
                    </div>
                </div>
                <div className='mx-auto grid max-w-sm grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
                    {roomsTypeList.map((room) => (
                        <Link
                            className='cursor-pointer'
                            key={room.id}
                            href={`/rooms/${room.slug}`}
                        >
                            <div
                                key={room.id}
                                className='flex flex-col justify-between pb-8 min-h-[500px]  shadow-xl'
                            >
                                <div>
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

                                <div className='text-left px-6 py-6'>
                                    <h3 className='font-stretch-semi-expanded text-amber-600 text-2xl mb-4'>
                                        {room.name}
                                    </h3>
                                    <p className='mx-auto mb-3 max-w-[300px] text-yellow-900 lg:mb-6'>
                                        {room.description}
                                    </p>
                                </div>
                                <div className='flex items-center justify-center   '>
                                    <Button className='bg-amber-700 hover:bg-amber-800 cursor-pointer py-6 px-12'>
                                        DISCOVER MORE
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='bg-amber-100 py-16'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='flex flex-row  text-center p-6 bg-amber-100  shadow-none '
                            >
                                <div className='mb-4 text-amber-500 min-w-[60px] '>
                                    {feature.icon}
                                </div>
                                <div className='flex-1 text-left'>
                                    <h4 className='text-xl font-bold mb-2 text-amber-800'>
                                        {feature.title}
                                    </h4>
                                    <p className='text-gray-600'>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rooms;
