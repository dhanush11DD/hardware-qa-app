"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BOARD_TYPES } from '../../lib/mockData';
import { ArrowLeft, Truck, Package, Save } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function NewDeliveryPage() {
    const router = useRouter();
    const [mode, setMode] = useState<'single' | 'bulk'>('single');
    const [boardId, setBoardId] = useState(BOARD_TYPES[0].id);
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Single Mode State
    const [serial, setSerial] = useState('');

    // Bulk Mode State
    const [startSerial, setStartSerial] = useState('');
    const [endSerial, setEndSerial] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to save would go here
        alert("Delivery recorded successfully!");
        router.push('/delivery');
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/delivery" className="btn btn-ghost hover:bg-slate-100 rounded-full p-2">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Record New Delivery</h1>
                    <p className="text-muted-foreground text-sm">Log single or bulk hardware shipments.</p>
                </div>
            </div>

            <div className="card">
                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setMode('single')}
                        className={clsx("flex-1 p-4 font-medium text-sm flex justify-center gap-2 transition-colors", mode === 'single' ? "text-[var(--primary)] border-b-2 border-[var(--primary)]" : "text-muted-foreground hover:bg-slate-50")}
                    >
                        <Package size={18} />
                        Single Item
                    </button>
                    <button
                        onClick={() => setMode('bulk')}
                        className={clsx("flex-1 p-4 font-medium text-sm flex justify-center gap-2 transition-colors", mode === 'bulk' ? "text-[var(--primary)] border-b-2 border-[var(--primary)]" : "text-muted-foreground hover:bg-slate-50")}
                    >
                        <Truck size={18} />
                        Bulk Delivery
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 ">
                            <label className="text-sm font-medium">Board Type</label>
                            <select className="input" value={boardId} onChange={e => setBoardId(e.target.value)}>
                                {BOARD_TYPES.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Date</label>
                            <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Customer / Client Name</label>
                        <input required placeholder="e.g. Acme Industries" className="input" value={customer} onChange={e => setCustomer(e.target.value)} />
                    </div>

                    <div className="h-px bg-slate-100 my-2"></div>

                    {mode === 'single' ? (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Serial Number</label>
                            <input required placeholder="e.g. S1A0042" className="input font-mono" value={serial} onChange={e => setSerial(e.target.value)} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">Start Serial</label>
                                <input required placeholder="e.g. S1A0001" className="input font-mono" value={startSerial} onChange={e => setStartSerial(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">End Serial</label>
                                <input required placeholder="e.g. S1A0050" className="input font-mono" value={endSerial} onChange={e => setEndSerial(e.target.value)} />
                            </div>
                        </div>
                    )}

                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="btn btn-primary gap-2 w-full sm:w-auto">
                            <Save size={18} />
                            Record Delivery
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
