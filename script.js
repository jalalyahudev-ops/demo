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
    const catBtns = document.querySelectorAll('.cat-btn');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const dateItems = document.querySelectorAll('.date-item');
    dateItems.forEach(item => {
        item.addEventListener('click', () => {
            dateItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
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
});
