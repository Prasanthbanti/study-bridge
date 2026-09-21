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
    "https://script.google.com/macros/s/AKfycby3DuLWHpVxTaZFcoNblPAuhGt5_d314zCsxwsNs3CPUHLMIwKPnS7hOokul50DogCslg/exec";

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

            alert(
                "Thank you! Your enquiry has been submitted successfully. Our StudyBridge team will contact you soon."
            );

            enquiryForm.reset();

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
