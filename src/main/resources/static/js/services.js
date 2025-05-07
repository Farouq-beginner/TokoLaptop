document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const container = document.querySelector('.container');
    const displayBoard = document.getElementById('displayBoard');
    const services = document.querySelectorAll('.service-image');
    const descriptions = document.querySelectorAll('.description');
    let currentIndex = 0;
    let rotation = 0;
    let isDragging = false;
    let startX, startY;
    let rotationSpeed = 0;
    
    // Show container with animation after a short delay
    setTimeout(() => {
        container.classList.add('visible');
    }, 300);

    // Function to update active service
    function updateActiveService(index) {
        // Update services
        services.forEach(service => service.classList.remove('active'));
        services[index].classList.add('active');
        
        // Update descriptions
        descriptions.forEach(desc => desc.classList.remove('active'));
        descriptions[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }

    // Function to rotate service
    function rotateService(direction) {
        // Update rotation
        rotation += direction * 120;
        displayBoard.style.transform = `rotate(${rotation}deg)`;
        
        // Calculate new index
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = services.length - 1;
        if (newIndex >= services.length) newIndex = 0;
        
        // Update active service with some delay to match rotation
        setTimeout(() => {
            updateActiveService(newIndex);
        }, 400);
    }

    // Mouse/touch event handlers for display board
    displayBoard.addEventListener('mousedown', startDrag);
    displayBoard.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startDrag({ clientX: touch.clientX, clientY: touch.clientY });
    });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        drag({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        rotationSpeed = 0;
    }

    function drag(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Calculate rotation based on delta
        rotationSpeed = deltaX * 0.5;
        
        startX = e.clientX;
        startY = e.clientY;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        // Determine direction based on rotation speed
        if (Math.abs(rotationSpeed) > 5) {
            const direction = rotationSpeed > 0 ? 1 : -1;
            rotateService(direction);
        }
        
        rotationSpeed = 0;
    }

    // Click handlers for navigation
    displayBoard.addEventListener('click', function(e) {
        if (!isDragging) {
            rotateService(1);
        }
    });
});