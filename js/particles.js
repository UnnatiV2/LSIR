// Particle object constructor
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Random size between 1 and 6
        this.speedX = Math.random() * 3 - 1.5; // Random speed between -1.5 and 1.5
        this.speedY = Math.random() * 3 - 1.5; // Random speed between -1.5 and 1.5
        this.color = 'rgba(255, 0, 102, 0.8)'; // Bright pink color with opacity (rgba)
        this.glowColor = 'rgba(255, 0, 102, 0.5)'; // Glow color with opacity (rgba)
    }

    // Update particle position
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.size > 0.2) {
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
    }

    // Draw particle with glow effect
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Glow effect
        ctx.shadowBlur = 15; // Amount of blur (adjust as needed)
        ctx.shadowColor = this.glowColor; // Glow color
        ctx.shadowOffsetX = 0; // Horizontal offset of the glow
        ctx.shadowOffsetY = 0; // Vertical offset of the glow

        ctx.fillStyle = this.color;
        ctx.fill();

        // Reset shadow properties to avoid affecting other drawings
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'rgba(0, 0, 0, 0)'; // Reset shadow color to fully transparent
    }

    // Draw edges between particles
    drawEdges(particles) {
        particles.forEach(particle => {
            const dx = this.x - particle.x;
            const dy = this.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) { // Adjust the distance threshold as needed
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.strokeStyle = 'rgba(255, 0, 102, 0.2)'; // Edge color with opacity (rgba)
                ctx.lineWidth = 1; // Edge thickness
                ctx.stroke();
            }
        });
    }
}

// Canvas setup
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Resize canvas to fill the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Generate particles at random positions across the canvas
function generateInitialParticles() {
    for (let i = 0; i < 300; i++) { // Adjust the number as needed
        const xPos = Math.random() * canvas.width;
        const yPos = Math.random() * canvas.height;
        particles.push(new Particle(xPos, yPos));
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        particle.drawEdges(particles); // Draw edges between particles

        // Remove particles that are too small
        if (particle.size <= 0.2) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateParticles);
}

// Event listeners
window.addEventListener('resize', resizeCanvas);

// Initialize canvas and animation
resizeCanvas();
generateInitialParticles(); // Generate particles on page load
animateParticles();
