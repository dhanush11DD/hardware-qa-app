"use client";

import Link from 'next/link';
import { ArrowRight, BoxSelect, Cpu, Zap } from 'lucide-react';
import { BOARD_TYPES } from '../lib/mockData';
import './testing.css';

export default function TestingPage() {
    return (
        <div className="testing-container animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">QA Testing Dashboard</h1>
                    <p className="page-subtitle">Select a board type to begin testing</p>
                </div>
            </div>

            <div className="testing-grid">
                {BOARD_TYPES.map((board, index) => (
                    <div key={board.id} className="testing-card stagger-item hover-lift">
                        <div className="testing-card-header">
                            <div className="testing-icon">
                                <Cpu size={28} />
                            </div>
                            <span className="testing-badge">{board.category}</span>
                        </div>

                        <div className="testing-info">
                            <h3 className="testing-board-name">{board.name}</h3>
                            <p className="testing-checkpoints">
                                <Zap size={14} />
                                {board.checkpoints.length} verification points
                            </p>
                        </div>

                        <div className="testing-actions">
                            <Link
                                href={`/testing/${board.id}/bulk`}
                                className="test-btn test-btn-primary"
                            >
                                <BoxSelect size={18} />
                                Bulk Test
                            </Link>
                            <Link
                                href={`/testing/${board.id}/single`}
                                className="test-btn test-btn-secondary"
                            >
                                Single Test
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
