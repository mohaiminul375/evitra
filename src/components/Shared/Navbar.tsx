'use client'
import { useAuth } from '@/Provider/AuthProvider';
import ThemeToggle from '../Theme/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiMenuFries } from "react-icons/ci";
import Image from 'next/image';
import logo from "../../../public/logo.png";
import { Quintessential } from "next/font/google";
export const quintessential = Quintessential({
    weight: '400',
    subsets: ['latin'],
});

const navItems = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Events',
        path: '/events'
    },
    {
        title: 'Add Event',
        path: '/add-event'
    },
    {
        title: 'My Event',
        path: '/my-event'
    }
];
const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user)
    const pathname = usePathname();
    return (
        <header className="flex h-20 w-full items-center px-4 md:px-6 shadow-2xl bg-foreground fixed top-0 z-50">
            {/* Mobile Menu Icon */}
            <div className="lg:hidden mr-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <CiMenuFries className='text-foreground' />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid gap-2 py-6">
                            {navItems.map((item, index) => {
                                // if (item.title === 'Admin Dashboard' && user?.role !== 'Admin') {
                                //     return null;
                                // }
                                return (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className={`flex w-full items-center py-2 text-lg font-semibold text-white ${pathname === item.path ? 'underline shadow-2xl' : ''}`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center" prefetch={false}>
                {/* <MountainIcon /> */}
                <div className='flex items-center'>
                    <Image className='rounded-full' width={30} src={logo} alt='logo' />
                    <span className={`ml-2 text-lg md:text-3xl italic font-bold text-white block ${quintessential.className}`}>Evitra</span>
                </div>
            </Link>
            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex flex-grow justify-end mr-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-3">
                        {navItems.map((item, index) => {

                            // if (item.title === 'Admin Dashboard' && user?.role !== 'Admin') {
                            //     return null;
                            // }
                            return (
                                <NavigationMenuLink asChild key={index}>
                                    <Link
                                        href={item.path}
                                        className={`group text-white font-bold text-base ${pathname === item.path ? 'underline shadow-2xl' : ''}`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                </NavigationMenuLink>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Login/Register Buttons */}
            {user ? (
                <div className="ml-auto flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className='border-2 border-white'>
                                <AvatarImage className='cursor-pointer' src={user?.avatar} alt="avatar" />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className='cursor-default'>{user?.name}</DropdownMenuLabel>
                            <DropdownMenuLabel className='cursor-default'>{user?.email}</DropdownMenuLabel>
                            <DropdownMenuLabel className='cursor-pointer' onClick={logOut}>LogOut</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="ml-auto flex items-center">
                    <Link className="mx-2 text-white" href="/register">Register</Link>
                    <Link href="/login">
                        <Button variant="default" className="rounded-full">Login</Button>
                    </Link>
                </div>
            )}
            {/* theme */}
            <ThemeToggle />
        </header>


    );
};

export default Navbar;