var saved = localStorage.getItem('sidebar-theme');
if (saved === 'dark' || saved === 'light') {
  document.documentElement.setAttribute('data-theme', saved);
}