"use client";

import { Plus, Search, Filter, MoreVertical, Package, TrendingUp } from 'lucide-react';
import { BOARD_TYPES } from '../lib/mockData';
import Link from 'next/link';
import './inventory.css';

export default function InventoryPage() {
    return (
        <div className="inventory-container animate-fade-in">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Board Inventory</h1>
                    <p className="page-subtitle">Manage hardware board definitions and production stats</p>
                </div>
                <Link href="/inventory/new" className="btn btn-primary">
                    <Plus size={18} />
                    Add Board Type
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="search-bar card">
                <div className="search-input-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search boards..."
                        className="search-input"
                    />
                </div>
                <div className="divider"></div>
                <button className="btn btn-ghost">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            {/* Board Grid */}
            <div className="board-grid">
                {BOARD_TYPES.map((board, index) => (
                    <div key={board.id} className="board-card stagger-item hover-lift">
                        <div className="board-card-header">
                            <div className="board-icon">
                                <Package size={24} />
                            </div>
                            <button className="board-menu-btn">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="board-info">
                            <h3 className="board-name" title={board.name}>{board.name}</h3>
                            <span className="board-category">{board.category}</span>
                        </div>

                        <div className="board-stats">
                            <div className="stat-item">
                                <span className="stat-label">Produced</span>
                                <span className="stat-value">{board.totalProduced.toLocaleString()}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-label">In Stock</span>
                                <span className="stat-value stock-value">{board.inStock.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="board-footer">
                            <span className="board-id">ID: {board.id}</span>
                            <button className="view-batch-btn">
                                View Batch
                                <TrendingUp size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
