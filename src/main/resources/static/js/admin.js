document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("laptopForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Mencegah reload halaman

            const id = document.getElementById('laptopId').value;
            const name = document.getElementById('laptopName').value;
            const price = parseFloat(document.getElementById('laptopPrice').value);
            const image = document.getElementById('laptopImage').value;
            const stockQuantity = parseInt(document.getElementById('stocklaptop').value);
            const limited = document.getElementById('laptopLimited').checked;

            const laptopData = {
                name,
                price,
                image,
                stockQuantity,
                limited
            };

            const isEdit = !!id;
            const method = isEdit ? 'PUT' : 'POST';
            const endpoint = isEdit 
                ? `http://localhost:8080/api/laptops/${id}` 
                : 'http://localhost:8080/api/laptops';

            fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(laptopData)
            })
            .then(response => {
                if (!response.ok) throw new Error('Gagal menyimpan data');
                return response.json();
            })
            .then(data => {
                alert('Data laptop berhasil disimpan!');
                console.log('Data dari backend:', data);
                document.getElementById('laptopForm').reset();
                document.getElementById('laptopModal').style.display = 'none';
                // Optional: reload data laptop di halaman utama
                location.reload(); 
            })
            .catch(error => {
                console.error('Error saat menyimpan laptop:', error);
                alert('Terjadi kesalahan saat menyimpan laptop');
            });
        });
    }
});
