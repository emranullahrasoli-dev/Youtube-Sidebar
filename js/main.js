var sidebar = document.getElementById('sidebar');
var lightBtn = document.getElementById('lightBtn');
var darkBtn = document.getElementById('darkBtn');

function applyTheme(theme) {
  var dark = theme === 'dark';

  sidebar.classList.toggle('dark', dark);
  sidebar.classList.toggle('light', !dark);
  document.body.classList.toggle('dark-bg', dark);
  lightBtn.classList.toggle('active-theme', !dark);
  darkBtn.classList.toggle('active-theme', dark);
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sidebar-theme', theme);
}

function setLight() {
  applyTheme('light');
}

function setDark() {
  applyTheme('dark');
}

var stored = localStorage.getItem('sidebar-theme');
if (stored === 'dark' || stored === 'light') {
  applyTheme(stored);
}

lightBtn.addEventListener('click', setLight);
darkBtn.addEventListener('click', setDark);

document.getElementById('menuToggle').addEventListener('click', function () {
  sidebar.classList.toggle('collapsed');
});

var items = document.querySelectorAll('.menu-item');
for (var i = 0; i < items.length; i++) {
  var item = items[i];
  var label = item.querySelector('span:not(.material-icons-outlined)');
  if (label) {
    item.dataset.tooltip = label.textContent.trim();
  }
  item.addEventListener('click', function () {
    var all = document.querySelectorAll('.menu-item');
    for (var j = 0; j < all.length; j++) {
      all[j].classList.remove('active');
    }
    this.classList.add('active');
  });
}

var profileMenuBtn = document.getElementById('profileMenuBtn');
var profileDropdown = document.getElementById('profileDropdown');
var profile = document.querySelector('.profile');
var mainAvatar = profile.querySelector(':scope > .avatar');

function setProfileMenuOpen(open) {
  profileDropdown.classList.toggle('open', open);
  profileDropdown.setAttribute('aria-hidden', open ? 'false' : 'true');
  profileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  sidebar.classList.toggle('profile-menu-open', open);
}

function toggleProfileMenu(e) {
  e.stopPropagation();
  setProfileMenuOpen(!profileDropdown.classList.contains('open'));
}

profileMenuBtn.addEventListener('click', toggleProfileMenu);

mainAvatar.addEventListener('click', function (e) {
  if (!sidebar.classList.contains('collapsed')) {
    return;
  }
  toggleProfileMenu(e);
});

document.addEventListener('click', function (e) {
  if (!profileDropdown.classList.contains('open')) {
    return;
  }
  var inside = profileDropdown.contains(e.target);
  var onBtn = profileMenuBtn.contains(e.target);
  var onAvatar = sidebar.classList.contains('collapsed') && mainAvatar.contains(e.target);
  if (!inside && !onBtn && !onAvatar) {
    setProfileMenuOpen(false);
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    setProfileMenuOpen(false);
  }
});

var dropdownItems = profileDropdown.querySelectorAll('.dropdown-item');
for (var k = 0; k < dropdownItems.length; k++) {
  dropdownItems[k].addEventListener('click', function () {
    setProfileMenuOpen(false);
  });
}