import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { TiHeartHalfOutline } from "react-icons/ti";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";

export default async function MyNavBar() {
    const session = await auth()

    return (
        <Navbar
            maxWidth="xl"
            className="bg-gradient-to-r from-purple-400 to-purple-700"
            classNames={{
                item: [
                    "data-[active=true]:text-yellow-200",
                    "text-xl",
                    "text-white",
                    "uppercase"
                ]
            }}
        >
            <NavbarBrand as={Link} href="/">
                <TiHeartHalfOutline size={40} className="text-gray-200" />
                <div className="font-bold text-3xl flex">
                    <span className="text-gray-900">Other</span>
                    <span className="text-gray-200">Half</span>
                </div>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavLink href="/members" label="Matches" />
                <NavLink href="/lists" label="Lists" />
                <NavLink href="/messages" label="Messages" />
            </NavbarContent>
            <NavbarContent justify="end">
                {session?.user ? (
                    <UserMenu user={session.user} />
                ) : (
                    <>
                        <Button as={Link} href="/login" variant="bordered" className="text-white">Login</Button>
                        <Button as={Link} href="/register" variant="bordered" className="text-white">Register</Button>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    )
}
