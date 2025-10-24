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

// Hover preview anchored above hovered item; does NOT follow cursor
(function () {
  if ('ontouchstart' in window) return; // skip on touch devices

  const selectors = [
    '.hst-mcz', '.hst-bz', '.hst-stz-b1', '.hst-stz-f1', '.hst-stz-f2', '.hst-suz-f1',
    '.hst-suz-f2', '.hst-scz-f1', '.hst-scz-f2', '.hst-scz-f3', '.j6-ad-b1', '.j6-ad-f1', '.j6-osp',
    '.j6-bp', '.j6-sgrz', '.j6-cofe', '.j6-eh', '.j6-poc', '.j6-owtg-f1', '.j6-owtg-f2', '.j6-bt',
    '.j6-gm', '.j6-rt-f1', '.j6-rt-f2', '.j6-rs-f1', '.j6-rs-f2', '.txl-csh', '.txl-c-f1', '.txl-c-f2',
    '.txl-sn', '.txl-es', '.txl-aa', '.txl-dc-f1', '.txl-dc-f2', '.txl-arc', '.txl-fg', '.txl-ac-f1',
    '.txl-ac-f2', '.txl-sw', '.txl-tsp-f1', '.txl-tsp-b1', '.txl-tsp-b2', '.txl-tsp-b3', '.txl-tsp-b4',
    '.txl-s-f1', '.txl-s-f2', '.txl-s-f3'
  ];

  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (ev) => {
      const target = ev.target.closest(selectors.join(','));
      if (!target) {
        preview.classList.remove('show');
        preview.style.display = 'none';
        return;
      }
      const idx = selectors.findIndex(s => target.matches(s));
      if (idx !== -1) {
        ev.preventDefault();
        showPreviewFor(idx, target);
      }
    }, { passive: false });
  }


  // create preview element (reused)
  const preview = document.createElement('div');
  preview.className = 'map-preview';
  preview.style.left = '0px';
  preview.style.top = '0px';
  preview.style.display = 'none';

  const img = document.createElement('img');
  img.alt = 'map preview';
  img.draggable = false;

  const label = document.createElement('div');
  label.className = 'label';
  label.style.display = 'none';

  preview.appendChild(img);
  preview.appendChild(label);
  document.body.appendChild(preview);

  let hideTimeout = null;
  let lastIndex = -1;
  const FADE_OUT_DELAY = 180; // ms before actually hiding display after removing .show
  const HIDE_DEBOUNCE = 160; // ms delay before starting fade-out (prevents flicker)

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function positionPreviewAbove(anchorRect) {
    // ensure preview has its natural size before positioning
    const previewW = preview.offsetWidth || Math.min(360, window.innerWidth - 24);
    const previewH = preview.offsetHeight || 200;

    // center horizontally over the anchor
    let left = Math.round(anchorRect.left + (anchorRect.width / 2) - (previewW / 2));
    // place above the anchor with an 8px gap
    let top = Math.round(anchorRect.top - previewH - 8);

    // if not enough space above, place below the anchor with small gap
    if (top < 8) {
      top = Math.round(anchorRect.bottom + 8);
    }

    // clamp to viewport
    const margin = 8;
    left = clamp(left, margin, window.innerWidth - previewW - margin);
    top = clamp(top, margin, window.innerHeight - previewH - margin);

    preview.style.left = left + 'px';
    preview.style.top = top + 'px';
  }

  function showPreviewFor(index, anchorEl) {
    const desc = window.overlays[index];
    if (!desc) return;
    lastIndex = index;

    // cancel any pending hide
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    // preload image if needed
    if (!desc.preloaded) {
      const p = new Image();
      p.src = desc.imageUrl;
      desc.preloaded = true;
    }

    // set image; wait for load to compute sizes and position
    img.onload = function () {
      label.textContent = desc.name || '';
      label.style.display = desc.name ? 'block' : 'none';

      // make visible
      preview.style.display = 'flex';

      // position now using anchor's rect
      const anchorRect = anchorEl.getBoundingClientRect();
      // ensure layout updated before reading preview size
      requestAnimationFrame(() => {
        positionPreviewAbove(anchorRect);
        // trigger fade-in
        preview.classList.add('show');
      });
    };

    img.src = desc.imageUrl;
    // if cached, call onload handler directly
    if (img.complete && img.naturalWidth) {
      img.onload();
    }
  }

  function hidePreviewSoon() {
    // don't hide immediately; debounce to avoid flicker when moving between items
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      preview.classList.remove('show');
      // after fade-out, set display none
      setTimeout(() => {
        // ensure no new show happened in the meantime
        if (!preview.classList.contains('show')) {
          preview.style.display = 'none';
        }
      }, FADE_OUT_DELAY);
      hideTimeout = null;
      lastIndex = -1;
    }, HIDE_DEBOUNCE);
  }

  function hidePreviewNow() {
    if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
    preview.classList.remove('show');
    preview.style.display = 'none';
    lastIndex = -1;
  }

  // Attach handlers to each selector element
  selectors.forEach((sel, idx) => {
    const el = document.querySelector(sel);
    if (!el) return;

    // anchor should be the element hovered; for floor buttons, anchor the button itself
    el.addEventListener('mouseenter', (ev) => {
      // anchor element could be the specific element hovered (ev.currentTarget)
      const anchor = ev.currentTarget;
      showPreviewFor(idx, anchor);
    });

    // handle floor-btns or button children inside the item — anchor to that button
    el.querySelectorAll('button, .floor-btn').forEach(btn => {
      btn.addEventListener('mouseenter', (ev) => {
        // anchor to the button and find correct overlay index: same idx
        showPreviewFor(idx, ev.currentTarget);
      });
      btn.addEventListener('mouseleave', hidePreviewSoon);
    });

    el.addEventListener('mouseleave', hidePreviewSoon);
  });

  // hide immediately when dropdown is closed by outside click
  document.addEventListener('click', (ev) => {
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown && dropdown.contains(ev.target)) return;
    hidePreviewNow();
  });

  // hide on scroll/resize
  window.addEventListener('scroll', hidePreviewNow, { passive: true });
  window.addEventListener('resize', hidePreviewNow, { passive: true });

})();
