const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

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

  const subMenuItems = mainMap.querySelectorAll(`.${subMenuClass} li`);
  subMenuItems.forEach((item) => {
    item.addEventListener('click', function(event) {
      event.stopPropagation();
      const subMenu = this.closest(`.${subMenuClass}`);
      subMenu.classList.remove('show');
      dropdownMenu.classList.remove('show');
    });
  });
}

toggleSubMenu(document.querySelector('.main-hst'), 'sub-menu-hst');
toggleSubMenu(document.querySelector('.main-j6'), 'sub-menu-j6');
toggleSubMenu(document.querySelector('.main-txl'), 'sub-menu-txl');