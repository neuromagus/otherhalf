"use client"

import { calculateAge } from "@/lib/util"
import { Button, Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react"
import { Member } from "@prisma/client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
    member: Member
}

export default function MemberSidebar({ member }: Props) {
    const pathName = usePathname()
    const basePath = `/members/${member.userId}`

    const navLinks = [
        { name: "Profile", href: `${basePath}` },
        { name: "Photos", href: `${basePath}/photos` },
        { name: "Chat", href: `${basePath}/chat` }
    ]

    return (
        <Card className="w-full mt-10 items-center h-[80vh] mx-2">
            <Image height={200} width={200}
                src={member.image || "/images/user.png"}
                alt="User profile main image"
                className="rounded-full mt-6 aspect-square object-cover"
            />
            <CardBody>
                <div className="flex flex-col items-center">
                    <div className="text-2xl">{member.name}, {calculateAge(member.dateOfBirth)}</div>
                    <div className="text-sm text-neutral-500">{member.city}, {member.country}</div>
                </div>
                <Divider className="my-3" />
                <nav className="flex flex-col ml-4 mt-1 text-2xl gap-2">
                    {navLinks.map(link => (
                        <Link href={link.href} key={link.name}
                            className={`block rounded ${pathName == link.href
                                ? "text-secondary"
                                : "hover:text-secondary/50"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </CardBody>
            <CardFooter>
                <Button as={Link} href="/members" fullWidth color="secondary" variant="bordered">Go back</Button>
            </CardFooter>
        </Card>
    )
}