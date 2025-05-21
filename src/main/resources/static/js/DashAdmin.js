document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the dashboard
    const dashboardData = {
        orders: 56,
        visitors: 120,
        products: 42,
        revenue: 12500000,
        monthlyData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            orders: [30, 40, 35, 50, 49, 60, 70, 56, 55, 60, 65, 70],
            visitors: [80, 90, 95, 100, 105, 110, 115, 120, 110, 115, 120, 125],
            revenue: [8000000, 8500000, 9000000, 9500000, 10000000, 10500000, 11000000, 11500000, 12000000, 12000000, 12500000, 13000000]
        }
    };

    // Animate counting up for each statistic
    animateValue('orders', 0, dashboardData.orders, 1000);
    animateValue('visitors', 0, dashboardData.visitors, 1000);
    animateValue('products', 0, dashboardData.products, 1000);
    animateValue('revenue', 0, dashboardData.revenue, 1000);

    // Format revenue with currency
    setTimeout(() => {
        document.getElementById('revenue').textContent = formatCurrency(dashboardData.revenue);
    }, 1000);

    // Initialize bar chart
    initBarChart(dashboardData.monthlyData);

    // Function to animate counting up
    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            element.textContent = current;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Function to format currency
    function formatCurrency(value) {
        return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Function to initialize bar chart
    function initBarChart(data) {
        const ctx = document.getElementById('barChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Pesanan',
                        data: data.orders,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Pengunjung',
                        data: data.visitors,
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Pendapatan (juta)',
                        data: data.revenue.map(v => v / 1000000),
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Statistik Bulanan',
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Jumlah'
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Pendapatan (juta Rp)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    // For real implementation, you would fetch data from an API:
    /*
    fetch('/api/dashboard')
        .then(response => response.json())
        .then(data => {
            // Update stats
            document.getElementById('orders').textContent = data.orders;
            document.getElementById('visitors').textContent = data.visitors;
            document.getElementById('products').textContent = data.products;
            document.getElementById('revenue').textContent = formatCurrency(data.revenue);
            
            // Update chart
            initBarChart(data.monthlyData);
        })
        .catch(error => console.error('Error fetching data:', error));
    */
});