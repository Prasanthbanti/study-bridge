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
/* ==========================================
   DYNAMIC UNIVERSITY INTAKE FILTER
========================================== */

const countrySelect = document.getElementById("countrySelect");
const intakeSelect = document.getElementById("intakeSelect");

const intakeDisplayNames = {
    spring: "Spring (January–May)",
    fall: "Fall (August–December)",
    summer: "Summer (May–August)",
    winter: "Winter (December–February)",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December"
};


function updateIntakeOptions() {

    if (!countrySelect || !intakeSelect) return;

    const selectedCountry =
        countrySelect.value.trim().toLowerCase();

    // Clear existing options
    intakeSelect.innerHTML =
        '<option value="">Select Intake</option>';

    if (!selectedCountry || !studyBridgeUniversities.length) {
        return;
    }

    const availableIntakes = new Set();

    studyBridgeUniversities.forEach(function (university) {

        const universityCountry =
            String(
                university["University Country"] || ""
            ).trim().toLowerCase();

        if (
            universityCountry !== selectedCountry
        ) {
            return;
        }

        const intakeText =
            String(
                university["Intake(s)"] || ""
            ).trim();

        if (!intakeText) return;

        /*
         * Handles values such as:
         * Fall
         * Spring
         * Fall, Spring
         * September
         * January / September
         */

        const parts = intakeText.split(
            /[,;/|]+/
        );

        parts.forEach(function (part) {

            const intake =
                part.trim().toLowerCase();

            if (intake) {
                availableIntakes.add(intake);
            }

        });

    });


    // Create only the options that actually exist
    availableIntakes.forEach(function (intake) {

        const option =
            document.createElement("option");

        option.value = intake;

        option.textContent =
            intakeDisplayNames[intake] ||
            capitalizeIntake(intake);

        intakeSelect.appendChild(option);

    });

}


/* ==========================================
   FORMAT UNKNOWN INTAKE NAMES
========================================== */

function capitalizeIntake(value) {

    return value
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });

}


/* ==========================================
   UPDATE WHEN COUNTRY CHANGES
========================================== */

if (countrySelect) {

    countrySelect.addEventListener(
        "change",
        updateIntakeOptions
    );

}
/* ==========================================
   UNIVERSITY SEARCH & FILTER
========================================== */

const universitySearchButton =
    document.getElementById("universitySearch");

if (universitySearchButton) {

    universitySearchButton.addEventListener("click", function () {

        const country =
            document.getElementById("countrySelect").value;

        const course =
            document.getElementById("courseSelect").value;

        const intake =
            document.getElementById("intakeSelect").value;

        const budget =
            document.getElementById("budgetSelect").value;

        const resultsContainer =
            document.getElementById("universityResults");

        const searchMessage =
            document.getElementById("searchMessage");

        if (!studyBridgeUniversities.length) {

            searchMessage.textContent =
                "University database is still loading. Please try again in a moment.";

            return;
        }

        let results = studyBridgeUniversities.filter(function (university) {

            const universityCountry =
                String(university["University Country"] || "").toLowerCase();

            const universityCourse =
                String(university["Course Type(s)"] || "").toLowerCase();

            const universityIntake =
                String(university["Intake(s)"] || "").toLowerCase();

            const universityFees =
                String(university["Fees"] || "").toLowerCase();

            const countryMatch =
                !country ||
                universityCountry.includes(country.toLowerCase());

            const courseMatch =
                !course ||
                universityCourse.includes(course.toLowerCase());

            const intakeMatch =
                !intake ||
                universityIntake.includes(intake.toLowerCase());

            return (
                countryMatch &&
                courseMatch &&
                intakeMatch
            );
        });

        searchMessage.textContent =
            results.length +
            " university option" +
            (results.length === 1 ? "" : "s") +
            " found.";

        displayUniversityResults(results);

    });
}


/* ==========================================
   DISPLAY UNIVERSITY RESULTS
========================================== */

function displayUniversityResults(universities) {

    const resultsContainer =
        document.getElementById("universityResults");

    if (!resultsContainer) return;

    if (!universities.length) {

        resultsContainer.innerHTML = `
            <div class="no-university-results">
                <h3>No universities found</h3>
                <p>
                    Try changing your destination, program or intake.
                </p>
            </div>
        `;

        return;
    }

    const limitedResults =
        universities.slice(0, 12);

    resultsContainer.innerHTML =
        limitedResults.map(function (university) {

            return `
                <div class="university-result-card">

                    <h3>
                        ${university["University Name"] || "University"}
                    </h3>

                    <p>
                        🌍 ${university["University Country"] || "Country not available"}
                    </p>

                    <p>
                        📍 ${university["Address"] || "Address not available"}
                    </p>

                    <p>
                        🎓 ${university["Course Type(s)"] || "Course information not available"}
                    </p>

                    <p>
                        📅 ${university["Intake(s)"] || "Intake information not available"}
                    </p>

                    <p>
                        💰 ${university["Fees"] || "Fee information not available"}
                    </p>

                    <a href="#contact" class="btn btn-primary">
                        Get Guidance →
                    </a>

                </div>
            `;

        }).join("");

}
