import Image from "next/image";
import bannerImg from "../../../public/banner.jpg";
import Link from "next/link";
import { Button } from "../ui/button";

const Banner = () => {
    return (
        <div className="relative aspect-[40/30] md:aspect-[29/10] w-full overflow-hidden rounded-xl">
            {/* Background Image */}
            <Image
                src={bannerImg}
                alt="Evitra Banner"
                fill
                className="object-cover object-center brightness-50"
                priority
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                    Plan. Join. Celebrate with Evitra
                </h1>
                <p className="text-base md:text-lg max-w-xl mb-6 drop-shadow">
                    Create events, invite friends, or join one today  it’s that simple. <br />
                    All in One Event Management Web App.
                    Your Events, Your Way Manage, Host & Join with Ease.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                    <Link href="/create-event">
                       <Button className="" variant='default'>Create Event</Button>
                    </Link>
                    <Link className="dark:border rounded-md border-white" href="/create-event">
                       <Button  variant='outline'>Explore Events</Button>
                    </Link>
                    
                </div>
            </div>
        </div>

    );
};

export default Banner;