import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { SupportChat } from './SupportChat';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(204_42%_98%)] from-0% via-background to-background dark:from-[hsl(var(--background))] dark:via-background dark:to-background">
      <Navigation />
      <main className="relative z-0 pt-[7.5rem]">
        {children}
      </main>
      <Footer />
      <SupportChat />
    </div>
  );
};

export default Layout;