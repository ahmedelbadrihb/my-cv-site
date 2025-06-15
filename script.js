// === العناصر ===
const themeBtn = document.getElementById('themeToggle');
const langBtn = document.getElementById('langToggle');

// === الحالة المحفوظة ===
let currentLang = localStorage.getItem('cvLang') || 'en';
let isLight = localStorage.getItem('cvTheme') === 'light';

// === تحميل الإعدادات عند فتح الصفحة ===
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(isLight);
  applyLanguage(currentLang);
  animateSectionsOnLoad();
  observeScrollAnimations();
  addButtonClickEffects();
});

// === التبديل بين الثيمات ===
themeBtn.addEventListener('click', () => {
  isLight = !isLight;
  applyTheme(isLight);
  localStorage.setItem('cvTheme', isLight ? 'light' : 'dark');
});

// === التبديل بين اللغات ===
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  applyLanguage(currentLang);
  localStorage.setItem('cvLang', currentLang);
});

// === تطبيق الثيم ===
function applyTheme(light) {
  document.body.classList.toggle('light', light);
  themeBtn.textContent = light ? '☀️' : '🌙';
}

// === تطبيق اللغة ===
function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.body.setAttribute('lang', lang); // ⬅️ ضروري للـ CSS
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  langBtn.textContent = lang === 'en' ? 'AR' : 'EN';
  updateLanguageContent(lang);
}

// === تحديث النصوص حسب اللغة ===
function updateLanguageContent(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
}

// === أنميشن دخول السكاشن عند التحميل ===
function animateSectionsOnLoad() {
  document.querySelectorAll('section').forEach((section, i) => {
    section.style.animationDelay = `${i * 0.2}s`;
    section.classList.add('ai-fade');
  });
}

// === أنميشن عند التمرير ===
function observeScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ai-show');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.ai-fade').forEach(section => {
    observer.observe(section);
  });
}

// === تأثير بصري على الأزرار عند الضغط ===
function addButtonClickEffects() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('clicked');
      setTimeout(() => button.classList.remove('clicked'), 300);
    });
  });
}
