document.getElementById('register-btn').addEventListener('click', function() {
  window.location.href = 'reg.html';
});
document.getElementById('login-btn').addEventListener('click', function() {
  if (!this.classList.contains('active')) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'login.html'; // замените на свой путь к странице входа
    }, 400);
  }
});

document.getElementById('register-btn').addEventListener('click', function() {
  if (!this.classList.contains('active')) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'reg.html'; // замените на свой путь к странице регистрации
    }, 400);
  }
});

// Найти форму регистрации (если уникальна, можно по id или классу)
const registrationForm = document.querySelector('form');

if (registrationForm) {
  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); // отменяем стандартную отправку формы
    // Здесь можно добавить валидацию перед переходом

    // Плавный переход (опционально можно добавить анимацию)
    window.location.href = 'profile.html'; // переход на личный кабинет
  });
}

