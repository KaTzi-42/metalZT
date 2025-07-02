// 2. Функціонал для форми зворотного зв'язку (для Netlify Forms)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
console.log('script started');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Запобігти стандартній відправці форми

        // Приховати попередні повідомлення
        // formMessage?.style.display = 'none';
        // formMessage?.classList.remove('success', 'error');

        const formData = new FormData(contactForm); // Збираємо дані форми

        try {
            // Netlify Forms обробляє POST-запити до свого шляху
            // Ми відправляємо дані через fetch API
            console.log('check before post')
            const response = await fetch('/', { // Відправляємо на кореневий URL сайту
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(contactForm).toString(),
            });
            console.log('check after post')
            if (response.ok) {
                formMessage.textContent =
                    'Дякуємо! Ваша заявка успішно надіслана. Ми зв\'яжемося з вами найближчим часом.';
                formMessage.classList.add('success');
                contactForm.reset(); // Очистити форму
            } else {
                // Якщо сталася помилка з Netlify Forms (наприклад, перевищено ліміт)
                console.error('Netlify Forms error response:', response);
                formMessage.textContent =
                    'На жаль, сталася помилка при відправці. Спробуйте ще раз або зателефонуйте нам.';
                formMessage.classList.add('error');
            }
        } catch (error) {
            console.error('Помилка відправки форми (fetch):', error);
            formMessage.textContent =
                'На жаль, сталася помилка при відправці. Перевірте підключення до інтернету.';
            formMessage.classList.add('error');
        } finally {
            formMessage.style.display = 'block';
        }
    });
}