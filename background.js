chrome.action.onClicked.addListener((tab) => {
    chrome.cookies.getAll({}, (cookies) => {
        const csv = formatCookiesToCSV(cookies);
        downloadCSV(csv);
    });
});

function formatCookiesToCSV(cookies) {
    const header = "name,domain,expires,months_days_to_expire";
    const rows = cookies.map(cookie => {
        const name = cookie.name;
        const domain = cookie.domain;
        const expires = new Date(cookie.expirationDate * 1000).toISOString();
        const expireDate = new Date(cookie.expirationDate * 1000);
        const now = new Date();
        const timeDiff = expireDate - now;
        const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const months_days_to_expire = `${months} months, ${days} days`;

        return `${name},${domain},${expires},${months_days_to_expire}`;
    });

    return [header, ...rows].join("\n");
}

function downloadCSV(csv) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cookies.csv';
    a.click();
    URL.revokeObjectURL(url);
}
