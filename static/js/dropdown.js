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

const mainHST = document.querySelector('.main-hst');
mainHST.addEventListener('click', function() {
  const subMenuHST = this.querySelector('.sub-menu-hst');
  subMenuHST.classList.toggle('show');
});

const mainJ6 = document.querySelector('.main-j6');
mainJ6.addEventListener('click', function() {
  const subMenuJ6 = this.querySelector('.sub-menu-j6');
  subMenuJ6.classList.toggle('show');
});

const mainTXL = document.querySelector('.main-txl');
mainTXL.addEventListener('click', function() {
  const subMenuTXL = this.querySelector('.sub-menu-txl');
  subMenuTXL.classList.toggle('show');
});