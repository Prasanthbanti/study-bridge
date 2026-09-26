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
   STUDYBRIDGE LIVE UNIVERSITY DATABASE
   GOOGLE SHEETS
========================================== */

let studyBridgeUniversities = [];

const UNIVERSITY_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSHhc8GttayKxOFAgH32sslBab0amUBhPOCVWK5W2m1086YB7v25iEXO2uMno3hFhb8TX7mK2M89ay_/pub?output=csv";


async function loadUniversityDatabase() {

    try {

        const response =
            await fetch(UNIVERSITY_SHEET_URL);

        if (!response.ok) {
            throw new Error(
                "Google Sheet could not be loaded."
            );
        }

        const csvText =
            await response.text();

        studyBridgeUniversities =
            parseUniversityCSV(csvText);

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


/* ==========================================
   CSV PARSER
========================================== */

function parseUniversityCSV(csv) {

    const rows = [];
    let row = [];
    let value = "";
    let insideQuotes = false;

    for (let i = 0; i < csv.length; i++) {

        const character = csv[i];
        const nextCharacter = csv[i + 1];

        if (
            character === '"' &&
            insideQuotes &&
            nextCharacter === '"'
        ) {
            value += '"';
            i++;
            continue;
        }

        if (character === '"') {
            insideQuotes = !insideQuotes;
            continue;
        }

        if (character === "," && !insideQuotes) {
            row.push(value.trim());
            value = "";
            continue;
        }

        if (
            (character === "\n" || character === "\r") &&
            !insideQuotes
        ) {

            if (
                character === "\r" &&
                nextCharacter === "\n"
            ) {
                i++;
            }

            row.push(value.trim());

            if (row.some(cell => cell !== "")) {
                rows.push(row);
            }

            row = [];
            value = "";

            continue;
        }

        value += character;
    }

    if (value || row.length) {

        row.push(value.trim());

        if (row.some(cell => cell !== "")) {
            rows.push(row);
        }
    }

    if (!rows.length) {
        return [];
    }

    const headers = rows[0];

    return rows.slice(1).map(function (row) {

        const university = {};

        headers.forEach(function (header, index) {

            university[header] =
                row[index] || "";

        });

        return university;

    });
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

    if (
        !selectedCountry ||
        !studyBridgeUniversities.length
    ) {
        return;
    }

    const availableIntakes = new Set();


    /* ==========================================
       CHECK UNIVERSITIES FOR SELECTED COUNTRY
    ========================================== */

    studyBridgeUniversities.forEach(function (university) {

        const universityCountry =
            String(
                university["University Country"] || ""
            )
            .trim()
            .toLowerCase();

        if (
            universityCountry !== selectedCountry
        ) {
            return;
        }


        const intakeText =
            String(
                university["Intake(s)"] || ""
            )
            .trim()
            .toLowerCase();

        if (!intakeText) return;


        /* ==========================================
           DETECT SEASONS
        ========================================== */

        if (/\bspring\b/.test(intakeText)) {
            availableIntakes.add("spring");
        }

        if (/\bfall\b/.test(intakeText)) {
            availableIntakes.add("fall");
        }

        if (/\bsummer\b/.test(intakeText)) {
            availableIntakes.add("summer");
        }

        if (/\bwinter\b/.test(intakeText)) {
            availableIntakes.add("winter");
        }


        /* ==========================================
           DETECT MONTHS
        ========================================== */

        const months = [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december"
        ];

        months.forEach(function (month) {

            const monthRegex =
                new RegExp(
                    "\\b" + month + "\\b",
                    "i"
                );

            if (
                monthRegex.test(intakeText)
            ) {
                availableIntakes.add(month);
            }

        });

    });


    /* ==========================================
       ORDER OF OPTIONS
    ========================================== */

    const intakeOrder = [

        "spring",
        "fall",
        "summer",
        "winter",

        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"

    ];


    /* ==========================================
       CREATE OPTIONS
    ========================================== */

    intakeOrder.forEach(function (intake) {

        if (
            !availableIntakes.has(intake)
        ) {
            return;
        }

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
   STUDYBRIDGE UNIVERSITY SEARCH
========================================== */

const universitySearchButton =
    document.getElementById("universitySearch");

if (universitySearchButton) {

    universitySearchButton.addEventListener("click", function () {

        const country =
            document.getElementById("countrySelect").value.trim();

        const course =
            document.getElementById("courseSelect").value.trim();

        const intake =
            document.getElementById("intakeSelect").value.trim();

        const resultsContainer =
            document.getElementById("universityResults");

        const searchMessage =
            document.getElementById("searchMessage");


        /* ======================================
           CHECK DATABASE
        ====================================== */

        if (!studyBridgeUniversities.length) {

            searchMessage.textContent =
                "University data is still loading. Please wait a moment and try again.";

            return;
        }


        /* ======================================
           FILTER UNIVERSITIES
        ====================================== */

        const results =
            studyBridgeUniversities.filter(function (university) {

                const universityCountry =
                    String(
                        university["University Country"] || ""
                    ).trim().toLowerCase();

                const universityCourse =
                    String(
                        university["Course Type(s)"] || ""
                    ).trim().toLowerCase();

                const universityIntake =
                    String(
                        university["Intake(s)"] || ""
                    ).trim().toLowerCase();


                /* Country */

                const countryMatch =
                    !country ||
                    universityCountry.includes(
                        country.toLowerCase()
                    );


                /* Course */

                const courseMatch =
                    !course ||
                    universityCourse.includes(
                        course.toLowerCase()
                    );


                /* Intake */

                let intakeMatch = true;

                if (intake) {

                    const selectedIntake =
                        intake.toLowerCase();

                    intakeMatch =
                        universityIntake.includes(
                            selectedIntake
                        );
                }


                return (
                    countryMatch &&
                    courseMatch &&
                    intakeMatch
                );

            });


        /* ======================================
           SHOW RESULT COUNT
        ====================================== */

        searchMessage.textContent =
            results.length +
            " university option" +
            (results.length === 1 ? "" : "s") +
            " found.";


        /* ======================================
           DISPLAY RESULTS
        ====================================== */

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

                    <a href="#"
   class="btn btn-primary"
   onclick='openUniversityWhatsApp(event, ${JSON.stringify(university)})'>
    Get Guidance →
</a>

                </div>
            `;

        }).join("");

}
