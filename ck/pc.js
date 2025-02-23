// particles.js

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let mouse = {
    x: undefined,
    y: undefined,
    radius: 100 // Interaction radius
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.brightness = Math.random() * 0.5 + 0.5;
        // Breathing motion properties
        this.offset = Math.random() * Math.PI * 2;
        this.breathSpeed = 0.02 + Math.random() * 0.01;
        this.breathAmplitude = 0.5 + Math.random() * 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(135, 206, 235, ${this.brightness})`;
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.x -= directionX * force * this.density;
            this.y -= directionY * force * this.density;
        } else {
            this.offset += this.breathSpeed;
            const breathX = Math.cos(this.offset) * this.breathAmplitude * Math.cos(this.angle);
            const breathY = Math.cos(this.offset) * this.breathAmplitude * Math.sin(this.angle);
            let targetX = this.baseX + breathX;
            let targetY = this.baseY + breathY;
            this.x += (targetX - this.x) * 0.05;
            this.y += (targetY - this.y) * 0.05;
        }
    }
}

const stars = [];
function init() {
    for (let i = 0; i < 300; i++) {
        stars.push(new Star());
    }
}
init();

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
animate();
