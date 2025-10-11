import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ui/Toast";
import { AppProvider } from "@/contexts/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Chatsy - Modern Chat Platform",
    template: "%s | Chatsy"
  },
  description: "Experience seamless communication with Chatsy - a modern WhatsApp-like chat platform. Connect with communities, share ideas, and build lasting connections.",
  keywords: ["chat", "messaging", "community", "communication", "real-time", "forums", "discussion"],
  authors: [{ name: "Chatsy Team" }],
  creator: "Chatsy",
  publisher: "Chatsy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Chatsy - Connect with Everyone",
    description: "Join thousands of users in real-time conversations. Share ideas, build communities, and connect with like-minded people.",
    url: "https://chatsy.app",
    siteName: "Chatsy",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatsy - Modern Chat Platform",
    description: "Experience seamless communication with our modern chat platform. Join communities and connect with everyone.",
    creator: "@chatsy"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00a884" },
    { media: "(prefers-color-scheme: dark)", color: "#0b141a" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Chatsy" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppProvider>
            <ToastProvider>
              <Navbar/>
              {children}
            </ToastProvider>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
