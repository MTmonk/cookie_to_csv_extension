chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'export_cookies') {
        console.log('Export cookies action received');
        chrome.cookies.getAll({}, (cookies) => {
            console.log('Cookies retrieved:', cookies);
            const csv = formatCookiesToCSV(cookies);
            console.log('CSV formatted:', csv);
            sendResponse({ csv });
        });
        return true; // Will respond asynchronously
    }
});

function formatCookiesToCSV
