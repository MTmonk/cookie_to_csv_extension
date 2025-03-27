document.getElementById('export').addEventListener('click', () => {
    console.log('Export button clicked');
    chrome.runtime.sendMessage({ action: 'export_cookies' }, (response) => {
        if (response && response.csv) {
            const csv = response.csv;
            console.log('CSV received:', csv);
            downloadCSV(csv);
        }
    });
});

function downloadCSV(csv) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    console.log('CSV Blob URL:', url);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cookies.csv';
    a.click();
    URL.revokeObjectURL(url);
    console.log('Download initiated');
}
