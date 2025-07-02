// 2. Функціонал для форми зворотного зв'язку (для Formspree)
// У цьому варіанті форма відправляється стандартним POST-запитом
// і Formspree обробляє перенаправлення на сторінку "Дякую!"
// Якщо ви хочете AJAX-відправку з Formspree, JavaScript код буде іншим.
// Але для простоти та уникнення "Method Not Allowed" стандартний POST є найкращим.
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    // Якщо ви хочете показувати повідомлення без перезавантаження сторінки
    // тоді вам потрібно буде використати AJAX (fetch) з Formspree,
    // і JS буде подібним до того, що був для Netlify, але з action URL Formspree
    // і додаванням 'Accept': 'application/json' в заголовки.
    // Для початку, я пропоную залишити стандартну поведінку.

    // Якщо ви все ж хочете AJAX з Formspree:
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        formMessage.style.display = 'none';
        formMessage.classList.remove('success', 'error');

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Важливо для AJAX-відповіді від Formspree
                }
            });

            if (response.ok) {
                formMessage.textContent = 'Дякуємо! Ваша заявка успішно надіслана. Ми зв\'яжемося з вами найближчим часом.';
                formMessage.classList.add('success');
                contactForm.reset();
            } else {
                const errorData = await response.json(); // Formspree повертає JSON з помилками
                console.error('Formspree error:', errorData);
                formMessage.textContent = 'На жаль, сталася помилка при відправці. Спробуйте ще раз або зателефонуйте нам.';
                formMessage.classList.add('error');
            }
        } catch (error) {
            console.error('Помилка відправки форми (fetch):', error);
            formMessage.textContent = 'На жаль, сталася помилка при відправці. Перевірте підключення до інтернету.';
            formMessage.classList.add('error');
        } finally {
            formMessage.style.display = 'block';
        }
    });
}