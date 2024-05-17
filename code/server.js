const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const SHOPIFY_API_KEY = 'your_api_key';
const SHOPIFY_PASSWORD = 'your_password';
const SHOP_NAME = 'your_shop_name';

app.get('/sales-count', async (req, res) => {
    try {
        const response = await fetch(`https://${SHOPIFY_API_KEY}:${SHOPIFY_PASSWORD}@${SHOP_NAME}.myshopify.com/admin/api/2023-04/orders.json?status=any`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const totalSoldProducts = data.orders.reduce((acc, order) => acc + order.line_items.reduce((sum, item) => sum + item.quantity, 0), 0);
        res.json({ sales_count: totalSoldProducts });
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Error fetching sales data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});