"use client";

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BOARD_TYPES } from '../../../lib/mockData';
import { ArrowLeft, Save, CheckCircle2, XCircle, Play } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function BulkTestingPage() {
    const params = useParams();
    const boardId = params.boardId as string;
    const router = useRouter();

    const board = BOARD_TYPES.find(b => b.id === boardId);

    const [startSerial, setStartSerial] = useState('S1A0001');
    const [endSerial, setEndSerial] = useState('S1A0010');
    const [generatedRows, setGeneratedRows] = useState<any[]>([]);

    // Simple serial number generator logic
    const handleGenerate = () => {
        // Basic parser for "PREFIX + NUMBER" format
        // Assumes the last 4 characters are numbers for simplicity as per requirement
        const prefix = startSerial.slice(0, -4);
        const startNum = parseInt(startSerial.slice(-4));
        const endNum = parseInt(endSerial.slice(-4));

        if (isNaN(startNum) || isNaN(endNum)) {
            alert("Invalid serial number format. Please use format like 'S1A0001'");
            return;
        }

        const rows = [];
        for (let i = startNum; i <= endNum; i++) {
            const serial = `${prefix}${i.toString().padStart(4, '0')}`;
            // Create initial state for each checkpoint (null = untested, true = pass, false = fail)
            const checkState: Record<string, boolean | null> = {};
            board?.checkpoints.forEach(cp => checkState[cp] = null);

            rows.push({
                serial,
                checkpoints: checkState
            });
        }
        setGeneratedRows(rows);
    };

    const toggleCheck = (rowIndex: number, checkpoint: string) => {
        const newRows = [...generatedRows];
        const current = newRows[rowIndex].checkpoints[checkpoint];
        // Cycle: null -> true (pass) -> false (fail) -> null
        if (current === null) newRows[rowIndex].checkpoints[checkpoint] = true;
        else if (current === true) newRows[rowIndex].checkpoints[checkpoint] = false;
        else newRows[rowIndex].checkpoints[checkpoint] = null;

        setGeneratedRows(newRows);
    };

    const setColumnStatus = (checkpoint: string, status: boolean) => {
        const newRows = generatedRows.map(row => ({
            ...row,
            checkpoints: { ...row.checkpoints, [checkpoint]: status }
        }));
        setGeneratedRows(newRows);
    };

    if (!board) return <div>Board not found</div>;

    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-100px)]">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/testing" className="btn btn-ghost hover:bg-slate-100 rounded-full p-2">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Bulk Testing: {board.name}</h1>
                        <p className="text-muted-foreground text-sm">Generate serials and log test results.</p>
                    </div>
                </div>
                <button
                    className="btn btn-primary gap-2"
                    onClick={() => {
                        alert("Saved successfully!");
                        router.push('/testing');
                    }}
                    disabled={generatedRows.length === 0}
                >
                    <Save size={18} />
                    Save Results
                </button>
            </div>

            {/* Configuration Bar */}
            <div className="card p-4 flex gap-4 items-end bg-slate-50">
                <div className="flex-1 max-w-xs">
                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Start Serial</label>
                    <input
                        value={startSerial}
                        onChange={e => setStartSerial(e.target.value)}
                        className="input bg-white font-mono"
                    />
                </div>
                <div className="flex-1 max-w-xs">
                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">End Serial</label>
                    <input
                        value={endSerial}
                        onChange={e => setEndSerial(e.target.value)}
                        className="input bg-white font-mono"
                    />
                </div>
                <button className="btn btn-primary gap-2" onClick={handleGenerate}>
                    <Play size={16} />
                    Generate Grid
                </button>
            </div>

            {/* Excel-like Grid */}
            {generatedRows.length > 0 && (
                <div className="flex-1 card overflow-auto border shadow-inner">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-100 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 border-b border-r font-semibold text-slate-700 min-w-[150px] bg-slate-100 sticky left-0 z-20">Serial No.</th>
                                {board.checkpoints.map(cp => (
                                    <th key={cp} className="p-3 border-b border-r font-medium text-slate-600 min-w-[120px] text-center group">
                                        <div className="flex flex-col gap-1">
                                            <span>{cp}</span>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-1 scale-75">
                                                <button onClick={() => setColumnStatus(cp, true)} className="text-green-600 hover:bg-green-100 p-1 rounded">All Pass</button>
                                                <button onClick={() => setColumnStatus(cp, false)} className="text-red-600 hover:bg-red-100 p-1 rounded">All Fail</button>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {generatedRows.map((row, idx) => (
                                <tr key={row.serial} className="hover:bg-slate-50 group">
                                    <td className="p-3 border-b border-r font-mono font-medium text-slate-700 bg-white sticky left-0 z-10 group-hover:bg-slate-50">
                                        {row.serial}
                                    </td>
                                    {board.checkpoints.map(cp => {
                                        const status = row.checkpoints[cp];
                                        return (
                                            <td
                                                key={cp}
                                                className={clsx(
                                                    "p-2 border-b border-r text-center cursor-pointer transition-colors select-none",
                                                    status === true ? "bg-green-50 hover:bg-green-100" :
                                                        status === false ? "bg-red-50 hover:bg-red-100" :
                                                            "hover:bg-slate-100"
                                                )}
                                                onClick={() => toggleCheck(idx, cp)}
                                            >
                                                {status === true && <div className="text-green-600 font-bold flex justify-center"><CheckCircle2 size={18} /></div>}
                                                {status === false && <div className="text-red-600 font-bold flex justify-center"><XCircle size={18} /></div>}
                                                {status === null && <span className="text-slate-300">-</span>}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
