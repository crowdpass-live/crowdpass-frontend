import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/providers/LenisProvider";
import dynamic from 'next/dynamic';
const StarknetContextProvider = dynamic(
  () => import('@/contexts/UserContext').then((mod) => mod.StarknetContextProvider),
  { ssr: false }
);
const StarknetProvider = dynamic(
  () => import('@/components/StarknetProvider').then((mod) => mod.StarknetProvider),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StarknetProvider>
          <StarknetContextProvider>
          <LenisProvider>
            {children}
            <Toaster richColors={true} />
          </LenisProvider>
          </StarknetContextProvider>
        </StarknetProvider>
        <Analytics />
      </body>
    </html>
  );
}