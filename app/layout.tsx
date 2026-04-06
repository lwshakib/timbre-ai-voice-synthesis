import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Timbre AI — Secondary Liquidity & Portfolio Intelligence",
  description: "Private equity structured for exit. Institutional secondary market and AI-predicted exit topography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <TooltipProvider>
              {children}
              <Toaster richColors position="bottom-right" />
            </TooltipProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
