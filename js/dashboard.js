chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.from === 'popup') {
    switch (msg.action) {
      case 'alwaysDontViewPopup':
        dontViewPopup(sendResponse);
    }
  }
});

chrome.storage.local.get(['alwaysDontViewPopup']).then((result) => {
  if (result.alwaysDontViewPopup) {
    dontViewPopup();
  }
});

function dontViewPopup() {
  let timer = setInterval(() => {
    if (document.querySelector('[data-popup]')) {
      removeDOM();
      sendResponse({ success: 'success' });
      clearInterval(timer);
    }
  }, 500);

  function removeDOM() {
    [...document.querySelectorAll('[data-popup]')].forEach((element) => {
      element.remove();
    });
  }
}
