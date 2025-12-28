import { NextRequest, NextResponse } from 'next/server';

// Supabase Storage configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET_NAME = 'works-media';

// Allowed file types
const ALLOWED_TYPES = [
    'image/webp',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'video/mp4',
    'video/quicktime', // .mov
    'video/webm',
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
    try {
        if (!SUPABASE_URL || !SUPABASE_KEY) {
            return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'uploads';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({
                error: `Invalid file type. Allowed: webp, png, jpg, gif, mp4, mov, webm`
            }, { status: 400 });
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({
                error: `File too large. Maximum size: 50MB`
            }, { status: 400 });
        }

        // Generate unique filename
        const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const filename = `${folder}/${timestamp}-${randomStr}.${ext}`;

        // Convert file to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Upload to Supabase Storage
        const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${filename}`;

        const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': file.type,
                'x-upsert': 'true',
            },
            body: arrayBuffer,
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error('Upload error:', errorText);

            // Check if bucket doesn't exist
            if (uploadResponse.status === 404 || errorText.includes('Bucket not found')) {
                return NextResponse.json({
                    error: 'Storage bucket not found. Please create "works-media" bucket in Supabase.'
                }, { status: 500 });
            }

            return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
        }

        // Get public URL
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filename}`;

        return NextResponse.json({
            url: publicUrl,
            filename,
            type: file.type,
            size: file.size,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

// DELETE endpoint to remove files
export async function DELETE(request: NextRequest) {
    try {
        if (!SUPABASE_URL || !SUPABASE_KEY) {
            return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
        }

        const { filename } = await request.json();

        if (!filename) {
            return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
        }

        const deleteUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${filename}`;

        const deleteResponse = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
        });

        if (!deleteResponse.ok) {
            return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
