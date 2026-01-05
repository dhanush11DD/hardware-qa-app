"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Server, ClipboardCheck, Truck, Wrench, LogOut } from 'lucide-react';
import './sidenav.css';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: Server },
    { name: 'Testing', href: '/testing', icon: ClipboardCheck },
    { name: 'Delivery', href: '/delivery', icon: Truck },
    { name: 'Service', href: '/service', icon: Wrench },
];

export default function SideNav() {
    const pathname = usePathname();

    return (
        <aside className="sidenav">
            {/* Header */}
            <div className="sidenav-header">
                <div className="sidenav-logo">
                    <div className="logo-icon">Q/A</div>
                    <span className="logo-text">Hardware QA</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidenav-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={20} className="nav-icon" />
                            <span className="nav-label">{item.name}</span>
                            {isActive && <div className="active-indicator"></div>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="sidenav-footer">
                <div className="user-profile">
                    <div className="user-avatar">JD</div>
                    <div className="user-info">
                        <span className="user-name">John Doe</span>
                        <span className="user-role">Admin</span>
                    </div>
                </div>
                <button className="logout-btn" title="Logout">
                    <LogOut size={18} />
                </button>
            </div>
        </aside>
    );
}
