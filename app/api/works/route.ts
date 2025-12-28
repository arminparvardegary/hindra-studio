import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export interface Work {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    year: string;
    client: string;
    website: string;
    description: string;
    image: string;
    tags: string[];
    services: string[];
    challenge: string;
    solution: string;
    stats: Record<string, string>;
    process: { title: string; description: string }[];
    gallery: string[];
    results: { metric: string; label: string }[];
    palette: string[];
    testimonial_quote: string;
    testimonial_author: string;
    testimonial_role: string;
    full_description: string;
    featured: boolean;
    sort_order: number;
    category: string;
    color: string;
    created_at: string;
    updated_at: string;
}

// GET /api/works - List all works
export async function GET() {
    try {
        const client = getSupabaseClient();
        if (!client) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const url = `${client.url}/rest/v1/works?order=sort_order.asc,created_at.desc`;
        const response = await fetch(url, {
            headers: {
                'apikey': client.key,
                'Authorization': `Bearer ${client.key}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch works');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching works:', error);
        return NextResponse.json({ error: 'Failed to fetch works' }, { status: 500 });
    }
}

// POST /api/works - Create new work
export async function POST(request: NextRequest) {
    try {
        const client = getSupabaseClient();
        if (!client) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const body = await request.json();

        // Generate ID from slug
        const id = body.slug || Date.now().toString();

        const workData = {
            id,
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

        const url = `${client.url}/rest/v1/works`;
        const response = await fetch(url, {
            method: 'POST',
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
            throw new Error('Failed to create work');
        }

        const data = await response.json();
        return NextResponse.json(data[0] || data, { status: 201 });
    } catch (error) {
        console.error('Error creating work:', error);
        return NextResponse.json({ error: 'Failed to create work' }, { status: 500 });
    }
}
