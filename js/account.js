(function() {
  // ========== КЛАСС ==========
  const classSelect = document.getElementById('classSelect');
  
  function loadClass() {
    const saved = localStorage.getItem('userClass');
    if (saved) {
      classSelect.value = saved;
    }
  }
  
  if (classSelect) {
    classSelect.addEventListener('change', function() {
      localStorage.setItem('userClass', this.value);
    });
    loadClass();
  }

  // ========== ИНТЕРЕСЫ ==========
  const STORAGE_INTERESTS = 'customInterestsAll';
  const tagsContainer = document.getElementById('tagsContainer');
  const interestSelect = document.getElementById('interestSelect');
  const addFromSelectBtn = document.getElementById('addFromSelectBtn');

  const baseInterests = ['IT', 'Дизайн', 'Медицина', 'Гуманитарные'];
  const colorPalette = ['#ff004c', '#00ff2a', '#00ff9d', '#00ff6a', '#aa00ff', '#00ff9d', '#00b3ff', '#ff0000', '#008cff', '#ff00f2'];

  function getRandomColor() { 
    return colorPalette[Math.floor(Math.random() * colorPalette.length)]; 
  }

  function loadAllInterests() {
    const saved = localStorage.getItem(STORAGE_INTERESTS);
    if (saved) { 
      try { 
        return JSON.parse(saved); 
      } catch { 
        return [...baseInterests]; 
      } 
    } else { 
      return [...baseInterests]; 
    }
  }

  function saveAllInterests(arr) { 
    localStorage.setItem(STORAGE_INTERESTS, JSON.stringify(arr)); 
  }

  function renderTags() {
    if (!tagsContainer) return;
    const interests = loadAllInterests();
    tagsContainer.innerHTML = '';
    interests.forEach((text) => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = text;
      span.style.backgroundColor = getRandomColor();
      const del = document.createElement('span');
      del.className = 'delete-tag';
      del.textContent = '✕';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        let current = loadAllInterests();
        current = current.filter(item => item !== text);
        saveAllInterests(current);
        renderTags();
      });
      span.appendChild(del);
      tagsContainer.appendChild(span);
    });
  }

  if (addFromSelectBtn && interestSelect) {
    addFromSelectBtn.addEventListener('click', () => {
      const selectedValue = interestSelect.value;
      if (!selectedValue) {
        alert('Пожалуйста, выберите интерес из списка');
        return;
      }
      
      const current = loadAllInterests();
      if (current.some(i => i.toLowerCase() === selectedValue.toLowerCase())) {
        alert('Такой интерес уже есть');
        return;
      }
      
      current.push(selectedValue);
      saveAllInterests(current);
      renderTags();
      interestSelect.value = '';
    });
  }

  // ========== ЦЕЛЬ с кнопкой "Изменить" ==========
  const GOAL_KEY = 'userGoal';
  const goalDisplay = document.getElementById('goalDisplay');
  const goalEditArea = document.getElementById('goalEditArea');
  const goalInput = document.getElementById('goalInput');
  const saveGoalBtn = document.getElementById('saveGoalBtn');
  const cancelGoalBtn = document.getElementById('cancelGoalBtn');
  const editGoalBtn = document.getElementById('editGoalBtn');

  function loadGoal() {
    if (!goalDisplay) return;
    const saved = localStorage.getItem(GOAL_KEY);
    goalDisplay.innerText = saved ? 'Моя цель: ' + saved : 'Моя цель: Поступить на программу...';
  }
  loadGoal();

  if (editGoalBtn) {
    editGoalBtn.addEventListener('click', () => {
      if (goalDisplay) goalDisplay.style.display = 'none';
      editGoalBtn.style.display = 'none';
      if (goalEditArea) goalEditArea.style.display = 'block';
      if (goalInput && goalDisplay) goalInput.value = goalDisplay.innerText.replace('Моя цель: ', '');
    });
  }

  if (saveGoalBtn) {
    saveGoalBtn.addEventListener('click', () => {
      const newGoal = goalInput ? (goalInput.value.trim() || 'Поступить на программу...') : 'Поступить на программу...';
      if (goalDisplay) goalDisplay.innerText = 'Моя цель: ' + newGoal;
      localStorage.setItem(GOAL_KEY, newGoal);
      if (goalDisplay) goalDisplay.style.display = 'block';
      if (editGoalBtn) editGoalBtn.style.display = 'inline-block';
      if (goalEditArea) goalEditArea.style.display = 'none';
    });
  }
  
  if (cancelGoalBtn) {
    cancelGoalBtn.addEventListener('click', () => {
      if (goalDisplay) goalDisplay.style.display = 'block';
      if (editGoalBtn) editGoalBtn.style.display = 'inline-block';
      if (goalEditArea) goalEditArea.style.display = 'none';
    });
  }

  // ========== СЕГОДНЯ ==========
  const todayDateSpan = document.getElementById('currentDate');
  if (todayDateSpan) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('ru-RU', options);
    todayDateSpan.textContent = today;
  }

  const TASK_KEY = 'todayTask';
  const taskDisplay = document.getElementById('taskDisplay');
  const taskEditArea = document.getElementById('taskEditArea');
  const editTaskBtn = document.getElementById('editTaskBtn');
  const taskInput = document.getElementById('taskInput');
  const saveTaskBtn = document.getElementById('saveTaskBtn');
  const cancelTaskBtn = document.getElementById('cancelTaskBtn');

  function loadTask() {
    if (!taskDisplay) return;
    const saved = localStorage.getItem(TASK_KEY);
    taskDisplay.innerText = saved ? '✨ ' + saved : '✨ получить диплом программиста';
  }
  loadTask();

  if (editTaskBtn) {
    editTaskBtn.addEventListener('click', () => {
      if (taskDisplay) taskDisplay.style.display = 'none';
      editTaskBtn.style.display = 'none';
      if (taskEditArea) taskEditArea.style.display = 'flex';
      if (taskInput && taskDisplay) taskInput.value = taskDisplay.innerText.replace('✨ ', '');
    });
  }
  
  if (saveTaskBtn) {
    saveTaskBtn.addEventListener('click', () => {
      const newTask = taskInput ? (taskInput.value.trim() || 'получить диплом программиста') : 'получить диплом программиста';
      if (taskDisplay) taskDisplay.innerText = '✨ ' + newTask;
      localStorage.setItem(TASK_KEY, newTask);
      if (taskDisplay) taskDisplay.style.display = 'block';
      if (editTaskBtn) editTaskBtn.style.display = 'inline-block';
      if (taskEditArea) taskEditArea.style.display = 'none';
    });
  }
  
  if (cancelTaskBtn) {
    cancelTaskBtn.addEventListener('click', () => {
      if (taskDisplay) taskDisplay.style.display = 'block';
      if (editTaskBtn) editTaskBtn.style.display = 'inline-block';
      if (taskEditArea) taskEditArea.style.display = 'none';
    });
  }

  // ========== КНОПКА СОХРАНЕНИЯ ПРОФИЛЯ ==========
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
      // Сохраняем все текущие данные
      if (classSelect) localStorage.setItem('userClass', classSelect.value);
      if (goalDisplay) {
        const goalText = goalDisplay.innerText.replace('Моя цель: ', '');
        localStorage.setItem(GOAL_KEY, goalText);
      }
      if (taskDisplay) {
        const taskText = taskDisplay.innerText.replace('✨ ', '');
        localStorage.setItem(TASK_KEY, taskText);
      }
      // Интересы уже сохраняются автоматически при каждом изменении
      alert('✅ Профиль успешно сохранён!');
    });
  }

  // ========== ВЫХОД ИЗ АККАУНТА ==========
  const logoutBtn = document.getElementById('logoutAccountBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      const confirmLogout = confirm('Вы действительно хотите выйти из аккаунта? Все данные будут очищены.');
      if (confirmLogout) {
        // Очищаем все пользовательские данные
        localStorage.removeItem('userClass');
        localStorage.removeItem(GOAL_KEY);
        localStorage.removeItem(TASK_KEY);
        localStorage.removeItem(STORAGE_INTERESTS);
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        sessionStorage.clear();
        
        // Перенаправляем на главную страницу
        window.location.href = 'main.html?logout=success';
      }
    });
  }

  // ========== ИНИЦИАЛИЗАЦИЯ ==========
  renderTags();
})();