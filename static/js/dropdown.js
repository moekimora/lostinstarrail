(function () {
  const dropdownBtn = document.querySelector('.dropdown-btn');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  if (!dropdownBtn || !dropdownMenu) return;

  dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    const isInsideDropdown = dropdownBtn.contains(event.target) || dropdownMenu.contains(event.target);
    if (!isInsideDropdown) {
      dropdownMenu.classList.remove('show');
      // also close submenus for cleanliness
      document.querySelectorAll('.sub-menu-hst, .sub-menu-j6, .sub-menu-txl').forEach(sm => sm.classList.remove('show'));
    }
  });

  // Visual highlight for active floor
  function setActiveFloor(button) {
    document.querySelectorAll(".floor-btn").forEach(btn => btn.classList.remove("active"));
    if (button) button.classList.add("active");
  }

  // Default floor mapping for the child parent <li> classes (these are classes on items like "Storage Zone")
  const defaultFloors = {
    "hst-stz": ".hst-stz-f1",   // Storage Zone → F1
    "hst-suz": ".hst-suz-f2",   // Supply Zone → F2
    "hst-scz": ".hst-scz-f3",   // Seclusion Zone → F3
    "j6-ad": ".j6-ad-f1",       // Administrative District → F1
    "j6-owtg": ".j6-owtg-f2",   // Old Weapon Testing Ground → F2
    "j6-rt": ".j6-rt-f1",       // Rivet Town → F1
    "j6-rs": ".j6-rs-f2",       // Robot Settlement → F2
    "txl-c": ".txl-c-f1",       // Cloudford → F1
    "txl-dc": ".txl-dc-f2",     // Divination Commission → F2
    "txl-ac": ".txl-ac-f2",     // Alchemy Commission → F2
    "txl-tsp": ".txl-tsp-f1",   // Shackling Prison → F1
    "txl-s": ".txl-s-f1"        // Skysplitter → F1
  };

  // Hook floor button clicks to set active highlight (works even if starrailmap.js already handles map change)
  document.querySelectorAll('.floor-btn').forEach(btn => {
    btn.addEventListener('click', function (ev) {
      // mark this floor active visually
      setActiveFloor(this);

      // Close menus cleanly
      dropdownMenu.classList.remove('show');
      const parentSub = this.closest('.sub-menu-hst, .sub-menu-j6, .sub-menu-txl');
      if (parentSub) parentSub.classList.remove('show');

      // let other click handlers (e.g. starrailmap.js addClickListener) run as well
      // stopPropagation is intentionally not used (so other clicks can run)
    });
  });

  // Reuse the existing toggleSubMenu behaviour, but attach it to parents (main-hst, main-j6, main-txl)
  function toggleSubMenu(mainMap, subMenuClass) {
    if (!mainMap) return;

    mainMap.addEventListener('click', function (event) {
      // Toggle the submenu (same UX as before)
      const subMenu = this.querySelector(`.${subMenuClass}`);
      if (subMenu) subMenu.classList.toggle('show');

      // If the user clicked the parent entry itself (not an inner floor button), we want to trigger a default floor.
      // Find a clicked child li (the actual "zone" item) if present
      const clickedChildLi = event.target.closest('li'); // could be the zone li or a nested li
      if (clickedChildLi && clickedChildLi !== mainMap) {
        // If this click landed on a child li (like .hst-stz), and it wasn't on a floor button inside it,
        // then trigger its default if we have one.
        const childClasses = Array.from(clickedChildLi.classList || []);
        for (const cls of childClasses) {
          if (defaultFloors[cls]) {
            // if the click is directly on a floor button inside this li, do nothing (floor button handler will run)
            if (event.target.closest('button')) return;

            const defaultSelector = defaultFloors[cls];
            // prefer local query (inside dropdown) then fallback to global document
            const defaultBtn = dropdownMenu.querySelector(defaultSelector) || document.querySelector(defaultSelector);
            if (defaultBtn) {
              defaultBtn.click();      // triggers starrailmap's click listener (toggleMapVisibility)
              setActiveFloor(defaultBtn); // visually mark it
              // close menus
              dropdownMenu.classList.remove('show');
              subMenu.classList.remove('show');
            }
            return;
          }
        }
      }
    });

    // When a submenu item (li) or its buttons are clicked, close submenu and dropdown (existing behavior)
    const subMenuItems = mainMap.querySelectorAll(`.${subMenuClass} li, .${subMenuClass} button`);
    subMenuItems.forEach((item) => {
      item.addEventListener('click', function (event) {
        event.stopPropagation();
        const subMenu = this.closest(`.${subMenuClass}`);
        if (subMenu) subMenu.classList.remove('show');
        dropdownMenu.classList.remove('show');

        // If they clicked a floor button specifically, ensure the active highlight is set
        if (this.tagName.toLowerCase() === "button" && this.classList.contains('floor-btn')) {
          setActiveFloor(this);
        }
      });
    });
  }

  // Attach to the three main parent nodes
  toggleSubMenu(document.querySelector('.main-hst'), 'sub-menu-hst');
  toggleSubMenu(document.querySelector('.main-j6'), 'sub-menu-j6');
  toggleSubMenu(document.querySelector('.main-txl'), 'sub-menu-txl');

  // Additionally: handle direct clicks on the parent child <li>'s that have mappings
  // (this is a fallback if the above mainMap logic did not run due to structure)
  Object.keys(defaultFloors).forEach(parentClass => {
    const childEl = document.querySelector(`.${parentClass}`);
    if (!childEl) return;
    childEl.addEventListener('click', function (ev) {
      // If user clicked a floor button inside this element, let that handler run.
      if (ev.target.closest('button') && ev.target.closest('button').classList.contains('floor-btn')) return;

      const defaultSelector = defaultFloors[parentClass];
      const defaultBtn = dropdownMenu.querySelector(defaultSelector) || document.querySelector(defaultSelector);
      if (defaultBtn) {
        defaultBtn.click();
        setActiveFloor(defaultBtn);
        dropdownMenu.classList.remove('show');
        // collapse possible submenus
        document.querySelectorAll('.sub-menu-hst, .sub-menu-j6, .sub-menu-txl').forEach(sm => sm.classList.remove('show'));
      }
    });
  });

})();
