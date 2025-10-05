import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "프론트엔드 개발자 포트폴리오",
  description: "창의적이고 사용자 중심적인 웹 경험을 만드는 프론트엔드 개발자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
