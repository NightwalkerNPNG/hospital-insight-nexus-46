
import React, { useState } from 'react';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children }) => {
  // Mock user data for header
  const user = {
    name: "Dr. Smith",
    role: "Administrator",
    avatar: ""
  };

  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar - always rendered but hidden on mobile */}
      <Sidebar className="hidden md:block" />
      
      {/* Mobile sidebar - only rendered when open */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-4/5 max-w-[300px]">
          <Sidebar className="w-full h-full border-none" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} user={user} unreadNotifications={3} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
