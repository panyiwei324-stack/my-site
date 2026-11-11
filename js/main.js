// 告诉 CSS：JS 已运行（滚动淡入只在有 JS 时才启用）
document.documentElement.classList.add('js');

/* ---------- 1. 手机端汉堡菜单 ---------- */
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

function setMenu(open) {
  links.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
}

toggle.addEventListener('click', () => {
  setMenu(!links.classList.contains('is-open'));
});

// 点菜单里的链接后自动收起
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});

// 按 Esc 收起
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

/* ---------- 2. 滚动到可视区域时淡入 ---------- */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 只播放一次
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el, i) => {
    // 同一行的卡片依次错开出现
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- 3. 点击复制邮箱 ---------- */
const emailBtn = document.getElementById('copyEmail');
const hint = document.getElementById('copyHint');

emailBtn.addEventListener('click', async () => {
  const email = emailBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    hint.textContent = '已复制 ✓';
  } catch {
    // 有些环境（如直接双击打开的 file://）不允许写剪贴板，就退回到发邮件
    window.location.href = `mailto:${email}`;
    return;
  }
  setTimeout(() => { hint.textContent = '点击复制'; }, 2000);
});

/* ---------- 4. 页脚年份自动更新 ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
