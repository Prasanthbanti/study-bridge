// ===============================
// STUDYBRIDGE WEBSITE JAVASCRIPT
// ===============================

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// ==========================================
// GOOGLE SHEETS ENQUIRY CONNECTION
// ==========================================

const enquiryForm = document.querySelector("#enquiryForm");

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx-GyKuvVlVmovYlM2CziykxwnkxM6PV1p0gxmJdxKbHkkaE3OFVHiZhE-NkayCnVcL/exec";

if (enquiryForm) {

    enquiryForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = enquiryForm.querySelector(
            'button[type="submit"]'
        );

        const originalText = submitButton.innerText;

        submitButton.innerText = "Sending...";
        submitButton.disabled = true;

        const formData = new FormData(enquiryForm);

        const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    country: formData.get("country"),
    course: formData.get("program"),
    message: formData.get("message")
};

        try {

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            });

            enquiryForm.reset();

const successPopup = document.getElementById("enquirySuccessPopup");

if (successPopup) {

    successPopup.classList.add("show");

    setTimeout(() => {
        successPopup.classList.remove("show");
    }, 5500);

}
        } catch (error) {

            console.error("Enquiry Error:", error);

            alert(
                "Something went wrong. Please try again or contact us on WhatsApp."
            );

        } finally {

            submitButton.innerText = originalText;
            submitButton.disabled = false;

        }

    });
}


// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTop = document.querySelector("#backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}


// ==========================================
// CURRENT YEAR
// ==========================================

const yearElement = document.querySelector("#currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ==========================================
// HEADER SHADOW ON SCROLL
// ==========================================

const header = document.querySelector(".site-header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}

console.log("StudyBridge website loaded successfully.");
/* ==========================================
   STUDYBRIDGE UNIVERSITY DATABASE LOADER
========================================== */

let studyBridgeUniversities = [];

async function loadUniversityDatabase() {
    try {
        const response = await fetch("universities.xlsx");

        if (!response.ok) {
            throw new Error("University Excel file not found.");
        }

        const arrayBuffer = await response.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, {
            type: "array"
        });

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        studyBridgeUniversities = XLSX.utils.sheet_to_json(firstSheet);

        console.log(
            "StudyBridge universities loaded:",
            studyBridgeUniversities.length
        );

    } catch (error) {
        console.error(
            "University database error:",
            error
        );
    }
}

loadUniversityDatabase();
