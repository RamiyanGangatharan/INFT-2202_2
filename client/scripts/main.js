"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
const contentLoaders_1 = require("./contentLoaders");
const carousel_1 = require("./carousel");
const authenticator_1 = require("./authenticator");
document.addEventListener('DOMContentLoaded', () => {
    (0, contentLoaders_1.loadHeader)();
    (0, contentLoaders_1.loadFooter)();
    (0, carousel_1.initializeCarousel)();
    (0, contentLoaders_1.fetchFactOfTheDay)();
    (0, authenticator_1.CheckLogin)();
    switch (document.title) {
        case 'Team':
            displayModal();
            break;
        case 'Register':
            (0, authenticator_1.displayRegisterPage)();
            break;
        case 'Login':
            (0, authenticator_1.displayLoginPage)();
            break;
    }
    (0, events_1.fetchEventsData)();
});
//# sourceMappingURL=main.js.map