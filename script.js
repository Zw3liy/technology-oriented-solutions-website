const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuButton?.setAttribute('aria-expanded', 'false');
    });
});

const year = document.querySelector('#year');

if (year) {
    year.textContent = new Date().getFullYear();
}

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card) => {
    card.addEventListener('toggle', () => {
        if (!card.open) {
            return;
        }

        serviceCards.forEach((otherCard) => {
            if (otherCard !== card) {
                otherCard.open = false;
            }
        });
    });

    card.querySelector('.service-text-link')?.addEventListener('click', () => {
        const serviceName = card.querySelector('h3')?.textContent?.trim();
        const message = document.querySelector(
            'textarea[name="message"]'
        );

        if (serviceName && message && !message.value.trim()) {
            message.value =
                `I am interested in ${serviceName}. Please contact me to discuss the right solution.`;
        }
    });
});

