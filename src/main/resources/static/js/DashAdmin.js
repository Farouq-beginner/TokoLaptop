document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/dashboard')
        .then(response => response.json())
        .then(data => {
            document.getElementById("orders").textContent = data.jumlahPesanan || 0;
            document.getElementById("visitors").textContent = data.jumlahPengunjung || 0;
            
            document.getElementById("revenue").textContent =
                "Rp " + (data.totalPendapatan ? data.totalPendapatan.toLocaleString("id-ID") : "0");

            // Panggil initBarChart jika data chart tersedia
            if (data.labels && data.orders && data.visitors && data.revenue) {
                initBarChart({
                    labels: data.labels,
                    orders: data.orders,
                    visitors: data.visitors,
                    revenue: data.revenue
                });
            } else {
                console.warn("Data chart tidak lengkap:", data);
            }
        })
        .catch(error => {
            console.error("Gagal memuat data dashboard:", error);
        });

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
                        font: { size: 18 }
                    },
                    legend: { position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Jumlah' }
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                        title: { display: true, text: 'Pendapatan (juta Rp)' },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    }
});
