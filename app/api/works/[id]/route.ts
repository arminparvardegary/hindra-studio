import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

// GET /api/works/[id] - Get single work by slug
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const client = getSupabaseClient();
        if (!client) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const slug = params.id;
        const url = `${client.url}/rest/v1/works?slug=eq.${encodeURIComponent(slug)}`;

        const response = await fetch(url, {
            headers: {
                'apikey': client.key,
                'Authorization': `Bearer ${client.key}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch work');
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Work not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error fetching work:', error);
        return NextResponse.json({ error: 'Failed to fetch work' }, { status: 500 });
    }
}

// PUT /api/works/[id] - Update work
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const client = getSupabaseClient();
        if (!client) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const slug = params.id;
        const body = await request.json();

        const workData = {
            slug: body.slug,
            title: body.title,
            subtitle: body.subtitle,
            year: body.year,
            client: body.client,
            website: body.website,
            description: body.description,
            image: body.image,
            tags: body.tags || [],
            services: body.services || [],
            challenge: body.challenge,
            solution: body.solution,
            stats: body.stats || {},
            process: body.process || [],
            gallery: body.gallery || [],
            results: body.results || [],
            palette: body.palette || [],
            testimonial_quote: body.testimonial_quote || '',
            testimonial_author: body.testimonial_author || '',
            testimonial_role: body.testimonial_role || '',
            full_description: body.full_description,
            featured: body.featured || false,
            sort_order: body.sort_order || 0,
            category: body.category || 'Web Platform',
            color: body.color || '#000000',
        };

        const url = `${client.url}/rest/v1/works?slug=eq.${encodeURIComponent(slug)}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'apikey': client.key,
                'Authorization': `Bearer ${client.key}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
            },
            body: JSON.stringify(workData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Supabase error:', errorText);
            throw new Error('Failed to update work');
        }

        const data = await response.json();
        return NextResponse.json(data[0] || data);
    } catch (error) {
        console.error('Error updating work:', error);
        return NextResponse.json({ error: 'Failed to update work' }, { status: 500 });
    }
}

// DELETE /api/works/[id] - Delete work
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const client = getSupabaseClient();
        if (!client) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const slug = params.id;
        const url = `${client.url}/rest/v1/works?slug=eq.${encodeURIComponent(slug)}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'apikey': client.key,
                'Authorization': `Bearer ${client.key}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete work');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting work:', error);
        return NextResponse.json({ error: 'Failed to delete work' }, { status: 500 });
    }
}
