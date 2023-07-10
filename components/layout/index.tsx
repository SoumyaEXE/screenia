/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import Github from "../shared/icons/github";
import Twitter from "../shared/icons/twitter";
import Script from "next/script";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA}');
        `}
      </Script>
      <Meta {...meta} />
      <div className="fixed w-full h-screen bg-gradient-to-r from-indigo-50 via-white to-yellow-50">
        <img
          className="object-cover w-full h-full"
          src="/images/grid-pattern.png"
          alt="pattern"
        />
      </div>
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="flex items-center justify-between h-16 max-w-screen-xl mx-5 xl:mx-auto">
          <Link href="/" className="flex items-center text-2xl font-display">
            <Image
              src="/images/logo.png"
              alt="Screenia logo"
              width="150"
              height="41"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>
        </div>
      </div>
      <main className="relative flex flex-col items-center justify-center w-full py-32">
        {children}
      </main>
      <footer className="relative mt-5 bg-white border-t">
        <div className="flex flex-col items-center justify-between w-full h-16 max-w-screen-xl px-3 pt-4 mx-auto sm:h-20 sm:pt-2 sm:flex-row sm:mb-0">
          <div>
            Made with <span className="text-xl text-red-500">❤</span> By Soumyadeep Dey
          </div>
          <div className="flex pb-4 space-x-4 sm:pb-0">
            <a
              className="group"
              aria-label="Said SoumyaEXE on Twitter"
              href="https://twitter.com/s_badaoui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </a>
            <a
              className="group"
              aria-label="Said SoumyaEXE on GitHub"
              href="https://github.com/SoumyaEXE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
