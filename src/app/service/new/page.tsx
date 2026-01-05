"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, FileText, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function NewServicePage() {
    const router = useRouter();

    const [serial, setSerial] = useState('');
    const [complaint, setComplaint] = useState('');
    const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
    const [testReport, setTestReport] = useState('Pending');
    const [actionReport, setActionReport] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Service record created!");
        router.push('/service');
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/service" className="btn btn-ghost hover:bg-slate-100 rounded-full p-2">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Log Service Request</h1>
                    <p className="text-muted-foreground text-sm">Create a new service/RMA ticket for a returned device.</p>
                </div>
            </div>

            <div className="card p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Serial Number</label>
                            <input
                                required
                                placeholder="e.g. S1A0042"
                                className="input font-mono"
                                value={serial}
                                onChange={e => setSerial(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Return Date</label>
                            <input
                                type="date"
                                className="input"
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Complaint / Issue Description</label>
                        <textarea
                            required
                            rows={3}
                            placeholder="Describe the issue reported by customer..."
                            className="input h-auto py-2"
                            value={complaint}
                            onChange={e => setComplaint(e.target.value)}
                        />
                    </div>

                    <div className="h-px bg-slate-100 my-2"></div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Test Report Status</label>
                            <select
                                className="input"
                                value={testReport}
                                onChange={e => setTestReport(e.target.value)}
                            >
                                <option value="Pending">Pending Analysis</option>
                                <option value="Serviceable">Serviceable</option>
                                <option value="Replace">Replace Device</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Action Report / Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Details about repairs or replacement actions..."
                            className="input h-auto py-2"
                            value={actionReport}
                            onChange={e => setActionReport(e.target.value)}
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="btn btn-primary gap-2 w-full sm:w-auto">
                            <Save size={18} />
                            Create Ticket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
