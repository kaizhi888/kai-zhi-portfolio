import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kai Zhi - Portfolio | Cybersecurity & Blockchain Enthusiast",
  description: "Personal portfolio of Kai Zhi - Cybersecurity Enthusiast, Blockchain Advocate, and Developer. Explore my experiences, projects, certifications, and achievements.",
  keywords: "Kai Zhi, Portfolio, Cybersecurity, Blockchain, Developer, Web3, SOC, SIEM",
  authors: [{ name: "Kai Zhi" }],
  openGraph: {
    title: "Kai Zhi - Portfolio",
    description: "Cybersecurity Enthusiast | Blockchain Advocate | Developer",
    type: "website",
    url: "https://kai-zhi-portfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}

