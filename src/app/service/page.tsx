"use client";

import { Plus, Wrench, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { SERVICE_LOGS } from '../lib/mockData';
import Link from 'next/link';
import './service.css';

export default function ServicePage() {
    return (
        <div className="service-container animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Service & RMA</h1>
                    <p className="page-subtitle">Manage device returns, repairs, and replacements</p>
                </div>
                <Link href="/service/new" className="btn btn-primary">
                    <Plus size={18} />
                    Log New Service
                </Link>
            </div>

            {/* Service Cards */}
            <div className="service-list">
                {SERVICE_LOGS.map((log, index) => (
                    <div key={log.id} className="service-card stagger-item hover-lift">
                        <div className="service-header">
                            <div className="service-serial">
                                <span className="serial-badge">{log.serialNumber}</span>
                                <span className={`status-pill status-${log.status.toLowerCase().replace(' ', '-')}`}>
                                    {log.status === 'Open' && <AlertCircle size={14} />}
                                    {log.status === 'In Progress' && <Clock size={14} />}
                                    {log.status === 'Completed' && <CheckCircle2 size={14} />}
                                    {log.status === 'Returned' && <CheckCircle2 size={14} />}
                                    {log.status}
                                </span>
                            </div>
                            <button className="service-menu-btn">Update Status</button>
                        </div>

                        <div className="service-body">
                            <div className="service-complaint">
                                <Wrench size={18} className="complaint-icon" />
                                <h3 className="complaint-text">{log.complaint}</h3>
                            </div>

                            <div className="service-timeline">
                                <div className="timeline-item">
                                    <Clock size={14} />
                                    <span>Returned: {log.returnDate}</span>
                                </div>
                                {log.completionDate && (
                                    <div className="timeline-item completed">
                                        <CheckCircle2 size={14} />
                                        <span>Fixed: {log.completionDate}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="service-footer">
                            <div className="report-section">
                                <div className="report-item">
                                    <span className="report-label">Test Report</span>
                                    <span className={`report-value report-${log.testReport.toLowerCase()}`}>
                                        {log.testReport === 'Replace' && <XCircle size={14} />}
                                        {log.testReport === 'Serviceable' && <CheckCircle2 size={14} />}
                                        {log.testReport === 'Pending' && <Clock size={14} />}
                                        {log.testReport}
                                    </span>
                                </div>
                                {log.actionReport && (
                                    <div className="report-item">
                                        <span className="report-label">Action Taken</span>
                                        <span className="action-text">{log.actionReport}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
