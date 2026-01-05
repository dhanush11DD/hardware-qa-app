"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BOARD_TYPES } from '../../../lib/mockData';
import { ArrowLeft, Save, Check, X } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function SingleTestingPage() {
    const params = useParams();
    const router = useRouter();
    const boardId = params.boardId as string;
    const board = BOARD_TYPES.find(b => b.id === boardId);

    const [serial, setSerial] = useState('');
    const [results, setResults] = useState<Record<string, boolean | null>>({});

    if (!board) return <div>Board not found</div>;

    const toggleResult = (checkpoint: string, value: boolean) => {
        setResults(prev => ({
            ...prev,
            [checkpoint]: prev[checkpoint] === value ? null : value
        }));
    };

    const isComplete = board.checkpoints.every(cp => results[cp] !== undefined && results[cp] !== null);

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/testing" className="btn btn-ghost hover:bg-slate-100 rounded-full p-2">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Single Test: {board.name}</h1>
                    <p className="text-muted-foreground text-sm">Enter detailed results for a single unit.</p>
                </div>
            </div>

            <div className="card p-6 flex flex-col gap-6">
                <div>
                    <label className="text-sm font-semibold uppercase text-muted-foreground mb-1 block">Serial Number</label>
                    <input
                        value={serial}
                        onChange={e => setSerial(e.target.value)}
                        placeholder="e.g. S1A0042"
                        className="input text-lg font-mono"
                        autoFocus
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold border-b pb-2">Checkpoints</h3>
                    {board.checkpoints.map(cp => {
                        const status = results[cp];
                        return (
                            <div key={cp} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                                <span className="font-medium">{cp}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleResult(cp, true)}
                                        className={clsx(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                            status === true
                                                ? "bg-green-600 text-white shadow-md scale-110"
                                                : "bg-slate-100 text-slate-400 hover:bg-green-100 hover:text-green-600"
                                        )}
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        onClick={() => toggleResult(cp, false)}
                                        className={clsx(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                            status === false
                                                ? "bg-red-600 text-white shadow-md scale-110"
                                                : "bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-600"
                                        )}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-4 border-t flex justify-end gap-3">
                    <button className="btn btn-ghost" onClick={() => router.back()}>Cancel</button>
                    <button
                        className="btn btn-primary gap-2 w-full sm:w-auto"
                        disabled={!serial || !isComplete}
                        onClick={() => {
                            alert("Test record saved!");
                            router.push('/testing');
                        }}
                    >
                        <Save size={18} />
                        Save Record
                    </button>
                </div>
            </div>
        </div>
    );
}
