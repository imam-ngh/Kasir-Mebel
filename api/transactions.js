import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    // Izinkan CORS untuk pengembangan lokal
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        switch (request.method) {
            case 'GET': {
                const { rows } = await sql`SELECT * FROM transactions ORDER BY date DESC;`;
                return response.status(200).json(rows);
            }

            case 'POST': {
                const { transaction } = request.body;
                if (!transaction || !transaction.items) {
                    return response.status(400).json({ error: 'Data transaksi tidak valid' });
                }

                // 1. Simpan data transaksi utama
                await sql`
                    INSERT INTO transactions (transaction_number, customer_name, customer_phone, shipping_method, shipping_cost, shipping_address, shipping_notes, subtotal, discount, total, status, items)
                    VALUES (${transaction.transactionNumber}, ${transaction.customerName}, ${transaction.customerPhone}, ${transaction.shippingMethod}, ${transaction.shippingCost}, ${transaction.shippingAddress}, ${transaction.shippingNotes}, ${transaction.subtotal}, ${transaction.discount}, ${transaction.total}, ${transaction.status}, ${JSON.stringify(transaction.items)})
                `;

                // 2. Kurangi stok untuk setiap item
                for (const item of transaction.items) {
                    if (!item.productId) continue;
                    
                    const result = await sql`
                        UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.productId} AND stock >= ${item.quantity}
                    `;
                    
                    if (result.rowCount === 0) {
                        throw new Error(`Stok untuk produk ${item.name} tidak mencukupi.`);
                    }
                }

                return response.status(201).json({ message: 'Transaksi berhasil disimpan' });
            }
            default:
                response.setHeader('Allow', ['GET', 'POST']);
                return response.status(405).end(`Method ${request.method} Not Allowed`);
        }
    } catch (error) {
        console.error('API Transaction Error:', error);
        return response.status(500).json({ error: 'Gagal memproses transaksi', details: error.message });
    }
}
