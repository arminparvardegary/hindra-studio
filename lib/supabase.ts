// Admin credentials
const ADMIN_CREDENTIALS = {
  email: 'hello@hindra.studio',
  password: 'g$OVL5r^6^WO^cLx',
};

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}

export function isAdminEmail(email: string): boolean {
  return email === ADMIN_CREDENTIALS.email;
}

// Supabase client (lazy initialization to avoid build errors)
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    return null;
  }

  // Dynamic import to avoid ESM issues
  return {
    url,
    key,
    async query(table: string, action: 'select' | 'insert' | 'update' | 'delete', data?: Record<string, unknown>, filters?: Record<string, unknown>) {
      const baseUrl = `${url}/rest/v1/${table}`;
      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': action === 'insert' ? 'return=representation' : 'return=minimal',
      };

      try {
        let response: Response;
        let queryUrl = baseUrl;

        // Add filters to URL
        if (filters) {
          const params = new URLSearchParams();
          Object.entries(filters).forEach(([k, v]) => {
            params.append(k, `eq.${v}`);
          });
          queryUrl += `?${params.toString()}`;
        }

        switch (action) {
          case 'select':
            response = await fetch(queryUrl + (filters ? '' : '?order=created_at.desc'), { headers });
            break;
          case 'insert':
            response = await fetch(baseUrl, {
              method: 'POST',
              headers,
              body: JSON.stringify(data),
            });
            break;
          case 'update':
            response = await fetch(queryUrl, {
              method: 'PATCH',
              headers,
              body: JSON.stringify(data),
            });
            break;
          case 'delete':
            response = await fetch(queryUrl, {
              method: 'DELETE',
              headers,
            });
            break;
          default:
            throw new Error('Invalid action');
        }

        if (!response.ok) {
          throw new Error(`Supabase error: ${response.status}`);
        }

        if (action === 'select') {
          return await response.json();
        }
        return null;
      } catch (error) {
        console.error('Supabase query error:', error);
        return null;
      }
    }
  };
}

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient();
  }
  return supabaseClient;
}

// Simple Supabase wrapper for direct REST API calls
export const supabase = {
  from: (table: string) => ({
    select: async (_columns = '*') => {
      const client = getSupabaseClient();
      if (!client) return { data: null, error: new Error('Supabase not configured') };
      const data = await client.query(table, 'select');
      return { data, error: null };
    },
    insert: async (data: Record<string, unknown>) => {
      const client = getSupabaseClient();
      if (!client) return { error: new Error('Supabase not configured') };
      await client.query(table, 'insert', data);
      return { error: null };
    },
    upsert: async (data: Record<string, unknown>) => {
      const client = getSupabaseClient();
      if (!client) return { error: new Error('Supabase not configured') };
      // For upsert, try update first, then insert if not found
      await client.query(table, 'insert', data);
      return { error: null };
    },
    update: (data: Record<string, unknown>) => ({
      eq: async (column: string, value: string) => {
        const client = getSupabaseClient();
        if (!client) return { error: new Error('Supabase not configured') };
        await client.query(table, 'update', data, { [column]: value });
        return { error: null };
      }
    }),
    delete: () => ({
      eq: async (column: string, value: string) => {
        const client = getSupabaseClient();
        if (!client) return { error: new Error('Supabase not configured') };
        await client.query(table, 'delete', undefined, { [column]: value });
        return { error: null };
      }
    }),
  }),
};

