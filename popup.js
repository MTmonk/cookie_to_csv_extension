document.getElementById('export').addEventListener('click', () => {
    console.log('Export button clicked');
    chrome.runtime.sendMessage({ action: 'export_cookies' });
});
