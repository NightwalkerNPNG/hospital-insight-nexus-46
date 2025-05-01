
import React from 'react';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} user={user} unreadNotifications={3} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
