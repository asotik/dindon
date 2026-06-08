// Данные достижений по категориям - УВЕЛИЧЕНО КОЛИЧЕСТВО для заполнения места
const achievementsData = {
  all: [
    { name: 'Первый шаг в карьере', desc: 'Завершите первый квест', unlocked: true, icon: '🎯' },
    { name: 'Учеба', desc: 'Пройдите 5 обучающих уроков', unlocked: true, icon: '📚' },
    { name: 'Карьерный путь', desc: 'Постройте карьерную карту', unlocked: false, icon: '🗺️' },
    { name: 'Дипломы', desc: 'Получите 3 диплома', unlocked: false, icon: '🎓' },
    { name: 'Колледж', desc: 'Завершите программу колледжа', unlocked: false, icon: '🏛️' },
    { name: 'IT Мастер', desc: 'Пройдите курс по программированию', unlocked: false, icon: '💻' },
    { name: 'Дизайнер', desc: 'Создайте 3 дизайн-проекта', unlocked: false, icon: '🎨' },
    { name: 'Медицина', desc: 'Пройдите медицинский модуль', unlocked: false, icon: '🏥' },
    { name: 'Лидер', desc: 'Станьте лидером группы', unlocked: false, icon: '👑' },
    { name: 'Коммуникация', desc: 'Участвуйте в 10 дискуссиях', unlocked: false, icon: '💬' },
    { name: 'Тимлид', desc: 'Управляйте командой из 5 человек', unlocked: false, icon: '👥' },
    { name: 'Инноватор', desc: 'Предложите новую идею', unlocked: false, icon: '💡' }
  ],
  study: [
    { name: 'Отличник', desc: 'Получите 10 пятерок', unlocked: false, icon: '⭐' },
    { name: 'Наука', desc: 'Участвуйте в научном проекте', unlocked: false, icon: '🔬' },
    { name: 'Библиотекарь', desc: 'Прочитайте 10 книг', unlocked: false, icon: '📖' },
    { name: 'Полиглот', desc: 'Выучите иностранный язык', unlocked: false, icon: '🗣️' },
    { name: 'Математик', desc: 'Решите 100 задач', unlocked: false, icon: '📐' },
    { name: 'Историк', desc: 'Изучите историю профессий', unlocked: false, icon: '🏛️' }
  ],
  career: [
    { name: 'Профориентация', desc: 'Пройдите тест на профессию', unlocked: true, icon: '🧭' },
    { name: 'Стажер', desc: 'Пройдите стажировку', unlocked: false, icon: '👔' },
    { name: 'Собеседование', desc: 'Успешно пройдите собеседование', unlocked: false, icon: '🤝' },
    { name: 'Резюме', desc: 'Составьте профессиональное резюме', unlocked: false, icon: '📄' },
    { name: 'Нетворкинг', desc: 'Посетите 5 профессиональных мероприятий', unlocked: false, icon: '🤝' },
    { name: 'Наставник', desc: 'Станьте наставником для новичка', unlocked: false, icon: '👨‍🏫' },
    { name: 'Специалист', desc: 'Получите повышение', unlocked: false, icon: '📈' }
  ],
  diplomas: [
    { name: 'Школьный аттестат', desc: 'Завершите 11 классов', unlocked: false, icon: '📜' },
    { name: 'Курсовая работа', desc: 'Защитите курсовую', unlocked: false, icon: '📄' },
    { name: 'Дипломная работа', desc: 'Защитите диплом', unlocked: false, icon: '🎓' },
    { name: 'Сертификат', desc: 'Получите сертификат о прохождении курса', unlocked: false, icon: '🏅' },
    { name: 'Профессиональный диплом', desc: 'Получите диплом о профпереподготовке', unlocked: false, icon: '📜' },
    { name: 'Международный сертификат', desc: 'Получите международный сертификат', unlocked: false, icon: '🌍' }
  ],
  college: [
    { name: 'Поступление', desc: 'Подайте заявление в колледж', unlocked: false, icon: '📝' },
    { name: 'Стипендия', desc: 'Получите повышенную стипендию', unlocked: false, icon: '💰' },
    { name: 'Практика', desc: 'Пройдите производственную практику', unlocked: false, icon: '🔧' },
    { name: 'Колледж с отличием', desc: 'Закончите колледж с красным дипломом', unlocked: false, icon: '🏆' },
    { name: 'Научная работа', desc: 'Опубликуйте научную статью', unlocked: false, icon: '📝' },
    { name: 'Студенческий совет', desc: 'Станьте членом студсовета', unlocked: false, icon: '🗳️' }
  ]
};

let currentCategory = 'all';
let totalAchievements = 0;
let unlockedCount = 0;

// Подсчёт общего количества и открытых достижений
function countAchievements() {
  totalAchievements = 0;
  unlockedCount = 0;
  
  Object.values(achievementsData).forEach(category => {
    if (Array.isArray(category)) {
      category.forEach(ach => {
        totalAchievements++;
        if (ach.unlocked) unlockedCount++;
      });
    }
  });
  
  // Обновляем прогресс-бар
  const percent = (unlockedCount / totalAchievements) * 100;
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  if (progressFill) progressFill.style.width = percent + '%';
  if (progressText) progressText.innerHTML = `Открыто: ${unlockedCount} из ${totalAchievements}`;
}

// Рендер достижений по выбранной категории
function renderAchievements() {
  const achievementsList = document.getElementById('achievementsList');
  if (!achievementsList) return;
  
  let achievements = [];
  
  if (currentCategory === 'all') {
    Object.values(achievementsData).forEach(category => {
      if (Array.isArray(category)) {
        achievements = achievements.concat(category);
      }
    });
  } else {
    achievements = achievementsData[currentCategory] || [];
  }
  
  achievementsList.innerHTML = '';
  
  achievements.forEach(ach => {
    const item = document.createElement('div');
    item.className = `achievement-item ${ach.unlocked ? 'unlocked' : 'locked'}`;
    item.innerHTML = `
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-info">
        <div class="achievement-name">${ach.name}</div>
        <div class="achievement-desc">${ach.desc}</div>
      </div>
      <div class="achievement-status">${ach.unlocked ? '✅ Открыто' : '🔒 Закрыто'}</div>
    `;
    achievementsList.appendChild(item);
  });
}

// Переключение категорий
function setupCategoryButtons() {
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderAchievements();
    });
  });
}

// Кнопка "Начать игру"
function setupStartGame() {
  const startBtn = document.getElementById('startGameBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      alert('Игра начинается! Выполняйте задания, получайте достижения и продвигайтесь по карьерному пути!');
    });
  }
}

// Инициализация
function init() {
  countAchievements();
  renderAchievements();
  setupCategoryButtons();
  setupStartGame();
}

// Запуск после загрузки страницы
document.addEventListener('DOMContentLoaded', init);