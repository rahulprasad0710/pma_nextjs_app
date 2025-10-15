"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";
import router from "next/router";

const HeaderDropdown = () => {
    const handleLogout = async () => {
        try {
            const response = await authClient.signOut();

            if (response?.data) {
                router.push("/");
            }
        } catch (error) {
            console.log("LOG: ~ handleLogout ~ error:", error);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='text-amber-400'>
                My Profile
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuItem>My bookings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className='cursor-pointer'
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default HeaderDropdown;
