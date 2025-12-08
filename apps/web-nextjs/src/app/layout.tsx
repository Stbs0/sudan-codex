import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/side-bar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { PHProvider } from "@/providers/PHProvider";
import TanstackQueryProvider from "@/providers/query-client";
import { ThemeProvider } from "@/providers/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sudancodex.app"),
  title: "Sudan Codex | Search Through Sudan Drug Index",
  description:
    "Sudan Codex allows you to effortlessly search through Sudan's comprehensive drug index. Find drug information, generic names, and manufacturers quickly and accurately.",
  keywords:
    "Sudan drug list, pharmaceutical index Sudan, medicine search Sudan, generic drug Sudan, Sudan Drug Index",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Sudan Codex | Search Through Sudan Drug Index",
    description:
      "Sudan Codex allows you to effortlessly search through Sudan's comprehensive drug index. Find drug information, generic names, and manufacturers quickly and accurately.",
    url: "https://www.sudancodex.app",
    siteName: "Sudan Codex",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <head>
        {(process.env.NODE_ENV === "development" ||
          process.env.VERCEL_ENV === "preview") && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-recording-token='1f7bHNukrP8KVD1Aln7r0Ddjid3aCixbNteNTlgJ'
            data-is-production-environment='false'
            src='https://snippet.meticulous.ai/v1/meticulous.js'
          />
        )}
      </head>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PHProvider>
          <TanstackQueryProvider>
            {process.env.NODE_ENV === "development" && (
              <Suspense fallback={null}>
                <ReactQueryDevtools initialIsOpen={false} />
              </Suspense>
            )}
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange>
              <AuthProvider>
                <SidebarProvider defaultOpen={false}>
                  <AppSidebar />
                  <SidebarInset>
                    <Header />
                    <main className='flex-1'>{children}</main>
                    <Toaster
                      richColors
                      closeButton
                    />
                    <Footer />
                  </SidebarInset>
                </SidebarProvider>
              </AuthProvider>
            </ThemeProvider>
          </TanstackQueryProvider>
        </PHProvider>
      </body>
    </html>
  );
}
