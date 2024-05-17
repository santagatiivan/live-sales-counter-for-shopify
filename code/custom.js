async function updateSalesCounter() {
    try {
        const response = await fetch('https://your-server-url/sales-count'); // Replace with your server URL
        const data = await response.json();
        const salesCount = data.sales_count;

        document.getElementById('sales-counter').innerText = salesCount;
    } catch (error) {
        console.error('Error fetching sales data:', error);
    }
}

// Update the counter every 10 seconds
setInterval(updateSalesCounter, 10000);

// Update the counter when the page loads
updateSalesCounter();