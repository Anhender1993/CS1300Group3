// Common functionality for all pages

// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger-menu');
const leftSection = document.querySelector('.left-section');

if (hamburger && leftSection) {
    hamburger.addEventListener('click', () => {
        leftSection.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!leftSection.contains(e.target) && !hamburger.contains(e.target)) {
            leftSection.classList.remove('active');
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').replace('.html', '');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = event.target.getAttribute('href');
        }
    });
});

// Homepage Functionality
if (document.title === 'Lumi Pizza - Home') {
    const heroImage = document.querySelector('.responsive');

    // Hero Image Hover Effect
    heroImage.addEventListener('mouseenter', () => {
        heroImage.style.transform = 'scale(1.05)';
        heroImage.style.transition = 'transform 0.3s ease';
    });

    heroImage.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'scale(1)';
    });
}

// Menu Page Functionality
if (document.title === 'Lumi Pizza - Menu') {
    // Interactive Menu
    const menuItems = document.querySelectorAll('.menu-list li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            alert(`You clicked on: ${item.textContent}`);
        });
    });
}

// Order Page Functionality
if (document.title === 'Lumi Pizza - Order') {
    const orderForm = document.getElementById('order-form');

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Form Values
        const name = document.getElementById('name').value;
        const pizza = document.getElementById('pizza').value;
        const address = document.getElementById('address').value;

        // Show Confirmation
        const confirmationMessage = `Thank you, ${name}! Your ${pizza} pizza will be delivered to: ${address}.`;
        alert(confirmationMessage);

        // Optional: Save order details to local storage (simulate backend storage)
        localStorage.setItem('order', JSON.stringify({ name, pizza, address }));
    });
}

// Contact Page Functionality
if (document.title === 'Lumi Pizza - Contact') {
    // Dynamic Greeting for Contact Page
    const today = new Date();
    const greeting = today.getHours() < 12 ? 'Good Morning!' : 'Hello!';
    document.querySelector('main section h2').textContent = `${greeting} Contact Lumi Pizza`;
}
