document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // If it's just a hash, don't try to find a target
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Schedule/Menu Toggle
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const togglePanes = document.querySelectorAll('.toggle-pane');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Update buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update panes
            togglePanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetId) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // 3. Team Slider
    const teamGrid = document.getElementById('teamGrid');
    const teamPrev = document.getElementById('teamPrev');
    const teamNext = document.getElementById('teamNext');
    let currentTranslate = 0;

    if (teamGrid && teamPrev && teamNext) {
        const getCardWidth = () => {
            const card = teamGrid.querySelector('.team-card');
            return card ? card.offsetWidth + 25 : 0; // card width + gap
        };

        const getMaxTranslate = () => {
            const containerWidth = teamGrid.parentElement.offsetWidth;
            const gridWidth = teamGrid.scrollWidth;
            return Math.max(0, gridWidth - containerWidth);
        };

        teamNext.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            const maxTranslate = getMaxTranslate();
            currentTranslate = Math.min(currentTranslate + cardWidth, maxTranslate);
            teamGrid.style.transform = `translateX(-${currentTranslate}px)`;
        });

        teamPrev.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            currentTranslate = Math.max(currentTranslate - cardWidth, 0);
            teamGrid.style.transform = `translateX(-${currentTranslate}px)`;
        });

        // Reset on resize
        window.addEventListener('resize', () => {
            currentTranslate = 0;
            teamGrid.style.transform = `translateX(0)`;
        });
    }

    // 5. Booking Interactivity
    const dateItems = document.querySelectorAll('.date-item');
    dateItems.forEach(item => {
        item.addEventListener('click', () => {
            dateItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Month Switcher Logic
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    let currentMonthIndex = 3; // April
    const monthText = document.getElementById('currentMonthText');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const resetTodayBtn = document.getElementById('resetToday');

    if (monthText && prevMonthBtn && nextMonthBtn) {
        const updateMonth = () => {
            monthText.textContent = months[currentMonthIndex];
        };

        prevMonthBtn.addEventListener('click', () => {
            currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
            updateMonth();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentMonthIndex = (currentMonthIndex + 1) % 12;
            updateMonth();
        });

        if (resetTodayBtn) {
            resetTodayBtn.addEventListener('click', () => {
                currentMonthIndex = 3; // Reset to April
                updateMonth();
            });
        }
    }

    // 4. Fade-in Animations on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal');
    animatedElements.forEach(el => observer.observe(el));

    // 6. Photo Slider Logic (About section)
    const slides = document.querySelectorAll('#aboutSlides .slide');
    let currentAboutSlide = 0;
    
    function showAboutSlide(index) {
        if (!slides.length) return;
        slides.forEach((slide) => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    document.getElementById('aboutNext')?.addEventListener('click', () => {
        if (!slides.length) return;
        currentAboutSlide = (currentAboutSlide + 1) % slides.length;
        showAboutSlide(currentAboutSlide);
    });

    document.getElementById('aboutPrev')?.addEventListener('click', () => {
        if (!slides.length) return;
        currentAboutSlide = (currentAboutSlide - 1 + slides.length) % slides.length;
        showAboutSlide(currentAboutSlide);
    });

    // 7. Enroll Modal Logic
    const enrollModal = document.getElementById('enrollModal');
    const enrollForm = document.getElementById('enrollForm');
    const closeEnrollModal = document.getElementById('closeModal');
    const enrollButtons = document.querySelectorAll('a[href="#enroll"], .btn-cta');

    enrollButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Open modal instead of scrolling to booking section if it says 'Записаться'
            if(btn.textContent.includes('Записаться')) {
                e.preventDefault();
                enrollModal?.classList.add('active');
            }
        });
    });

    closeEnrollModal?.addEventListener('click', () => {
        enrollModal?.classList.remove('active');
    });

    enrollModal?.addEventListener('click', (e) => {
        if(e.target === enrollModal) {
            enrollModal.classList.remove('active');
        }
    });

    enrollForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
        enrollModal?.classList.remove('active');
        enrollForm.reset();
    });

    // 8. Route Button Logic
    const shareBtn = document.getElementById('shareBtn');
    shareBtn?.addEventListener('click', () => {
        const destLat = 42.87;
        const destLon = 74.59;
        
        // Открываем вкладку сразу, чтобы избежать блокировки (Popup Blocker)
        const routeWindow = window.open('about:blank', '_blank');
        if (routeWindow) {
            routeWindow.document.write('<html><body style="font-family:sans-serif; text-align:center; padding-top:20vh; color:#1a2b3c;"><h2>Построение маршрута...</h2><p>Пожалуйста, разрешите доступ к геопозиции, если браузер запросит.</p></body></html>');
        }

        const fallbackUrl = `https://yandex.ru/maps/?mode=routes&rtext=~${destLat},${destLon}`;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Точный маршрут от текущих координат пользователя
                    const explicitUrl = `https://yandex.ru/maps/?mode=routes&rtext=${position.coords.latitude},${position.coords.longitude}~${destLat},${destLon}`;
                    if (routeWindow) routeWindow.location.href = explicitUrl;
                    else window.location.href = explicitUrl;
                },
                (error) => {
                    // Фолбэк, если пользователь отказал в доступе к геопозиции
                    if (routeWindow) routeWindow.location.href = fallbackUrl;
                    else window.location.href = fallbackUrl;
                },
                { timeout: 6000, maximumAge: 60000 }
            );
        } else {
            if (routeWindow) routeWindow.location.href = fallbackUrl;
            else window.location.href = fallbackUrl;
        }
    });
});
