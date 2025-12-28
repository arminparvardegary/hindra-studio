'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X, AlertCircle } from 'lucide-react';
import FileUpload from '@/components/admin/FileUpload';

interface ProcessStep {
    title: string;
    description: string;
}

interface Result {
    metric: string;
    label: string;
}

export default function NewWorkPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Basic info
    const [slug, setSlug] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Web Platform');
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [client, setClient] = useState('');
    const [website, setWebsite] = useState('');
    const [featured, setFeatured] = useState(false);
    const [color, setColor] = useState('#000000');

    // Hero image
    const [image, setImage] = useState('');

    // Tags & Services
    const [tags, setTags] = useState<string[]>(['']);
    const [services, setServices] = useState<string[]>(['']);

    // Stats (3 key-value pairs)
    const [stats, setStats] = useState<{ key: string; value: string }[]>([
        { key: '', value: '' },
        { key: '', value: '' },
        { key: '', value: '' },
    ]);

    // Full description
    const [fullDescription, setFullDescription] = useState('');

    // Challenge & Solution
    const [challenge, setChallenge] = useState('');
    const [solution, setSolution] = useState('');

    // Process (4 steps)
    const [process, setProcess] = useState<ProcessStep[]>([
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
    ]);

    // Color Palette (4 colors)
    const [palette, setPalette] = useState<string[]>(['#000000', '#ffffff', '#DCDFFF', '#E9DCC8']);

    // Gallery (3 images)
    const [gallery, setGallery] = useState<string[]>(['', '', '']);

    // Results (4 items)
    const [results, setResults] = useState<Result[]>([
        { metric: '', label: '' },
        { metric: '', label: '' },
        { metric: '', label: '' },
        { metric: '', label: '' },
    ]);

    // Testimonial
    const [testimonialQuote, setTestimonialQuote] = useState('');
    const [testimonialAuthor, setTestimonialAuthor] = useState('');
    const [testimonialRole, setTestimonialRole] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate required fields
        if (!slug || !title || !subtitle || !description || !image || !fullDescription || !challenge || !solution) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        // Build stats object
        const statsObj: Record<string, string> = {};
        stats.forEach(s => {
            if (s.key && s.value) {
                statsObj[s.key] = s.value;
            }
        });

        const workData = {
            slug,
            title,
            subtitle,
            description,
            category,
            year,
            client,
            website,
            featured,
            color,
            image,
            tags: tags.filter(t => t.trim() !== ''),
            services: services.filter(s => s.trim() !== ''),
            stats: statsObj,
            full_description: fullDescription,
            challenge,
            solution,
            process: process.filter(p => p.title && p.description),
            palette: palette.filter(c => c),
            gallery: gallery.filter(g => g.trim() !== ''),
            results: results.filter(r => r.metric && r.label),
            testimonial_quote: testimonialQuote,
            testimonial_author: testimonialAuthor,
            testimonial_role: testimonialRole,
        };

        try {
            const response = await fetch('/api/works', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workData),
            });

            if (!response.ok) {
                throw new Error('Failed to create work');
            }

            router.push('/admin/works');
        } catch (err) {
            setError('Failed to create work. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addTag = () => setTags([...tags, '']);
    const removeTag = (index: number) => setTags(tags.filter((_, i) => i !== index));
    const updateTag = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const addService = () => setServices([...services, '']);
    const removeService = (index: number) => setServices(services.filter((_, i) => i !== index));
    const updateService = (index: number, value: string) => {
        const newServices = [...services];
        newServices[index] = value;
        setServices(newServices);
    };

    const updateStat = (index: number, field: 'key' | 'value', value: string) => {
        const newStats = [...stats];
        newStats[index][field] = value;
        setStats(newStats);
    };

    const updateProcess = (index: number, field: 'title' | 'description', value: string) => {
        const newProcess = [...process];
        newProcess[index][field] = value;
        setProcess(newProcess);
    };

    const updateResult = (index: number, field: 'metric' | 'label', value: string) => {
        const newResults = [...results];
        newResults[index][field] = value;
        setResults(newResults);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/works"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">New Work</h1>
                    <p className="text-gray-500">Add a new portfolio project</p>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-6">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                placeholder="my-project"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Project Name"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subtitle <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder="AI-POWERED PLATFORM"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="A brief description of the project"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                            >
                                <option value="SaaS">SaaS</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Web Platform">Web Platform</option>
                                <option value="Video">Video</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="2024"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                            <input
                                type="text"
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                                placeholder="Client Name"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                            <input
                                type="url"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Color</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-12 h-10 border border-gray-200 rounded-lg cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                Featured Project
                            </label>
                        </div>
                    </div>
                </section>

                {/* Hero Image */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Hero Image / Video</h2>
                    <FileUpload
                        value={image}
                        onChange={setImage}
                        folder="works/hero"
                        label="Upload hero image or video"
                        placeholder="Click to upload or drag and drop (PNG, WebP, MP4, MOV)"
                    />
                </section>

                {/* Tags */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Tags</h2>
                        <button
                            type="button"
                            onClick={addTag}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                            <Plus className="w-4 h-4" /> Add Tag
                        </button>
                    </div>
                    <div className="space-y-2">
                        {tags.map((tag, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => updateTag(index, e.target.value)}
                                    placeholder="Tag name"
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                />
                                {tags.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Services</h2>
                        <button
                            type="button"
                            onClick={addService}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                            <Plus className="w-4 h-4" /> Add Service
                        </button>
                    </div>
                    <div className="space-y-2">
                        {services.map((service, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={service}
                                    onChange={(e) => updateService(index, e.target.value)}
                                    placeholder="Service name"
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                />
                                {services.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeService(index)}
                                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Stats (3 items)</h2>
                    <div className="space-y-3">
                        {stats.map((stat, index) => (
                            <div key={index} className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={stat.key}
                                    onChange={(e) => updateStat(index, 'key', e.target.value)}
                                    placeholder="Key (e.g., users)"
                                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                />
                                <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                                    placeholder="Value (e.g., 10K+)"
                                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Full Description */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Full Description</h2>
                    <textarea
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                        placeholder="Detailed project description..."
                        rows={8}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none resize-none"
                        required
                    />
                </section>

                {/* Challenge & Solution */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Challenge & Solution</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                The Challenge <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={challenge}
                                onChange={(e) => setChallenge(e.target.value)}
                                placeholder="Describe the challenge..."
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none resize-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Our Solution <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                                placeholder="Describe the solution..."
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none resize-none"
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Process (4 steps)</h2>
                    <div className="space-y-4">
                        {process.map((step, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-gray-500">Step {index + 1}</span>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={step.title}
                                        onChange={(e) => updateProcess(index, 'title', e.target.value)}
                                        placeholder="Step title"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none bg-white"
                                    />
                                    <textarea
                                        value={step.description}
                                        onChange={(e) => updateProcess(index, 'description', e.target.value)}
                                        placeholder="Step description"
                                        rows={2}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none resize-none bg-white"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Color Palette */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Color Palette (4 colors)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {palette.map((color, index) => (
                            <div key={index}>
                                <div
                                    className="w-full h-20 rounded-lg mb-2 border border-gray-200"
                                    style={{ backgroundColor: color }}
                                />
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => {
                                        const newPalette = [...palette];
                                        newPalette[index] = e.target.value;
                                        setPalette(newPalette);
                                    }}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none text-center"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gallery */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Gallery (3 images/videos)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {gallery.map((img, index) => (
                            <FileUpload
                                key={index}
                                value={img}
                                onChange={(url) => {
                                    const newGallery = [...gallery];
                                    newGallery[index] = url;
                                    setGallery(newGallery);
                                }}
                                folder="works/gallery"
                                label={`Media ${index + 1}`}
                                placeholder="Upload"
                            />
                        ))}
                    </div>
                </section>

                {/* Results */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Results (4 items)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((result, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="text"
                                    value={result.metric}
                                    onChange={(e) => updateResult(index, 'metric', e.target.value)}
                                    placeholder="Metric (e.g., 10x)"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none bg-white mb-2"
                                />
                                <input
                                    type="text"
                                    value={result.label}
                                    onChange={(e) => updateResult(index, 'label', e.target.value)}
                                    placeholder="Label (e.g., Faster)"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none bg-white"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonial */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Testimonial</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                            <textarea
                                value={testimonialQuote}
                                onChange={(e) => setTestimonialQuote(e.target.value)}
                                placeholder="Client testimonial quote..."
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none resize-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input
                                    type="text"
                                    value={testimonialAuthor}
                                    onChange={(e) => setTestimonialAuthor(e.target.value)}
                                    placeholder="Author name"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <input
                                    type="text"
                                    value={testimonialRole}
                                    onChange={(e) => setTestimonialRole(e.target.value)}
                                    placeholder="Author role"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Submit */}
                <div className="flex items-center justify-end gap-4 pb-8">
                    <Link
                        href="/admin/works"
                        className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        Create Work
                    </button>
                </div>
            </form>
        </div>
    );
}
