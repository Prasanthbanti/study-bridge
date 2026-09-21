/* =========================================================
   STUDYBRIDGE
   Website Interactions
   ========================================================= */


/* =========================
   MOBILE MENU
   ========================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        mainNav.classList.toggle("active");

        if (mainNav.classList.contains("active")) {
            menuToggle.innerHTML = "✕";
        } else {
            menuToggle.innerHTML = "☰";
        }

    });


    /* Close menu after clicking a navigation link */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("active");

            menuToggle.innerHTML = "☰";

        });

    });

}


/* =========================
   UNIVERSITY EXPLORER
   ========================= */

const universitySearch =
    document.getElementById("universitySearch");

const countrySelect =
    document.getElementById("countrySelect");

const courseSelect =
    document.getElementById("courseSelect");

const intakeSelect =
    document.getElementById("intakeSelect");

const searchMessage =
    document.getElementById("searchMessage");


if (universitySearch) {

    universitySearch.addEventListener("click", function () {

        const country = countrySelect.value;
        const course = courseSelect.value;
        const intake = intakeSelect.value;


        if (!country && !course && !intake) {

            searchMessage.textContent =
                "Please select at least one option to explore.";

            return;
        }


        let message =
            "Great! Your preferences are ready for counselling.";

        if (country) {
            message += ` Destination: ${country}.`;
        }

        if (course) {
            message += ` Program: ${course}.`;
        }

        if (intake) {
            message += ` Intake: ${intake}.`;
        }

        searchMessage.textContent = message;

    });

}


/* =========================
   ENQUIRY FORM
   ========================= */

const enquiryForm =
    document.getElementById("enquiryForm");

const formMessage =
    document.getElementById("formMessage");


if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();


        if (!name || !phone) {

            formMessage.textContent =
                "Please enter your name and phone number.";

            return;
        }


        /*
         * Temporary front-end response.
         *
         * Later we can connect this form to:
         * - WhatsApp
         * - Email
         * - Google Sheets
         * - Formspree
         * - Your own backend
         */

        formMessage.textContent =
            `Thank you, ${name}! Your enquiry has been received.`;

        enquiryForm.reset();

    });

}


/* =========================
   BACK TO TOP
   ========================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   CURRENT YEAR
   ========================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================
   SMOOTH INTERNAL LINKS
   ========================= */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================
   HEADER SHADOW ON SCROLL
   ========================= */

const header =
    document.querySelector(".site-header");


if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 20) {

            header.style.boxShadow =
                "0 8px 30px rgba(7, 27, 58, 0.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });

}


/* =========================
   PAGE LOADED
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "StudyBridge website loaded successfully."
    );

});
