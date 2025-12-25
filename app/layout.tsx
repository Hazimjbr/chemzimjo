import type { Metadata } from "next";
import "./globals.css";
import AITutor from "@/components/visual/AITutor";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "الكيمياء التفاعلية | الحموض والقواعد - المنهاج الأردني 2025",
  description: "موقع تعليمي تفاعلي شامل لمادة الحموض والقواعد حسب المنهاج الأردني 2025. يتضمن دروس تفاعلية، محاكاة مختبرية، واختبارات.",
  keywords: ["كيمياء", "حموض", "قواعد", "المنهاج الأردني", "تعليم", "محاكاة"],
  authors: [{ name: "Chemistry Education" }],
  openGraph: {
    title: "الكيمياء التفاعلية | الحموض والقواعد",
    description: "تعلم الكيمياء بطريقة تفاعلية وممتعة",
    type: "website",
    locale: "ar_JO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <Providers>
          {children}
          <AITutor />
        </Providers>
      </body>
    </html>
  );
}
