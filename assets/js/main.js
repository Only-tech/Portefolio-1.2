const themeToggle = document.getElementById('themeToggle');
const body = document.getElementById('body');
const bgVideo = document.getElementById('background-video');
const projects = document.querySelectorAll('.project');

// Modifie la gestion du thème
function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light');
    } else {
        body.classList.remove('light'); 
    }

    // Si un background-image ou video est présent, ne pas changer la couleur de fond
    const hasBgImage = body.style.backgroundImage && body.style.backgroundImage !== 'none';
    const hasBgVideo = bgVideo.style.display === 'block' && bgVideo.src;

    if (!hasBgImage && !hasBgVideo) {
        if (theme === 'light') {
            body.style.backgroundColor = '#fff';
        } else {
            body.style.backgroundColor = '#0f0f0f';
        }
    }
}

// Charge le thème sauvegardé au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
        // Assure que l'état du toggle est correct au chargement
        themeToggle.checked = (savedTheme === 'light');
    } else {
        // Si aucun thème n'est sauvegardé, vérifie la préférence système de l'utilisateur
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            applyTheme('light');
            themeToggle.checked = true;
        } else {
            applyTheme('dark'); // Thème sombre par défaut
            themeToggle.checked = false;
        }
    }
});

// Écouteur d'événement pour le changement de l'interrupteur
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});


projects.forEach(project => {
    const img = project.querySelector('img');
    const video = project.querySelector('video.preview-video');
    const bgImage = project.getAttribute('data-bg');
    const bgVideoSrc = project.getAttribute('data-bg-video');

    project.addEventListener('mouseenter', () => {
        // Lecture vidéo dans le bloc
        if (video) {
            video.style.opacity = '1';
            video.play();
        }
        if (img) {
            img.style.opacity = '0';
        }

        // background image pour les projets
        if (bgImage && !bgVideoSrc) {
            body.style.backgroundImage = bgImage;
        }

        // background vidéo portefolio avec projet evasion uniquement
        if (bgVideoSrc) {
            bgVideo.src = bgVideoSrc;
            bgVideo.style.display = 'block';
            bgVideo.play();
            body.style.backgroundImage = 'none';
        }
    });

    project.addEventListener('mouseleave', () => {
        // Arrête la vidéo dans la carte
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.style.opacity = '0';
        }
        if (img) {
            img.style.opacity = '1';
        }

        // Retire background image
        if (bgImage && !bgVideoSrc) {
            body.style.backgroundImage = 'none';
            // Restaurer la couleur de fond du thème actuel après avoir retiré l'image
            applyTheme(localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
        }

        // Stop background vidéo
        if (bgVideoSrc) {
            bgVideo.pause();
            bgVideo.removeAttribute('src');
            bgVideo.load();
            bgVideo.style.display = 'none';
        }
    });
});

// preview du cv au survol de la souris
const cvPreview = document.getElementById('cv-preview');
const cvContainer = document.querySelector('.cv-container');

cvContainer.addEventListener('mouseenter', () => {
    cvPreview.style.display = 'block';
});

cvContainer.addEventListener('mouseleave', () => {
    cvPreview.style.display = 'none';
});
