"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CircuitBoard } from 'lucide-react';
import Link from 'next/link';

export default function NewBoardPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('Vending');
    const [checkpoints, setCheckpoints] = useState<string[]>(['Control Program', 'Display']);
    const [newCheckpoint, setNewCheckpoint] = useState('');

    const handleAddCheckpoint = () => {
        if (newCheckpoint.trim()) {
            setCheckpoints([...checkpoints, newCheckpoint.trim()]);
            setNewCheckpoint('');
        }
    };

    const handleRemoveCheckpoint = (index: number) => {
        setCheckpoints(checkpoints.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("New Board Type Created!");
        router.push('/inventory');
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/inventory" className="btn btn-ghost hover:bg-slate-100 rounded-full p-2">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Add Board Type</h1>
                    <p className="text-muted-foreground text-sm">Define a new hardware board configuration.</p>
                </div>
            </div>

            <div className="card p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Board Name / Model</label>
                        <input
                            required
                            placeholder="e.g. Napvend 200 mk1.0"
                            className="input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            className="input"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="Vending">Vending</option>
                            <option value="Controller">Controller</option>
                            <option value="Power Supply">Power Supply</option>
                            <option value="IOT">IOT / Communication</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="h-px bg-slate-100 my-2"></div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Test Checkpoints</label>
                            <span className="text-xs text-muted-foreground">{checkpoints.length} defined</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                placeholder="Add new checkpoint e.g. 'Relay Test'"
                                className="input"
                                value={newCheckpoint}
                                onChange={e => setNewCheckpoint(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCheckpoint())}
                            />
                            <button type="button" onClick={handleAddCheckpoint} className="btn btn-outline">Add</button>
                        </div>

                        <div className="flex flex-wrap gap-2 min-h-[50px] bg-slate-50 p-3 rounded border border-dashed">
                            {checkpoints.length === 0 && <span className="text-sm text-slate-400 italic">No checkpoints added yet.</span>}
                            {checkpoints.map((cp, idx) => (
                                <div key={idx} className="badge bg-white border pr-1 shadow-sm">
                                    {cp}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCheckpoint(idx)}
                                        className="ml-2 hover:bg-slate-200 rounded-full p-0.5"
                                    >
                                        <ArrowLeft size={10} className="rotate-45" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="btn btn-primary gap-2 w-full sm:w-auto">
                            <Save size={18} />
                            Create Board Definition
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
