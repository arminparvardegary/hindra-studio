'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Film, Loader2 } from 'lucide-react';

interface FileUploadProps {
    value: string;
    onChange: (url: string) => void;
    folder?: string;
    accept?: string;
    label?: string;
    placeholder?: string;
    showPreview?: boolean;
}

export default function FileUpload({
    value,
    onChange,
    folder = 'uploads',
    accept = 'image/webp,image/png,image/jpeg,image/gif,video/mp4,video/quicktime,video/webm',
    label,
    placeholder = 'Click to upload or drag and drop',
    showPreview = true,
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isVideo = (url: string) => {
        return url.match(/\.(mp4|mov|webm)$/i) || url.includes('video');
    };

    const handleFile = async (file: File) => {
        setError('');
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            onChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleRemove = () => {
        onChange('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            {/* Upload Area */}
            {!value ? (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${dragOver
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                            <p className="text-sm text-gray-500">Uploading...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm text-gray-500">{placeholder}</p>
                            <p className="text-xs text-gray-400">PNG, WebP, JPG, GIF, MP4, MOV (max 50MB)</p>
                        </div>
                    )}
                </div>
            ) : (
                /* Preview */
                showPreview && (
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 group">
                        {isVideo(value) ? (
                            <video
                                src={value}
                                controls
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <img
                                src={value}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                            />
                        )}

                        {/* Overlay controls */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                                title="Replace"
                            >
                                <Upload className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                                title="Remove"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* File type indicator */}
                        <div className="absolute top-2 left-2">
                            {isVideo(value) ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                                    <Film className="w-3 h-3" /> Video
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                                    <ImageIcon className="w-3 h-3" /> Image
                                </span>
                            )}
                        </div>

                        <input
                            ref={inputRef}
                            type="file"
                            accept={accept}
                            onChange={handleInputChange}
                            className="hidden"
                        />
                    </div>
                )
            )}

            {/* URL fallback input */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Or paste URL directly"
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
