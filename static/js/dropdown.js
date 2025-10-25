(function () {
  // --------------------------
  // Dropdown / submenu logic
  // --------------------------
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

  // expose mapping globally so other IIFEs or modules can use it
  window.defaultFloors = defaultFloors;

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

  // add this helper inside the same IIFE (near your other helpers)
function closeAllSubmenus(except = null) {
  document.querySelectorAll('.sub-menu-hst, .sub-menu-j6, .sub-menu-txl').forEach(sm => {
    if (sm !== except) sm.classList.remove('show');
  });
}

// Replaced toggleSubMenu: ensures only one main submenu can be visible at a time
function toggleSubMenu(mainMap, subMenuClass) {
  if (!mainMap) return;

  mainMap.addEventListener('click', function (event) {
    // find the submenu for this parent
    const subMenu = this.querySelector(`.${subMenuClass}`);
    const isOpen = subMenu && subMenu.classList.contains('show');

    // close other submenus (but keep this one alone)
    closeAllSubmenus(subMenu);

    // toggle this submenu: if it was open -> close it, otherwise open it
    if (subMenu) {
      if (isOpen) {
        subMenu.classList.remove('show');
      } else {
        subMenu.classList.add('show');
      }
    }

    // Existing logic: if the user clicked a child <li> (a zone), trigger default floor
    const clickedChildLi = event.target.closest('li');
    if (clickedChildLi && clickedChildLi !== mainMap) {
      const childClasses = Array.from(clickedChildLi.classList || []);
      for (const cls of childClasses) {
        if (defaultFloors[cls]) {
          // if the click is directly on a floor button inside this li, do nothing (floor button handler will run)
          if (event.target.closest('button')) return;

          const defaultSelector = defaultFloors[cls];
          const defaultBtn = dropdownMenu.querySelector(defaultSelector) || document.querySelector(defaultSelector);
          if (defaultBtn) {
            defaultBtn.click();      // triggers starrail's click listener (toggleMapVisibility)
            setActiveFloor(defaultBtn); // visually mark it
            // close menus: keep other submenus closed already via closeAllSubmenus
            dropdownMenu.classList.remove('show');
            if (subMenu) subMenu.classList.remove('show');
          }
          return;
        }
      }
    }
  });

  // keep the existing subMenuItems behavior (closing submenu when clicking an inner item)
  const subMenuItems = mainMap.querySelectorAll(`.${subMenuClass} li, .${subMenuClass} button`);
  subMenuItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      event.stopPropagation();
      const subMenu = this.closest(`.${subMenuClass}`);
      if (subMenu) subMenu.classList.remove('show');
      dropdownMenu.classList.remove('show');

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

// Hover preview anchored above hovered item; works for mouse and touch
(function () {
  // overlay descriptors must exist (from starrailmap.js)
  // if not present, the preview code will still set up but will early-exit when needed
  const selectors = [
    '.hst-mcz', '.hst-bz', '.hst-stz-b1', '.hst-stz-f1', '.hst-stz-f2', '.hst-suz-f1',
    '.hst-suz-f2', '.hst-scz-f1', '.hst-scz-f2', '.hst-scz-f3', '.j6-ad-b1', '.j6-ad-f1', '.j6-osp',
    '.j6-bp', '.j6-sgrz', '.j6-cofe', '.j6-eh', '.j6-poc', '.j6-owtg-f1', '.j6-owtg-f2', '.j6-bt',
    '.j6-gm', '.j6-rt-f1', '.j6-rt-f2', '.j6-rs-f1', '.j6-rs-f2', '.txl-csh', '.txl-c-f1', '.txl-c-f2',
    '.txl-sn', '.txl-es', '.txl-aa', '.txl-dc-f1', '.txl-dc-f2', '.txl-arc', '.txl-fg', '.txl-ac-f1',
    '.txl-ac-f2', '.txl-sw', '.txl-tsp-f1', '.txl-tsp-b1', '.txl-tsp-b2', '.txl-tsp-b3', '.txl-tsp-b4',
    '.txl-s-f1', '.txl-s-f2', '.txl-s-f3'
  ];

  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

// Mobile: long-press to preview, short tap = normal select
(function addDropdownTouchPreviewLongPress() {
  const dropdown = document.querySelector('.dropdown-menu');
  if (!dropdown) return;
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (!isTouch) return;

  // helpers (reused logic from your code)
  function elementToSelectorIndex(el, selectorsList) {
    if (!el) return -1;
    // try matching element itself to selectors[]
    for (let i = 0; i < selectorsList.length; i++) {
      try { if (el.matches && el.matches(selectorsList[i])) return i; } catch (e) { }
    }
    // try class-based lookup via selectorToIndex if available
    const classes = Array.from(el.classList || []);
    for (const cls of classes) {
      try {
        if (typeof selectorToIndex === 'function') {
          const idx = selectorToIndex('.' + cls);
          if (idx !== -1) return idx;
        }
      } catch (e) {}
    }
    // climb up the tree a bit to find an element matching
    let parent = el.parentElement;
    while (parent && parent !== dropdown) {
      for (let i = 0; i < selectorsList.length; i++) {
        try { if (parent.matches && parent.matches(selectorsList[i])) return i; } catch (e) {}
      }
      const pcls = Array.from(parent.classList || []);
      for (const pc of pcls) {
        try {
          if (typeof selectorToIndex === 'function') {
            const idx = selectorToIndex('.' + pc);
            if (idx !== -1) return idx;
          }
        } catch (e) {}
      }
      parent = parent.parentElement;
    }
    return -1;
  }

  function findDefaultFloorIndexFromParent(el) {
    if (!window.defaultFloors || typeof selectorToIndex !== 'function') return -1;
    let node = el;
    while (node && node !== dropdown) {
      const classes = Array.from(node.classList || []);
      for (const cls of classes) {
        if (window.defaultFloors[cls]) {
          return selectorToIndex(window.defaultFloors[cls]);
        }
      }
      node = node.parentElement;
    }
    return -1;
  }

  const selectorsList = [
    '.hst-mcz', '.hst-bz', '.hst-stz-b1', '.hst-stz-f1', '.hst-stz-f2', '.hst-suz-f1',
    '.hst-suz-f2', '.hst-scz-f1', '.hst-scz-f2', '.hst-scz-f3', '.j6-ad-b1', '.j6-ad-f1', '.j6-osp',
    '.j6-bp', '.j6-sgrz', '.j6-cofe', '.j6-eh', '.j6-poc', '.j6-owtg-f1', '.j6-owtg-f2', '.j6-bt',
    '.j6-gm', '.j6-rt-f1', '.j6-rt-f2', '.j6-rs-f1', '.j6-rs-f2', '.txl-csh', '.txl-c-f1', '.txl-c-f2',
    '.txl-sn', '.txl-es', '.txl-aa', '.txl-dc-f1', '.txl-dc-f2', '.txl-arc', '.txl-fg', '.txl-ac-f1',
    '.txl-ac-f2', '.txl-sw', '.txl-tsp-f1', '.txl-tsp-b1', '.txl-tsp-b2', '.txl-tsp-b3', '.txl-tsp-b4',
    '.txl-s-f1', '.txl-s-f2', '.txl-s-f3'
  ];

  // timing config
  const LONG_PRESS_MS = 480;         // how long to hold to trigger preview
  const SUPPRESS_CLICK_MS = 400;     // how long to suppress the immediate click after long-press

  let longPressTimer = null;
  let longPressed = false;
  let activeAnchor = null;
  let suppressClick = false;

  // start potential long-press
  dropdown.addEventListener('touchstart', (ev) => {
    const t = ev.target;
    if (!t) return;

    // determine if this target is previewable
    let idx = elementToSelectorIndex(t, selectorsList);
    if (idx === -1) idx = findDefaultFloorIndexFromParent(t);
    if (idx === -1) {
      // not a previewable item — do nothing special (short tap will select)
      return;
    }

    // find best anchor element to position preview above
    activeAnchor = t.closest('button, .floor-btn') || t.closest('li') || t;

    // schedule long-press
    longPressed = false;
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    longPressTimer = setTimeout(() => {
      longPressed = true;
      suppressClick = true;
      try {
        showPreviewFor(idx, activeAnchor);
      } catch (e) { /* swallow: showPreviewFor may not exist yet */ }
    }, LONG_PRESS_MS);
  }, { passive: true });

  // finger up -> if we didn't long-press, allow normal tap behavior (do nothing)
  // if we did long-press, hide preview and suppress the immediate click that often follows touchend
  dropdown.addEventListener('touchend', (ev) => {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    if (longPressed) {
      // user performed a long-press: hide preview soon and suppress the click fired by touchend
      try { hidePreviewSoon(); } catch (e) {}
      // prevent the click that will normally follow this touch from selecting the map
      // we suppress it globally for a short window and intercept below in a capturing click handler
      setTimeout(() => { suppressClick = false; }, SUPPRESS_CLICK_MS);
    }
    longPressed = false;
    activeAnchor = null;
  }, { passive: false });

  dropdown.addEventListener('touchcancel', () => {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    longPressed = false;
    activeAnchor = null;
    suppressClick = false;
  }, { passive: true });

  // capture clicks and cancel them if they came immediately after a long-press
  document.addEventListener('click', (ev) => {
    if (!suppressClick) return;
    // if click is inside the dropdown, stop it (was a long-press)
    const clicked = ev.target.closest('li, button, .floor-btn, .dropdown-menu');
    if (clicked) {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      suppressClick = false;
    }
  }, true); // capture phase so we block other handlers early

})();

  // create preview element (reused)
  const preview = document.createElement('div');
  preview.className = 'map-preview';
  preview.style.position = 'fixed';
  preview.style.left = '0px';
  preview.style.top = '0px';
  preview.style.display = 'none';
  preview.style.zIndex = 999999;
  preview.style.pointerEvents = 'none';

  const img = document.createElement('img');
  img.alt = 'map preview';
  img.draggable = false;
  img.style.display = 'block';
  img.style.maxWidth = '360px';
  img.style.maxHeight = '240px';

  const label = document.createElement('div');
  label.className = 'label';
  label.style.display = 'none';
  label.style.padding = '6px 10px';
  label.style.fontWeight = '600';
  label.style.fontSize = '13px';

  preview.appendChild(img);
  preview.appendChild(label);
  document.body.appendChild(preview);

  let hideTimeout = null;
  let lastIndex = -1;
  const FADE_OUT_DELAY = 180; // ms
  const HIDE_DEBOUNCE = 160;  // ms

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

  // helper: find overlay index given a selector (like ".hst-stz-f1")
  function selectorToIndex(sel) {
    if (!sel) return -1;
    const norm = sel.startsWith('.') ? sel : '.' + sel;
    for (let i = 0; i < selectors.length; i++) {
      if (selectors[i] === norm) return i;
    }
    // fallback: try to find overlay whose name or other property matches (not used by default)
    return -1;
  }

  function showPreviewFor(index, anchorEl) {
    // index should correspond to window.overlays ordering (same as selectors[])
    const overlays = window.overlays || [];
    const desc = overlays[index];
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

      // make visible (flex so label + img layout nicely)
      preview.style.display = 'flex';
      preview.style.flexDirection = 'column';
      preview.style.alignItems = 'stretch';

      // position now using anchor's rect
      const anchorRect = anchorEl.getBoundingClientRect();
      requestAnimationFrame(() => {
        positionPreviewAbove(anchorRect);
        // trigger fade-in - uses a class hook, but we can do inline transition fallback
        preview.classList.add('show');
        preview.style.transition = 'opacity 180ms ease';
        preview.style.opacity = '1';
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
      preview.style.opacity = '0';
      // after fade-out, set display none
      setTimeout(() => {
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
    preview.style.opacity = '0';
    preview.style.display = 'none';
    lastIndex = -1;
  }

  // --- Attach parent-hover handlers for defaultFloors mapping ---
  // This shows the mapped default floor preview when hovering the parent <li>
  if (window.defaultFloors) {
    Object.keys(window.defaultFloors).forEach(parentClass => {
      const parentEl = document.querySelector(`.${parentClass}`);
      if (!parentEl) return;
      const defaultSelector = window.defaultFloors[parentClass];
      const idx = selectorToIndex(defaultSelector);
      if (idx === -1) return;

      parentEl.addEventListener('mouseenter', (ev) => {
        showPreviewFor(idx, parentEl);
      });
      parentEl.addEventListener('mouseleave', hidePreviewSoon);

      // also ensure floor buttons inside parent still anchor properly
      parentEl.querySelectorAll('.floor-btn').forEach(btn => {
        btn.addEventListener('mouseenter', (ev) => {
          // anchor to button for tighter positioning
          showPreviewFor(idx, btn);
        });
        btn.addEventListener('mouseleave', hidePreviewSoon);
      });
    });
  }

  // Attach handlers to each selector element (zone items and specific floor selectors)
  selectors.forEach((sel, idx) => {
    // there may be multiple matching elements — attach to each
    document.querySelectorAll(sel).forEach(el => {
      // anchor should be the element hovered; for floor buttons, anchor the button itself
      el.addEventListener('mouseenter', (ev) => {
        showPreviewFor(idx, ev.currentTarget);
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
  });

  // Also attach to standalone floor buttons (handles default floor buttons that might exist elsewhere)
  document.querySelectorAll('.floor-btn').forEach(btn => {
    btn.addEventListener('mouseenter', (ev) => {
      // attempt to find matching selector index by class name
      const classes = Array.from(btn.classList || []);
      let idx = -1;
      for (const cls of classes) {
        idx = selectorToIndex('.' + cls);
        if (idx !== -1) break;
      }
      if (idx !== -1) {
        showPreviewFor(idx, btn.closest('li') || btn);
      }
    });
    btn.addEventListener('mouseleave', hidePreviewSoon);
  });

  // Touch devices: tap to preview, tap outside to hide
  if (isTouch) {
    document.addEventListener('touchstart', (ev) => {
      const target = ev.target.closest(selectors.join(','));
      if (target) {
        const idx = selectors.findIndex(s => target.matches(s));
        if (idx !== -1) {
          ev.preventDefault();
          showPreviewFor(idx, target);
          return;
        }
      }

      // check floor-btn taps
      const floorBtn = ev.target.closest('.floor-btn');
      if (floorBtn) {
        // try to determine selector index
        const classes = Array.from(floorBtn.classList || []);
        let idx = -1;
        for (const cls of classes) {
          idx = selectorToIndex('.' + cls);
          if (idx !== -1) break;
        }
        if (idx !== -1) {
          ev.preventDefault();
          showPreviewFor(idx, floorBtn.closest('li') || floorBtn);
          return;
        }
      }

      // tap outside preview/dropdown: hide preview
      const dropdown = document.querySelector('.dropdown-menu');
      if (!dropdown || !dropdown.contains(ev.target)) {
        hidePreviewNow();
      }
    }, { passive: false });
  }

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
