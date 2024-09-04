import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import Providers from "@/components/Providers/Provider";
import ReactQueryProviders from "@/components/Providers/providers";
import { cookies } from "next/headers";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media",
  description: "Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authToken = cookies().get("jwt")?.value || "";
  if (authToken) {
    return (
      <html lang="en">
        <body>
          <Providers>
            <ReactQueryProviders>
              <Layout>{children}</Layout>
            </ReactQueryProviders>
          </Providers>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body>
          <Providers>
            <ReactQueryProviders>{children}</ReactQueryProviders>
          </Providers>
        </body>
      </html>
    );
  }
}
