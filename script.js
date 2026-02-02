document.addEventListener('DOMContentLoaded', () => {

    // ============ NAVIGATION ============
    // Required for <a onclick="navigateTo('home')">
    window.navigateTo = function (sectionId) {
        const section = document.getElementById(sectionId);

        if (!section) {
            console.error('Section not found:', sectionId);
            return;
        }

        section.scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu after click
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    };


    // ============ CONTACT FORM ============
    window.handleSubmit = function (event) {
        event.preventDefault();

        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const business = document.getElementById('business')?.value || '';
        const message = document.getElementById('message')?.value || '';

        const mailtoLink =
            `mailto:hajarekiran210@gmail.com?subject=Contact from ${encodeURIComponent(name)}` +
            `&body=Name: ${encodeURIComponent(name)}%0A` +
            `Email: ${encodeURIComponent(email)}%0A` +
            `Phone: ${encodeURIComponent(phone)}%0A` +
            `Business: ${encodeURIComponent(business)}%0A%0A` +
            `Message:%0A${encodeURIComponent(message)}`;

        window.location.href = mailtoLink;
        alert('Please send the email from your email client. Our team will respond within 24–48 hours.');

        document.getElementById('contactForm')?.reset();
    };


    // ============ 3D CANVAS BACKGROUND ============
    const canvas = document.getElementById('canvas-bg');

    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5);
                this.vy = (Math.random() - 0.5);
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(10, 14, 39, 0.3)');
            gradient.addColorStop(0.5, 'rgba(26, 31, 58, 0.2)');
            gradient.addColorStop(1, 'rgba(10, 42, 74, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(180, 0, 255, 0.05)';
            ctx.beginPath();
            ctx.arc(canvas.width * 0.2, canvas.height * 0.3, 300, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(0, 255, 255, 0.03)';
            ctx.beginPath();
            ctx.arc(canvas.width * 0.8, canvas.height * 0.7, 350, 0, Math.PI * 2);
            ctx.fill();

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }


    // ============ MOBILE MENU ============
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';

            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'rgba(10, 14, 39, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1rem';
            navLinks.style.zIndex = '999';
            navLinks.style.borderTop = '1px solid rgba(0, 255, 255, 0.2)';
        });
    }

});
