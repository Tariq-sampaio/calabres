// Funcionalidades do Site Calabrês

// Menu Mobile Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Fechar menu mobile ao clicar fora
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Navegação suave e ativação de menu
const menuLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('section[id]');

// Função para ativar link do menu
function setActiveLink(activeLink) {
    menuLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Navegação suave ao clicar nos links
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - (window.innerWidth <= 1024 ? 80 : 0);
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            setActiveLink(link);
            
            // Fechar menu mobile após clique
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Ativação automática do menu baseada no scroll
function updateActiveMenu() {
    const scrollPosition = window.scrollY + (window.innerWidth <= 1024 ? 100 : 50);
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.menu-link[href="#${sectionId}"]`);
            if (activeLink) {
                setActiveLink(activeLink);
            }
        }
    });
}

// Listener para scroll
window.addEventListener('scroll', updateActiveMenu);

// Animações de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.addEventListener('DOMContentLoaded', () => {
    // Elementos para animar
    const animatedElements = document.querySelectorAll('.feature-card, .menu-item, .about-text, .about-image, .contact-info, .contact-cta');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Ativar menu inicial
    updateActiveMenu();
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Smooth scroll para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - (window.innerWidth <= 1024 ? 80 : 0);
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de hover nos cards do menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de hover nos cards de diferenciais
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Redimensionamento da janela
window.addEventListener('resize', () => {
    // Fechar menu mobile se a tela ficar grande
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
    
    // Recalcular posições do menu ativo
    updateActiveMenu();
});

// Loading suave da página
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Adicionar classe de loading inicial
document.body.style.opacity = '0';

