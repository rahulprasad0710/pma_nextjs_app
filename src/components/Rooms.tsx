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

const ActivityImageList = [
    {
        srcAddress: "/images/1.jpg",
        title: "hiking",
    },
    {
        srcAddress: "/images/4.jpg",
        title: "meditation",
    },

    {
        srcAddress: "/images/2.jpg",
        title: "Yoga Session",
    },
];

const mountainImg = "/images/9.jpg";

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
            <div className=' max-w-7xl mx-auto py-16 '>
                <div className='text-left'>
                    <div className=' font-gildaDisplay text-[24px] lg:text-[32px]'>
                        Select Your Room
                    </div>
                    <div className=' mb-8 font-gildaDisplay text-[15px] uppercase tracking-[4px]'>
                        ENJOY WORLD-CLASS STAY EXPERIENCE
                    </div>
                </div>
                <div className='mx-auto grid max-w-sm grid-cols-1 gap-8 items-stretch lg:mx-0 lg:max-w-none lg:grid-cols-3'>
                    {roomsTypeList.map((room) => (
                        <Link
                            className='cursor-pointer'
                            key={room.id}
                            href={`/rooms/${room.slug}`}
                        >
                            <div
                                key={room.id}
                                className='flex flex-col justify-between pb-6 h-full   shadow-xl'
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
                                            className='w-full transition-all duration-1000 group-hover:scale-110 object-cover overflow-hidden'
                                        />
                                    </div>
                                </div>

                                <div className='text-left px-4 py-4'>
                                    <h3 className='font-stretch-semi-expanded text-amber-600 text-2xl mb-2'>
                                        {room.name}
                                    </h3>
                                    <p className='mx-auto mb-2  text-yellow-900 lg:mb-2 line-clamp-3'>
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
            <div className=' bg-amber-50 py-16'>
                <div className='container mx-auto  max-w-7xl'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='flex flex-row  text-center p-6 bg-amber-50  shadow-none '
                            >
                                <div className='mb-4 text-amber-500 min-w-[60px] '>
                                    {feature.icon}
                                </div>
                                <div className='flex-1 text-left'>
                                    <h4 className='text-xl font-bold mb-2 text-black'>
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
            <div className=' bg-stone-50 py-16'>
                <div className='max-w-7xl mx-auto '>
                    <div className='text-left'>
                        <div className=' font-gildaDisplay text-[24px] lg:text-[32px]'>
                            Unforgettable Experience
                        </div>
                        <div className=' mb-8 font-gildaDisplay text-[15px] uppercase tracking-[4px]'>
                            MORE THAN JUST MOUNTAIN VIEW
                        </div>
                    </div>
                    <div className='flex'>
                        {ActivityImageList?.map((item, index) => (
                            <div
                                key={index}
                                className={`flex relative flex-col ${
                                    index === 0
                                        ? "flex-[1]"
                                        : index === 1
                                        ? "flex-[1.5]"
                                        : "flex-[1]"
                                }`}
                            >
                                <div className='absolute text-2xl text-stone-50 font-bold text-center w-full bottom-4'>
                                    {item.title}
                                </div>
                                <Image
                                    src={item.srcAddress}
                                    alt='Logo'
                                    width={200}
                                    height={40}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='relative w-full flex h-full items-center justify-center mb-12'>
                <Image
                    src={mountainImg}
                    alt='Logo'
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-[55vh] object-cover'
                />
                <div className='absolute z-20 mx-auto text-center text-amber-900 font-bold'>
                    <h3 className='mx-auto mb-6 max-w-[920px] font-primary text-[16px]  tracking-[2px] lg:text-[32px]'>
                        In the mountains, the mind rests where the soul feels at
                        home.
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default Rooms;
