import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Evolve | Direction, Tech, Marketing',
  description: 'Ecommerce Innovation Agency for Visionary Brands — Brand Direction, Advanced Tech, Performance Marketing',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
