const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Toggle dropdown menu when the dropdown button is clicked
dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// Close dropdown menu when clicking outside of it
document.addEventListener('click', (event) => {
  const isInsideDropdown = dropdownBtn.contains(event.target) || dropdownMenu.contains(event.target);
  if (!isInsideDropdown) {
    dropdownMenu.classList.remove('show');
  }
});

function toggleSubMenu(mainMap, subMenuClass) {
  mainMap.addEventListener('click', function() {
    const subMenu = this.querySelector(`.${subMenuClass}`);
    subMenu.classList.toggle('show');
  });
}

toggleSubMenu(document.querySelector('.main-hst'), 'sub-menu-hst');
toggleSubMenu(document.querySelector('.main-j6'), 'sub-menu-j6');
toggleSubMenu(document.querySelector('.main-txl'), 'sub-menu-txl');
toggleSubMenu(document.querySelector('.main-p'), 'sub-menu-p');