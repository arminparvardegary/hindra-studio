'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, PlusCircle, Pencil, Trash2, Star, ExternalLink, AlertCircle } from 'lucide-react';

interface Work {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    featured: boolean;
    website: string;
    image: string;
    created_at: string;
}

export default function AdminWorksPage() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchWorks = async () => {
        try {
            const response = await fetch('/api/works');
            if (!response.ok) throw new Error('Failed to fetch works');
            const data = await response.json();
            setWorks(data);
        } catch (err) {
            setError('Failed to load works');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorks();
    }, []);

    const handleDelete = async (slug: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            return;
        }

        setDeleting(slug);
        try {
            const response = await fetch(`/api/works/${slug}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete');
            setWorks(works.filter(w => w.slug !== slug));
        } catch (err) {
            alert('Failed to delete work');
            console.error(err);
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <svg className="w-8 h-8 animate-spin text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Works</h1>
                    <p className="text-gray-500">Manage your portfolio projects</p>
                </div>
                <Link
                    href="/admin/works/new"
                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                    <PlusCircle className="w-5 h-5" />
                    New Work
                </Link>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Works List */}
            {works.length > 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {works.map((work) => (
                            <div
                                key={work.id}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Thumbnail */}
                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                        {work.image ? (
                                            <img
                                                src={work.image}
                                                alt={work.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Briefcase className="w-5 h-5 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">{work.title}</h3>
                                            {work.featured && (
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>{work.category}</span>
                                            <span>•</span>
                                            <span>{work.year}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={work.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Visit website"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                    <Link
                                        href={`/admin/works/${work.slug}`}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(work.slug, work.title)}
                                        disabled={deleting === work.slug}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Delete"
                                    >
                                        {deleting === work.slug ? (
                                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        ) : (
                                            <Trash2 className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No works yet</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first portfolio project.</p>
                    <Link
                        href="/admin/works/new"
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Create Your First Work
                    </Link>
                </div>
            )}
        </div>
    );
}
