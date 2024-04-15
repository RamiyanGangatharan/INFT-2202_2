"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFactOfTheDay = exports.loadFooter = exports.loadHeader = void 0;
function loadHeader() {
    fetch('/views/components/header.html')
        .then(response => response.text())
        .then(html => {
        let headerElement;
        headerElement = document.getElementById('site-header');
        if (headerElement !== null) {
            headerElement.innerHTML = html;
        }
        else {
            console.warn('The header element was not found in the document.');
        }
    })
        .catch(error => {
        console.warn('Error loading the header:', error);
    });
}
exports.loadHeader = loadHeader;
function loadFooter() {
    fetch('/views/components/footer.html')
        .then(response => response.text())
        .then(html => {
        let footerElement;
        footerElement = document.getElementById('site-footer');
        if (footerElement !== null) {
            footerElement.innerHTML = html;
        }
        else {
            console.warn('The footer element was not found in the document.');
        }
    })
        .catch(error => {
        console.warn('Error loading the footer:', error);
    });
}
exports.loadFooter = loadFooter;
function fetchFactOfTheDay() {
    const limit = 1;
    const apiKey = 'NhKexKzfF0TmdyXL/Jj/0Q==MMvyNrvqLLVQWkS2';
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/facts?limit=${limit}`,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            const facts = result;
            if (facts.length > 0) {
                $('#fact-of-the-day').text(facts[0].fact);
            }
            else {
                console.error('Unexpected result structure:', result);
            }
        },
        error: function (jqXHR) {
            console.error('Error fetching fact of the day:', jqXHR.responseText || 'Unknown error');
        }
    });
}
exports.fetchFactOfTheDay = fetchFactOfTheDay;
//# sourceMappingURL=contentLoaders.js.map