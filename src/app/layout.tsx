import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import MyNavBar from "@/components/navbar/MyNavBar";

export const metadata: Metadata = {
    title: "OtherHalf",
    description: "Choose your half!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <MyNavBar />
                    <main className="container mx-auto">{children}</main>
                </Providers>
            </body>
        </html>
    )
}
