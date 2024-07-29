import cfg from '@/app.config';
import 'node_modules/modern-normalize/modern-normalize.css';
import './globals.css';

export const metadata = cfg.metadata;

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
