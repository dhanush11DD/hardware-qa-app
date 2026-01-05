import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './styles/colors.css';
import './styles/animations.css';
import SideNav from './components/layout/SideNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hardware QA & Logistics',
  description: 'Manage hardware testing, inventory, and delivery.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <SideNav />
          <main style={{ marginLeft: '280px', flex: 1, minHeight: '100vh', background: '#f8fafc' }}>
            <header className="h-16 border-b bg-white/80 backdrop-blur sticky top-0 z-10 px-8 flex items-center justify-between">
              <div>
                {/* Header content/Breadcrumbs could go here */}
              </div>
            </header>
            <div className="p-8 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
