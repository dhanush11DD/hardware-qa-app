"use client";

import { TrendingUp, CheckCircle2, Clock, Package } from 'lucide-react';
import './dashboard.css';

export default function Home() {
  const stats = [
    {
      label: 'Boards in Inventory',
      value: '1,240',
      change: '+12% from last month',
      icon: Package,
      color: 'blue'
    },
    {
      label: 'Tests Completed Today',
      value: '85',
      change: '98% Pass Rate',
      icon: CheckCircle2,
      color: 'green'
    },
    {
      label: 'Pending Delivery',
      value: '14',
      change: 'Scheduled for tomorrow',
      icon: Clock,
      color: 'amber'
    },
    {
      label: 'Active Service Tickets',
      value: '3',
      change: '2 in progress',
      icon: TrendingUp,
      color: 'purple'
    },
  ];

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your hardware testing pipeline</p>
        </div>
        <button className="btn btn-primary">
          + New Bulk Test
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`stat-card stagger-item stat-${stat.color}`}>
              <div className="stat-icon-wrapper">
                <Icon size={24} className="stat-icon" />
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-change">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="activity-section card animate-slide-up">
        <div className="activity-header">
          <h3 className="activity-title">Recent Activity</h3>
          <button className="btn btn-ghost">View All</button>
        </div>
        <div className="activity-content">
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <p className="empty-text">No recent activity to display</p>
            <p className="empty-subtext">Activity will appear here as you use the system</p>
          </div>
        </div>
      </div>
    </div>
  );
}
