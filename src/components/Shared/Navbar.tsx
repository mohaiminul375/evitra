'use client'
import ThemeToggle from '../Theme/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiMenuFries } from "react-icons/ci";
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
    const user = null;
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
                <span className="ml-2 text-lg text-white hidden lg:block">Evitra</span>

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
                            <Avatar>
                                <AvatarImage src={user?.img} alt="avatar" />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className='cursor-pointer'>{user?.user_name}</DropdownMenuLabel>
                            <DropdownMenuLabel className='cursor-pointer'>{user?.email}</DropdownMenuLabel>
                            {/* <DropdownMenuLabel onClick={logOut}>LogOut</DropdownMenuLabel> */}
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