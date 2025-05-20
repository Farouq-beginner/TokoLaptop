const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
new Chart(doughnutCtx, {
  type: 'doughnut',
  data: {
    labels: ['Chrome', 'IE', 'Firefox', 'Safari', 'Opera', 'Navigator'],
    datasets: [{
      data: [30, 10, 20, 15, 15, 10],
      backgroundColor: ['#f44336', '#4caf50', '#ff9800', '#2196f3', '#3f51b5', '#9e9e9e']
    }]
  },
  options: {
    responsive: true
  }
});

// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Electronics',
        backgroundColor: '#e74c3c',
        data: [70, 60, 80, 82, 55, 60, 40]
      },
      {
        label: 'Fashion',
        backgroundColor: '#2ecc71',
        data: [50, 40, 45, 20, 85, 75, 90]
      },
      {
        label: 'Foods',
        backgroundColor: '#3498db',
        data: [65, 70, 60, 55, 50, 70, 75]
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});