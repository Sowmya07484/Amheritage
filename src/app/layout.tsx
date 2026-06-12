import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Heritage Sprint | American Heritage Run',
  description: 'An educational endless runner game through American history.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased overflow-hidden bg-background">
        {children}
      </body>
    </html>
  );
}
