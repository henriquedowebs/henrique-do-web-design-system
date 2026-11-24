
    for (const group of document.querySelectorAll('[data-tabs]')) {
      const list = group.querySelector('[role="tablist"]');
      const tabs = [...list.querySelectorAll('[role="tab"]')];

      function selectTab(activeTab) {
        for (const tab of tabs) {
          const selected = tab === activeTab;
          tab.setAttribute('aria-selected', String(selected));
          tab.tabIndex = selected ? 0 : -1;
          document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
        }
      }

      for (const tab of tabs) {
        tab.addEventListener('click', () => selectTab(tab));
      }
      list.addEventListener('keydown', event => {
        const index = tabs.indexOf(event.target);
        if (index === -1) return;
        let next;
        switch (event.key) {
          case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
          case 'ArrowRight': next = (index + 1) % tabs.length; break;
          case 'Home': next = 0; break;
          case 'End': next = tabs.length - 1; break;
          default: return;
        }
        event.preventDefault();
        selectTab(tabs[next]);
        tabs[next].focus();
      });
    }
  