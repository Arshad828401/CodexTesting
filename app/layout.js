import "./globals.css";

export const metadata = {
  title: "Junk or No",
  description: "A beginner-friendly food checker built with Next.js and TailwindCSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
