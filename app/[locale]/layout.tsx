export const dynamic = 'force-dynamic';

import type { Metadata } from "next";

import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: "AutoPrestige | Montreal",
  description: "The best place to find used vehicles in Montreal.",
};

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet" />
      <link type="image/png" sizes="16x16" rel="icon" href="/app/favicon.png" />
      </head>
      <body className={`flex flex-col min-h-screen`}>
      <NextIntlClientProvider messages={messages}>

        <Header />
        <Navbar />

        {/* Main content wrapped in NextIntlClientProvider 
        <NextIntlClientProvider locale={locale} messages={messages}> */}
          <main className="flex-grow">
            {children}
          </main>

        {/* Footer */}
        <Footer />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
