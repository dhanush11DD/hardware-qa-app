"use client";

import { useState } from 'react';
import { Plus, Truck, Clock, RotateCcw, CheckCircle2, Filter as FilterIcon } from 'lucide-react';
import { DELIVERY_LOGS } from '../lib/mockData';
import Link from 'next/link';
import './delivery.css';

export default function DeliveryPage() {
    const [filter, setFilter] = useState<'All' | 'Delivered' | 'Pending' | 'Returned'>('All');

    const filteredLogs = DELIVERY_LOGS.filter(log => filter === 'All' || log.status === filter);

    const stats = [
        { label: 'All Records', count: DELIVERY_LOGS.length, icon: FilterIcon, color: 'neutral', filter: 'All' },
        { label: 'Delivered', count: DELIVERY_LOGS.filter(l => l.status === 'Delivered').length, icon: Truck, color: 'green', filter: 'Delivered' },
        { label: 'Pending', count: DELIVERY_LOGS.filter(l => l.status === 'Pending').length, icon: Clock, color: 'amber', filter: 'Pending' },
        { label: 'Returned', count: DELIVERY_LOGS.filter(l => l.status === 'Returned').length, icon: RotateCcw, color: 'red', filter: 'Returned' },
    ];

    return (
        <div className="delivery-container animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Delivery Logistics</h1>
                    <p className="page-subtitle">Track hardware deliveries and customer assignments</p>
                </div>
                <Link href="/delivery/new" className="btn btn-primary">
                    <Plus size={18} />
                    New Delivery
                </Link>
            </div>

            {/* Filter Stats */}
            <div className="filter-stats">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const isActive = filter === stat.filter;
                    return (
                        <button
                            key={stat.label}
                            onClick={() => setFilter(stat.filter as any)}
                            className={`filter-stat-card stagger-item ${isActive ? 'active' : ''} filter-${stat.color}`}
                        >
                            <div className="filter-icon">
                                <Icon size={20} />
                            </div>
                            <div className="filter-content">
                                <div className="filter-count">{stat.count}</div>
                                <div className="filter-label">{stat.label}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Delivery Table */}
            <div className="delivery-table-container card animate-slide-up">
                <table className="delivery-table">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Board Type</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((log, index) => (
                            <tr key={log.id} className="table-row" style={{ animationDelay: `${index * 0.05}s` }}>
                                <td className="serial-cell">{log.serialNumber}</td>
                                <td>{log.boardName}</td>
                                <td className="customer-cell">{log.customerName}</td>
                                <td className="date-cell">{log.deliveryDate}</td>
                                <td>
                                    <span className={`status-badge status-${log.status.toLowerCase()}`}>
                                        {log.status === 'Delivered' && <CheckCircle2 size={14} />}
                                        {log.status === 'Pending' && <Clock size={14} />}
                                        {log.status === 'Returned' && <RotateCcw size={14} />}
                                        {log.status}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <button className="details-btn">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredLogs.length === 0 && (
                    <div className="empty-table">
                        <div className="empty-icon">📦</div>
                        <p className="empty-text">No delivery records found</p>
                        <p className="empty-subtext">Try adjusting your filter</p>
                    </div>
                )}
            </div>
        </div>
    );
}
