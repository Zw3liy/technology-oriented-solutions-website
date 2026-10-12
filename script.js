document.documentElement.classList.add('js');

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

// PORTFOLIO REVEAL ANIMATION
const portfolioRows = document.querySelectorAll(
    '.reveal-on-scroll'
);

if ('IntersectionObserver' in window) {
    const portfolioObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
        }
    );

    portfolioRows.forEach((row) => {
        portfolioObserver.observe(row);
    });
} else {
    portfolioRows.forEach((row) => {
        row.classList.add('is-visible');
    });
}


// Progressive enhancement: the HTML action also works without JavaScript.
const enquiryForm = document.querySelector('#demo-request');
if (enquiryForm) {
    const status = document.querySelector('#enquiry-status');
    const submit = enquiryForm.querySelector('button[type="submit"]');
    let sending = false;
    enquiryForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (sending || !enquiryForm.reportValidity()) return;
        sending = true;
        submit.disabled = true;
        submit.textContent = 'Sending…';
        enquiryForm.setAttribute('aria-busy', 'true');
        status.dataset.state = 'pending';
        status.textContent = 'Sending your enquiry…';
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        try {
            const response = await fetch(enquiryForm.action, {
                method: 'POST',
                body: new FormData(enquiryForm),
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });
            if (!response.ok) {
                status.dataset.state = 'error';
                status.textContent = response.status === 429
                    ? 'Too many requests. Please wait before trying again, or email technologyorientedsolutions@pm.me. Your details are still here.'
                    : 'Your enquiry could not be submitted. Please try again or email technologyorientedsolutions@pm.me. Your details are still here.';
            } else {
                status.dataset.state = 'success';
                status.textContent = 'Thank you. Your enquiry has been submitted to TOS. We will respond using the email address you provided.';
                enquiryForm.reset();
            }
        } catch {
            status.dataset.state = 'error';
            status.textContent = 'We could not confirm submission. Your details are still here. Please check your connection or email technologyorientedsolutions@pm.me.';
        } finally {
            clearTimeout(timeout);
            sending = false;
            submit.disabled = false;
            submit.textContent = 'Send request';
            enquiryForm.removeAttribute('aria-busy');
        }
    });
}
