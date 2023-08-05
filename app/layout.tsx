import type { Metadata } from 'next';
import 'node_modules/modern-normalize/modern-normalize.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROG STRIX Monitor',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}