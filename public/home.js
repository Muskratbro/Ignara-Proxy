document.addEventListener('DOMContentLoaded', () => {

  const LAUNCHER_URL = 'launcher.html';

  /* -------------------------
     Utilities
  ------------------------- */

  function smoothScroll(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function openSameTab(url) {
    window.location.href = url;
  }

  function openNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /* -------------------------
     Launch Modes (Safe)
  ------------------------- */

  function launchStandard() {
    openSameTab(LAUNCHER_URL);
  }

  function launchNewTab() {
    openNewTab(LAUNCHER_URL);
  }

  function launchEmbedded() {
    openSameTab('embedded.html');
  }

  function launchBlankWrapper() {
    const win = window.open('about:blank', '_blank');
    if (!win) return;

    win.document.open();
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ignara Games</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html,body {
            margin:0;
            padding:0;
            height:100%;
            background:#000;
          }
          iframe {
            width:100%;
            height:100%;
            border:none;
          }
        </style>
      </head>
      <body>
        <iframe src="${LAUNCHER_URL}" allowfullscreen></iframe>
      </body>
      </html>
    `);
    win.document.close();
  }

  function launchBlobWrapper() {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ignara Games</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html,body {
            margin:0;
            padding:0;
            height:100%;
          }
          iframe {
            width:100%;
            height:100%;
            border:none;
          }
        </style>
      </head>
      <body>
        <iframe src="${LAUNCHER_URL}"></iframe>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const blobURL = URL.createObjectURL(blob);
    openNewTab(blobURL);
  }

  function launchMinimal() {
    openSameTab('minimal.html');
  }

  function launchLegacy() {
    openSameTab('legacy.html');
  }

  /* -------------------------
     Dispatcher
  ------------------------- */

  function launchMode(mode) {
    switch (mode) {
      case 'standard': launchStandard(); break;
      case 'newtab': launchNewTab(); break;
      case 'embedded': launchEmbedded(); break;
      case 'blank': launchBlankWrapper(); break;
      case 'blob': launchBlobWrapper(); break;
      case 'minimal': launchMinimal(); break;
      case 'legacy': launchLegacy(); break;
      default: launchStandard();
    }
  }

  /* -------------------------
     Button Wiring
  ------------------------- */

  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      launchMode(btn.dataset.mode);
    });
  });

  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      smoothScroll(btn.dataset.scroll);
    });
  });

});
