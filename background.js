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

function formatCookiesToCSV(cookies) {
    const header = "name,domain,expires,months_days_to_expire";
    const rows = cookies.map(cookie => {
        console.log('Processing cookie:', cookie);
        const name = cookie.name;
        const domain = cookie.domain;
        const expires = cookie.expirationDate ? new Date(cookie.expirationDate * 1000).toISOString() : 'Session';
        const expireDate = cookie.expirationDate ? new Date(cookie.expirationDate * 1000) : null;
        const now = new Date();
        const months_days_to_expire = expireDate ? getMonthsDaysToExpire(now, expireDate) : 'Session';

        return `${name},${domain},${expires},${months_days_to_expire}`;
    });

    return [header, ...rows].join("\n");
}

function getMonthsDaysToExpire(now, expireDate) {
    const timeDiff = expireDate - now;
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    return `${months} months and ${days} days`;
}
