
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/context/ThemeContext';
import { useLocale } from '@/hooks/useLocale';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Clock, 
  Bell, 
  Hospital, 
  UserRound,
  MonitorCheck,
  X,
  Monitor
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { locale, changeLocale } = useLocale();
  const [collapsed, setCollapsed] = useState(false);
  
  // Translate menu items based on locale
  const getMenuItems = () => {
    const mainNavItems = [
      {
        title: locale === 'en' ? 'Dashboard' : 'لوحة المعلومات',
        icon: <LayoutDashboard size={20} />,
        href: '/',
      },
      {
        title: locale === 'en' ? 'Patients' : 'المرضى',
        icon: <Users size={20} />,
        href: '/patients',
      },
      {
        title: locale === 'en' ? 'Staff' : 'الموظفون',
        icon: <UserRound size={20} />,
        href: '/staff',
      },
      {
        title: locale === 'en' ? 'Appointments' : 'المواعيد',
        icon: <Calendar size={20} />,
        href: '/appointments',
      },
      {
        title: locale === 'en' ? 'Departments' : 'الأقسام',
        icon: <Hospital size={20} />,
        href: '/departments',
      },
    ];
    
    const secondaryNavItems = [
      {
        title: locale === 'en' ? 'Monitoring' : 'المراقبة',
        icon: <Monitor size={20} />,
        href: '/monitoring',
      },
      {
        title: locale === 'en' ? 'Alerts' : 'التنبيهات',
        icon: <Bell size={20} />,
        href: '/alerts',
      },
      {
        title: locale === 'en' ? 'Reports' : 'التقارير',
        icon: <FileText size={20} />,
        href: '/reports',
      },
      {
        title: locale === 'en' ? 'Activity' : 'النشاط',
        icon: <Clock size={20} />,
        href: '/activity',
      },
    ];
    
    return { mainNavItems, secondaryNavItems };
  };
  
  const { mainNavItems, secondaryNavItems } = getMenuItems();
  
  const managementLabel = locale === 'en' ? 'Management' : 'الإدارة';
  const darkModeText = locale === 'en' ? 'Dark Mode' : 'الوضع المظلم';
  const lightModeText = locale === 'en' ? 'Light Mode' : 'الوضع المضيء';
  const arabicText = locale === 'en' ? 'Arabic' : 'العربية';
  const englishText = locale === 'en' ? 'English' : 'الإنجليزية';
  
  return (
    <div
      className={cn(
        "bg-sidebar flex h-screen flex-col border-r transition-all",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        {!collapsed && (
          <div className="flex flex-1 items-center gap-2 font-semibold text-sidebar-foreground">
            <Hospital size={24} />
            <span>{locale === 'en' ? 'Hospital Nexus' : 'مستشفى الحياة'}</span>
          </div>
        )}
        {collapsed && (
          <Hospital size={24} className="mx-auto text-sidebar-foreground" />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <X size={18} className={cn("transition-transform", collapsed ? "rotate-45" : "rotate-0")} />
        </Button>
      </div>
      
      <div className="flex flex-1 flex-col justify-between overflow-y-auto py-4">
        <div className="space-y-2 px-2">
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "nav-link",
                  location.pathname === item.href && "nav-link-active",
                  collapsed && "justify-center"
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
          
          <div className="pt-2">
            <div className="pl-3 text-xs font-semibold uppercase text-sidebar-foreground/60">
              {!collapsed && managementLabel}
            </div>
            <nav className="mt-2 space-y-1">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "nav-link",
                    location.pathname === item.href && "nav-link-active",
                    collapsed && "justify-center"
                  )}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="space-y-2 px-2">
          <div className="flex flex-col gap-2 px-2">
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              onClick={toggleTheme}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {theme === 'light' ? '🌙' : '☀️'}
              {!collapsed && (
                <span className="ml-2">
                  {theme === 'light' ? darkModeText : lightModeText}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              onClick={() => changeLocale(locale === 'en' ? 'ar' : 'en')}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {locale === 'en' ? '🇦🇪' : '🇺🇸'}
              {!collapsed && (
                <span className="ml-2">
                  {locale === 'en' ? arabicText : englishText}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
