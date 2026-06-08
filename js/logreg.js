document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - checking elements...');
  
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  console.log('Elements found:', {
    loginTab: loginTab ? 'YES' : 'NO',
    registerTab: registerTab ? 'YES' : 'NO', 
    loginForm: loginForm ? 'YES' : 'NO',
    registerForm: registerForm ? 'YES' : 'NO'
  });

  // Если элементы не найдены, выводим ошибку
  if (!loginTab || !registerTab || !loginForm || !registerForm) {
    console.error('ERROR: Some elements are missing!');
    console.log('Available elements with IDs:');
    document.querySelectorAll('[id]').forEach(el => {
      console.log(`- ${el.id}: ${el.tagName}`);
    });
    return;
  }

  // Проверяем, не авторизован ли уже пользователь
  function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('userData');
    
    if (isLoggedIn === 'true' && userData) {
      console.log('User already logged in, redirecting to lobby...');
      window.location.href = 'main.html';
    }
  }
  
  // Вызываем проверку при загрузке страницы
  checkAuthStatus();

  // Функция переключения форм
  function switchToForm(formToShow) {
    console.log('Switching to form:', formToShow.id);
    
    // Скрываем все формы
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    
    // Показываем нужную форму
    formToShow.classList.add('active');
    
    // Обновляем активные кнопки
    if (formToShow === loginForm) {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
    } else {
      loginTab.classList.remove('active');
      registerTab.classList.add('active');
    }
    
    // Подстраиваем высоту контейнера
    adjustContainerHeight();
  }

  // Функция для подстройки высоты контейнера
  function adjustContainerHeight() {
    const activeForm = document.querySelector('.form.active');
    const formContainer = document.querySelector('.form-container');
    
    if (activeForm && formContainer) {
      setTimeout(() => {
        const formHeight = activeForm.scrollHeight;
        formContainer.style.minHeight = formHeight + 'px';
        console.log('Adjusted container height to:', formHeight);
      }, 100);
    }
  }

  // Функция сохранения данных пользователя
  function saveUserData(email, additionalData = {}) {
    const userData = {
      email: email,
      loginTime: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      ...additionalData
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    console.log('User data saved:', userData);
  }

  // Функция получения списка пользователей из localStorage
  function getUsersList() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  }

  // Функция сохранения нового пользователя в список
  function saveNewUser(email, password) {
    const users = getUsersList();
    
    // Проверяем, не существует ли уже такой пользователь
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return false;
    }
    
    // Добавляем нового пользователя
    users.push({
      email: email,
      password: password, // В реальном проекте пароль нужно хэшировать!
      registeredAt: new Date().toISOString()
    });
    
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    return true;
  }

  // Функция проверки учетных данных
  function validateCredentials(email, password) {
    const users = getUsersList();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      console.log('User found:', user.email);
      return true;
    }
    
    console.log('Invalid credentials');
    return false;
  }

  // Обработчики для кнопок
  loginTab.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Login tab clicked');
    switchToForm(loginForm);
  });

  registerTab.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Register tab clicked');
    switchToForm(registerForm);
  });

  // Обработчик формы входа с сохранением данных
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value;
    const agreeCheckbox = document.getElementById('login-agree');
    
    // Валидация полей
    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    if (!agreeCheckbox.checked) {
      alert('Пожалуйста, подтвердите согласие с условиями регистрации');
      return;
    }
    
    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Пожалуйста, введите корректный email адрес');
      return;
    }
    
    // Проверяем учетные данные
    if (validateCredentials(email, password)) {
      // Сохраняем данные пользователя
      saveUserData(email, {
        lastLogin: new Date().toISOString(),
        loginMethod: 'form'
      });
      
      alert('Вход выполнен успешно! Перенаправление...');
      
      // Перенаправление на страницу колледжа
      window.location.href = 'main.html';
    } else {
      alert('Неверный email или пароль. Пожалуйста, проверьте введенные данные или зарегистрируйтесь.');
    }
  });

  // Обработчик формы регистрации
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Register form submitted');
    
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    const agreeCheckbox = document.getElementById('register-agree');
    
    // Валидация полей
    if (!email || !password || !confirmPassword) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    if (!agreeCheckbox.checked) {
      alert('Пожалуйста, подтвердите согласие с условиями регистрации');
      return;
    }
    
    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Пожалуйста, введите корректный email адрес');
      return;
    }
    
    // Проверка сложности пароля (минимум 6 символов)
    if (password.length < 6) {
      alert('Пароль должен содержать не менее 6 символов');
      return;
    }
    
    // Сохраняем нового пользователя
    const userSaved = saveNewUser(email, password);
    
    if (userSaved) {
      alert('Регистрация прошла успешно! Сейчас вы будете перенаправлены на страницу входа.');
      
      // Очищаем форму регистрации
      this.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
     
    } else {
      alert('Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.');
    }
  });

  // Функция выхода из системы (если нужна)
  window.logout = function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('userEmail');
    console.log('User logged out');
    window.location.href = 'login.html';
  };

  // Инициализация высоты при загрузке
  setTimeout(() => {
    adjustContainerHeight();
  }, 200);

  console.log('All event listeners attached successfully!');
  console.log('Current active form:', document.querySelector('.form.active').id);
});