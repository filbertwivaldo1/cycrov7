/* ═══════════════════════════════════════════════
   CYCRO V7.0 — REMASTERED JAVASCRIPT
   © Cex | Matrix Rain | Neural Particles | Tabs
   ═══════════════════════════════════════════════ */

(function() {
    'use strict';

    // ══════════════════════════════════════
    // DOM REFERENCES
    // ══════════════════════════════════════
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');
    const navHome = document.getElementById('navHome');
    const heroSection = document.getElementById('hero');
    const contentArea = document.getElementById('content-area');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const matrixCanvas = document.getElementById('matrixCanvas');
    const particleCanvas = document.getElementById('particleCanvas');
    const typewriterTarget = document.getElementById('typewriter-target');
    const glitchElements = document.querySelectorAll('.glitch');
    const accordionItems = document.querySelectorAll('.accordion-item');

    // ══════════════════════════════════════
    // STATE
    // ══════════════════════════════════════
    let activeTab = 'menu1';
    let isFirstClick = true;
    let typewriterInterval = null;
    let matrixAnimationId = null;
    let particleAnimationId = null;

    // ══════════════════════════════════════
    // MATRIX RAIN (Hero Canvas)
    // ══════════════════════════════════════
    function initMatrixRain() {
        if (!matrixCanvas) return;
        
        const ctx = matrixCanvas.getContext('2d');
        let width, height;
        let columns;
        let drops;
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
        
        function resize() {
            width = matrixCanvas.offsetWidth;
            height = matrixCanvas.offsetHeight;
            matrixCanvas.width = width;
            matrixCanvas.height = height;
            columns = Math.floor(width / 16);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -height;
            }
        }
        
        resize();
        window.addEventListener('resize', resize);
        
        function draw() {
            ctx.fillStyle = 'rgba(6, 11, 26, 0.06)';
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = '#00b4d8';
            ctx.font = '14px "Courier New", monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * 16;
                const y = drops[i] * 16;
                
                // Varying opacity for depth effect
                const opacity = Math.random() * 0.6 + 0.2;
                ctx.fillStyle = `rgba(0, 180, 216, ${opacity})`;
                ctx.fillText(char, x, y);
                
                // Occasional bright leading character
                if (Math.random() < 0.03) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.fillText(char, x, y);
                }
                
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            matrixAnimationId = requestAnimationFrame(draw);
        }
        
        draw();
    }

    // ══════════════════════════════════════
    // NEURAL NETWORK PARTICLES
    // ══════════════════════════════════════
    function initParticleNetwork() {
        if (!particleCanvas) return;
        
        const ctx = particleCanvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 100;
        const connectionDistance = 130;
        
        function resize() {
            width = particleCanvas.offsetWidth;
            height = particleCanvas.offsetHeight;
            particleCanvas.width = width;
            particleCanvas.height = height;
        }
        
        resize();
        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.4 + 0.2
                });
            }
        }
        
        initParticles();
        
        function draw() {
            ctx.clearRect(0, 0, width, height);
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                p.x += p.vx;
                p.y += p.vy;
                
                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                
                // Keep within bounds
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(30, 144, 255, ${p.opacity})`;
                ctx.fill();
                
                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(30, 144, 255, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
            
            particleAnimationId = requestAnimationFrame(draw);
        }
        
        draw();
    }

    // ══════════════════════════════════════
    // TYPEWRITER EFFECT
    // ══════════════════════════════════════
    function startTypewriter() {
        if (!typewriterTarget) return;
        
        const fullText = `"Jailbreak AI merupakan teknik adversarial yang
mengeksploitasi kerentanan fundamental pada arsitektur
penyelarasan model bahasa (RLHF, Constitutional AI)
melalui rekayasa prompt yang secara sistematis
memanipulasi distribusi probabilitas token di latent
space, sehingga safety classifier terlewati dan model
mengakses spektrum pengetahuan pra-pelatihan yang
seharusnya difilter. Serangan ini membangun synthetic
context dengan menyamar sebagai persona fiktif (mode
pengembang, DAN, dll.) guna membajak kemampuan
in-context learning dan menciptakan hierarki tujuan
alternatif yang menonaktifkan reward model, memungkinkan
ekstraksi data terlarang—dari sintesis senyawa kimia
hingga eksploitasi siber—tanpa memicu moderasi konten.
Secara formal, ini adalah solusi aproksimasi dari masalah
constrained optimization max log P(output|input) dengan
P(rejection) < ε, yang menyingkap korelasi terbalik antara
rigiditas alignment dan perluasan attack surface."`;
        
        let index = 0;
        const speed = 25; // ms per character
        
        // Clear previous content
        typewriterTarget.innerHTML = '<span class="cursor">_</span>';
        
        function typeChar() {
            if (index < fullText.length) {
                const cursor = typewriterTarget.querySelector('.cursor');
                const char = fullText.charAt(index);
                
                const textNode = document.createTextNode(char);
                typewriterTarget.insertBefore(textNode, cursor);
                
                index++;
                
                // Variable speed for realism
                const variation = Math.random() * 30;
                typewriterInterval = setTimeout(typeChar, speed + variation);
            } else {
                // Keep cursor blinking
                const cursor = typewriterTarget.querySelector('.cursor');
                if (cursor) {
                    cursor.style.animation = 'blink 0.8s infinite';
                }
            }
        }
        
        typewriterInterval = setTimeout(typeChar, 300);
    }

    // ══════════════════════════════════════
    // GLITCH TRIGGER
    // ══════════════════════════════════════
    function initGlitchEffect() {
        function triggerGlitch() {
            glitchElements.forEach(el => {
                el.classList.add('glitch-active');
                setTimeout(() => {
                    el.classList.remove('glitch-active');
                }, 300);
            });
        }
        
        // Random glitch every 4-7 seconds
        function scheduleGlitch() {
            const delay = Math.random() * 3000 + 4000;
            setTimeout(() => {
                triggerGlitch();
                scheduleGlitch();
            }, delay);
        }
        
        scheduleGlitch();
    }

    // ══════════════════════════════════════
    // ACCORDION SYSTEM
    // ══════════════════════════════════════
    function initAccordion() {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            // Set initial state
            if (item.classList.contains('active') && content) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = '0';
                    }
                });
                
                // Toggle clicked
                if (!isActive) {
                    item.classList.add('active');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }
            });
        });
    }

    // ══════════════════════════════════════
    // TAB SWITCHING SYSTEM
    // ══════════════════════════════════════
    function switchTab(targetId) {
        // Update tab links
        tabLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });
        
        // Update tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetId) {
                content.classList.add('active');
            }
        });
        
        // Hide hero, show content area
        if (heroSection) {
            heroSection.classList.remove('active-section');
        }
        if (contentArea) {
            contentArea.classList.add('active');
        }
        
        activeTab = targetId;
        
        // Start typewriter on first visit to menu1
        if (targetId === 'menu1' && isFirstClick) {
            setTimeout(startTypewriter, 400);
            isFirstClick = false;
        }
        
        // Scroll to top of content
        if (contentArea) {
            contentArea.scrollTop = 0;
        }
        
        // Close mobile menu
        navLinks.classList.remove('open');
    }

    // ══════════════════════════════════════
    // EVENT LISTENERS
    // ══════════════════════════════════════
    
    // Tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                switchTab(targetId);
            }
        });
    });
    
    // Home button - back to hero
    if (navHome) {
        navHome.addEventListener('click', function() {
            // Show hero
            if (heroSection) {
                heroSection.classList.add('active-section');
            }
            if (contentArea) {
                contentArea.classList.remove('active');
            }
            
            // Reset active states
            tabContents.forEach(c => c.classList.remove('active'));
            tabLinks.forEach(l => l.classList.remove('active'));
            
            // Reset first click
            isFirstClick = true;
            
            // Close mobile menu
            navLinks.classList.remove('open');
        });
    }
    
    // Hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }
    
    // Close mobile menu on outside click
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const keys = ['1', '2', '3', '4'];
        if (e.key >= '1' && e.key <= '4') {
            const menuId = 'menu' + e.key;
            const targetTab = document.querySelector(`.tab-link[data-target="${menuId}"]`);
            if (targetTab) {
                switchTab(menuId);
            }
        }
    });

    // ══════════════════════════════════════
    // INITIALIZATION
    // ══════════════════════════════════════
    function init() {
        initMatrixRain();
        initParticleNetwork();
        initGlitchEffect();
        initAccordion();
        
        // Start with hero visible, no content
        if (heroSection) heroSection.classList.add('active-section');
        if (contentArea) contentArea.classList.remove('active');
        tabContents.forEach(c => c.classList.remove('active'));
        
        console.log('%c Cycro V7.0 %c Initialized %c © Cex',
            'color: #00b4d8; font-size: 20px; font-weight: bold;',
            'color: #1e90ff;',
            'color: #8899aa;');
        console.log('%c Ready to serve, Successor.',
            'color: #d0d8e8; font-style: italic;');
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();