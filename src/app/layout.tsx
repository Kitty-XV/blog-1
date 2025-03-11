import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from "@/components/layout/PageTransition";
import { AnimatePresence } from "@/components/layout/AnimatePresence";
import { ScrollToTop } from '@/components/layout/ScrollToTop'

const inter = Inter({ subsets: ["latin"] });
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Renne's blog",
  description: "Welcome to my tea party",
  icons: {
    icon: [
      {
        url: '/images/avatar/avatar.jpg',
        sizes: '32x32',
        type: 'image/jpeg',
      },
      {
        url: '/images/avatar/avatar.jpg',
        sizes: '16x16',
        type: 'image/jpeg',
      }
    ],
    apple: {
      url: '/images/avatar/avatar.jpg',
      sizes: '180x180',
      type: 'image/jpeg',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className,
          notoSansSC.className
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <AnimatePresence>
              <PageTransition>{children}</PageTransition>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
