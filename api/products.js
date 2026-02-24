import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    // Izinkan CORS untuk pengembangan lokal
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        switch (request.method) {
            case 'GET': {
                const { rows } = await sql`SELECT * FROM products ORDER BY name ASC;`;
                return response.status(200).json(rows);
            }

            case 'POST': {
                const { name, category, unit, price, stock } = request.body;
                if (!name || !category || !unit || price === undefined || stock === undefined) {
                    return response.status(400).json({ error: 'Data produk tidak lengkap' });
                }
                await sql`INSERT INTO products (name, category, unit, price, stock) VALUES (${name}, ${category}, ${unit}, ${price}, ${stock});`;
                return response.status(201).json({ message: 'Produk berhasil ditambahkan' });
            }

            case 'PUT': {
                const { id, name, category, unit, price, stock } = request.body;
                if (!id) return response.status(400).json({ error: 'ID produk dibutuhkan' });
                await sql`UPDATE products SET name = ${name}, category = ${category}, unit = ${unit}, price = ${price}, stock = ${stock} WHERE id = ${id};`;
                return response.status(200).json({ message: 'Produk berhasil diperbarui' });
            }

            case 'DELETE': {
                const { ids } = request.body;
                if (!ids || !Array.isArray(ids) || ids.length === 0) {
                    return response.status(400).json({ error: 'ID produk untuk dihapus tidak valid' });
                }
                // Menggunakan ANY untuk menghapus beberapa ID sekaligus
                await sql`DELETE FROM products WHERE id = ANY(${ids}::int[]);`;
                return response.status(200).json({ message: 'Produk berhasil dihapus' });
            }

            default:
                response.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return response.status(405).end(`Method ${request.method} Not Allowed`);
        }
    } catch (error) {
        console.error('API Error:', error);
        return response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}