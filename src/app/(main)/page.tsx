// import Footer from "@/components/Footer";
import RoomAvailability from "@/components/RoomAvailability";
import Rooms from "@/components/Rooms";
import SwiperImages from "@/components/SwiperImages";

export default function Home() {
    console.log({
        DATABASE_URL: process.env.DATABASE_URL!,
    });
    return (
        <div>
            <SwiperImages />
            <RoomAvailability />
            <Rooms />
        </div>
    );
}
