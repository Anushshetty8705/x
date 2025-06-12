import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Xtrack-tarck your expense",
  description: "tarck your expense",
    icons: {
    icon: [
      
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <div className="relative w-full bg-slate-950 min-h-screen overflow-hidden">
          {/* Background gradient circles */}
          <div className="absolute bottom-0 left-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full z-0 bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full z-0 bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

          {/* Page content above background */}
 
            {children}
        
        </div>
      </body>
    </html>
  );
}