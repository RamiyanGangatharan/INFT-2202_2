"use strict";
(function () {
    function Start() {
        console.log("App Started!");
        loadHeader();
        loadFooter();
        initializeCarousel();
        fetchFactOfTheDay();
        switch (document.title) {
            case "Team":
                displayModal();
                break;
            case "Register":
                displayRegisterPage();
                break;
            case "Login":
                displayLoginPage();
                break;
        }
    }
    window.addEventListener("load", Start);
    function initializeCarousel() {
        let index = 0;
        const slides = document.querySelectorAll(".carousel-images img");
        const descriptions = document.querySelectorAll(".carousel-descriptions .description");
        if (slides.length === 0 || descriptions.length === 0) {
            return;
        }
        function showSlide(n) {
            if (n >= slides.length)
                index = 0;
            if (n < 0)
                index = slides.length - 1;
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                descriptions[i].style.display = "none";
            }
            slides[index].style.display = "block";
            descriptions[index].style.display = "block";
        }
        function moveSlide(n) {
            showSlide(index += n);
        }
        showSlide(index);
        setInterval(() => {
            moveSlide(1);
        }, 5000);
    }
    document.addEventListener('DOMContentLoaded', function () {
        const projectsContainer = document.getElementById('projects-container');
        const loadMoreButton = document.getElementById('loadMore');
        let projects;
        projects = [{
                title: 'Project One',
                description: 'A brief description of Project One.',
                imageUrl: "../../Images/NY-SKYLINE.webp"
            },
            {
                title: 'Project Two',
                description: 'A brief description of Project Two.',
                imageUrl: "../../Images/YYZ-SKYLINE.webp"
            },
            {
                title: 'Project Three',
                description: 'A brief description of Project Three.',
                imageUrl: "../../Images/england_skyline.jpg"
            },
            {
                title: 'Project Four',
                description: 'A brief description of Project Four.',
                imageUrl: "../../Images/PWC_OFFICE.webp"
            },
            {
                title: 'Project Five',
                description: 'A brief description of Project Five.',
                imageUrl: "../../Images/cup-team-photo-2023-2.png"
            },
            {
                title: 'Project Six',
                description: 'A brief description of Project Six.',
                imageUrl: "../../Images/CVPRW2023_EventVision_group_picture.jpg"
            }
        ];
        function createProjectCard(project) {
            let card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';
            card.innerHTML = `
            <div class="card h-100">
                <img style="margin-top: 15px; height: 250px" 
                    src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        `;
            return card;
        }
        function loadProjects(numProjects = 3) {
            let projectsToLoad = projects.splice(0, numProjects);
            projectsToLoad.forEach((project) => {
                projectsContainer.appendChild(createProjectCard(project));
            });
            if (projects.length === 0) {
                if (loadMoreButton instanceof HTMLButtonElement) {
                    loadMoreButton.disabled = true;
                }
            }
        }
        loadProjects();
        loadMoreButton.addEventListener('click', function () {
            loadProjects();
        });
    });
    window.addEventListener("load", Start);
    function displayModal() {
        const openRamiyan = document.getElementById("open-ramiyan");
        const openJoy = document.getElementById("open-joy");
        const modalRamiyan = document.getElementById('ramiyan-modal');
        const modalJoy = document.getElementById("joy-modal");
        const closeRamiyan = document.getElementById("closeRamiyan");
        const closeJoy = document.getElementById("closeJoy");
        if (openRamiyan instanceof HTMLElement) {
            openRamiyan.addEventListener("click", () => {
                modalRamiyan?.classList.add("show");
            });
        }
        if (openJoy instanceof HTMLElement) {
            openJoy.addEventListener("click", () => {
                modalJoy?.classList.add("show");
            });
        }
        if (closeRamiyan instanceof HTMLElement) {
            closeRamiyan.addEventListener("click", () => {
                modalRamiyan?.classList.remove("show");
            });
        }
        if (closeJoy instanceof HTMLElement) {
            closeJoy.addEventListener("click", () => {
                modalJoy?.classList.remove("show");
            });
        }
    }
    function AJAX_REQUEST(method, url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (typeof callback == "function") {
                    callback(xhr.responseText);
                }
                else {
                    console.error("ERROR: CALLBACK NOT A FUNCTION");
                }
            }
        });
        xhr.send();
    }
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
    document.addEventListener('DOMContentLoaded', function () {
        loadHeader();
        loadFooter();
    });
    document.addEventListener('DOMContentLoaded', function () {
        function processEventsData(responseText) {
            const data = JSON.parse(responseText);
            const events = data.event;
            const eventsContainer = document.getElementById('events-container');
            if (eventsContainer) {
                eventsContainer.innerHTML = '';
                events.forEach((event) => {
                    let eventElement = document.createElement('div');
                    eventElement.className = 'col-md-4 mb-4';
                    eventElement.innerHTML = `
            <div class="card">
                <img src="${event.imageUrl}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
            </div>`;
                    eventsContainer.appendChild(eventElement);
                });
            }
            else {
                console.warn('The events container element was not found in the document.');
            }
        }
        AJAX_REQUEST('GET', '../../data/events.json', processEventsData);
    });
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
    function CheckLogin() {
        if (localStorage.length > 0) {
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                <i class="fas fa-sign-out-alt"></i> Logout</a>`);
            let keys = Object.keys(localStorage);
            for (const key of keys) {
                if (key === "users") {
                    let userData = localStorage.getItem(key);
                    if (userData !== null) {
                        let usersName = userData.split(",");
                        $("#name").html(`<h1 id="name">Welcome ${usersName[0]} to The Harmony Hub</h1>`);
                    }
                }
            }
        }
        $("#logout").on("click", function () {
            localStorage.clear();
            location.href = "login.html";
        });
    }
    function RegisterFormValidation() {
        ValidateField("#firstName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First Name.");
        ValidateField("#lastName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid Last Name.");
        ValidateField("#address", /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":?!/]+$/, "Please enter a valid Address.");
        ValidateField("#phoneNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Contact Number.");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address!");
    }
    const ValidateField = (input_field_id, regular_expression, error_message) => {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function (event) {
            let inputField = $(event.target);
            let inputFieldText = inputField.val();
            if (!regular_expression.test(inputFieldText)) {
                inputField.trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    };
    function displayRegisterPage() {
        console.log("Called RegisterPage");
        RegisterFormValidation();
        $("#sendButton").on("click", function () {
            let firstName = document.getElementById("firstName");
            let lastName = document.getElementById("lastName");
            let address = document.getElementById("address");
            let phoneNumber = document.getElementById("phoneNumber");
            let emailAddress = document.getElementById("emailAddress");
            let username = document.getElementById("username");
            let password = document.getElementById("password");
            let confirmPassword = document.getElementById("confirmPassword");
            let success = true;
            let newUser = new core.User();
            let messageArea = $("#messageArea").hide();
            $.get("../../data/user.json", function (data) {
                for (const user of data.users) {
                    if (username.value === user.Username) {
                        success = false;
                        break;
                    }
                }
                if (success && password.value === confirmPassword.value) {
                    newUser.toJSON(firstName.value, lastName.value, address.value, phoneNumber.value, emailAddress.value, username.value, password.value);
                    sessionStorage.setItem("users", newUser.serialize());
                    messageArea.removeClass("alert alert-danger").hide();
                    location.href = "../../index.html";
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("ERROR: Username Taken or Passwords do not match.").show();
                }
            });
        });
    }
    function displayLoginPage() {
        console.log("Called Displayed Login Page.");
        let messageArea = $("#messageArea").hide();
        $("#submitButton").on("click", function () {
            let username = document.getElementById("username");
            let password = document.getElementById("password");
            let success = false;
            let newUser = new core.User();
            $.get("../../data/user.json", function (data) {
                if (username && password) {
                    for (const user of data.users) {
                        if (username.value === user.Username && password.value === user.Password) {
                            newUser.fromJSON(user);
                            success = true;
                            break;
                        }
                    }
                    if (success) {
                        localStorage.setItem("users", newUser.serialize());
                        messageArea.removeAttr("class").hide();
                        location.href = "../../index.html";
                    }
                    else {
                        $("#username").trigger("focus").trigger("select");
                        messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                    }
                }
            });
        });
        $("#cancelButton").on("click", function () {
            location.href = "../../index.html";
        });
    }
    function openModal() {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "block";
        }
        else {
            console.warn("Modal element not found");
        }
    }
    function closeModal() {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
        }
        else {
            console.warn("Modal element not found");
        }
    }
    let slideIndex = 1;
    showSlides(slideIndex);
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("demo");
        let captionText = document.getElementById("caption");
        if (n > slides.length)
            slideIndex = 1;
        if (n < 1)
            slideIndex = slides.length;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (slideIndex - 1 < slides.length && slideIndex - 1 < dots.length) {
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
            if (captionText !== null && dots[slideIndex - 1] instanceof HTMLElement) {
                captionText.innerHTML = dots[slideIndex - 1].getAttribute('alt') || "";
            }
        }
    }
    function AjaxFeedback() {
        let xhr = new XMLHttpRequest();
        let feedback = document.getElementById("feedback");
        xhr.open("GET", "../../views/content/contact.html", true);
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (feedback !== null) {
                    sessionStorage.setItem("feedback", feedback.value);
                }
                location.href = "../../index.html";
            }
        });
        xhr.send();
    }
})();
//# sourceMappingURL=main.js.map