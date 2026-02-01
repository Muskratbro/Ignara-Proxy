document.addEventListener('DOMContentLoaded', () => {
  // ----------- Elements -----------
  const iframe = document.getElementById('contentEmbed');
  const navLinks = document.querySelectorAll('header nav a[data-url]');
  const panicButton = document.getElementById('panicButton');
  const overlay = document.getElementById('overlay');
  const overlayMessage = document.getElementById('overlayMessage');
  const overlayClose = document.getElementById('overlayCloseButton');

  // ----------- Iframe Navigation -----------
  function loadInIframe(url) {
    if (!iframe) return;
    iframe.src = url;
    iframe.style.display = 'block';
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('data-url');
      loadInIframe(url);
    });
  });

  // ----------- Panic Mode -----------
  function panicMode() {
    // Pause and mute all media in the iframe
    if (iframe && iframe.contentWindow) {
      try {
        const mediaElements = iframe.contentWindow.document.querySelectorAll('video, audio');
        mediaElements.forEach(media => {
          media.pause();
          media.muted = true;
        });
      } catch (err) {
        // Cross-origin iframe: cannot access content
      }
    }

    // Attempt to redirect top-level page
    try {
      top.location.href = 'https://classroom.google.com/';
    } catch (err) {
      // Fallback: hide iframe and show "Safe Mode"
      if (iframe) {
        iframe.style.display = 'none';
        showSafeModeFallback();
      }
    }
  }

  // Show a fallback safe mode message
  function showSafeModeFallback() {
    let safeDiv = document.getElementById('safeModeFallback');
    if (!safeDiv) {
      safeDiv = document.createElement('div');
      safeDiv.id = 'safeModeFallback';
      safeDiv.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        display: flex; justify-content: center; align-items: center;
        background-color: #121212; color: #ffcc00;
        font-size: 2rem; font-weight: bold; z-index: 999;
      `;
      safeDiv.textContent = 'Safe Mode Activated';
      if (iframe && iframe.parentElement) {
        iframe.parentElement.appendChild(safeDiv);
      }
    }
    safeDiv.style.display = 'flex';
  }

  // ----------- Panic Button & Keyboard Shortcut -----------
  if (panicButton) {
    panicButton.addEventListener('click', panicMode);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
      panicMode();
    }
  });

  // ----------- Overlay System -----------
  function showOverlay(message) {
    if (!overlay || !overlayMessage) return;
    overlayMessage.textContent = message;
    overlay.classList.add('show');
  }

  function hideOverlay() {
    if (!overlay) return;
    overlay.classList.remove('show');
  }

  if (overlayClose) {
    overlayClose.addEventListener('click', hideOverlay);
  }

  // Example: show welcome overlay on load (optional)
  // showOverlay('Welcome to Ignara Games!');
});
