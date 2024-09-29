import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import MyNavBar from "@/components/navbar/MyNavBar";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: "OtherHalf",
    description: "Choose your half!",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    const userId = session?.user?.id || null

    return (
        <html lang="en">
            <body>
                <Providers userId={userId}>
                    <MyNavBar />
                    <main className="container mx-auto">{children}</main>
                </Providers>
            </body>
        </html>
    )
}
