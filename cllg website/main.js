// Auto-update footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const yearEl2 = document.getElementById("year2");
  if (yearEl2) yearEl2.textContent = new Date().getFullYear();
});

// ========== TASK 2: Dynamic Gallery Modal ==========
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

if (modal && modalImg && modalCaption && modalClose) {
  document.querySelectorAll(".gallery-item").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modalCaption.textContent = img.alt;
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// ========== TASK 1, 5, 6, 7: Admission Form ==========
const admissionForm = document.getElementById("admissionForm");
const formMsg = document.getElementById("formMsg");

if (admissionForm) {
  admissionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Extract form values
    const formData = new FormData(admissionForm);
    const fullName = formData.get("fullname").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const course = formData.get("course");
    const gender = formData.get("gender");
    const remarks = formData.get("remarks").trim();

    // Validation
    let errors = [];
    if (fullName.length < 3) errors.push("Full name must be at least 3 characters.");
    if (!email.includes("@")) errors.push("Valid email is required.");
    if (!/^\d{10}$/.test(phone)) errors.push("Phone must be a 10-digit number.");
    if (!course) errors.push("Please select a course.");
    if (!gender) errors.push("Please select gender.");

    if (errors.length > 0) {
      formMsg.textContent = errors.join(" ");
      formMsg.style.color = "red";
      return;
    }

    // ========== JSON TASK ==========
    const studentData = {
      fullName,
      email,
      phone,
      course,
      gender,
      remarks
    };

    // Save to localStorage (simulated DB)
    localStorage.setItem("lastStudent", JSON.stringify(studentData));

    // Display in a formatted div (optional enhancement)
    const displayArea = document.createElement("div");
    displayArea.classList.add("form-card");
    displayArea.style.marginTop = "1rem";
    displayArea.innerHTML = `
      <h3>Submitted Data:</h3>
      <p><strong>Name:</strong> ${studentData.fullName}</p>
      <p><strong>Email:</strong> ${studentData.email}</p>
      <p><strong>Phone:</strong> ${studentData.phone}</p>
      <p><strong>Course:</strong> ${studentData.course}</p>
      <p><strong>Gender:</strong> ${studentData.gender}</p>
      <p><strong>Remarks:</strong> ${studentData.remarks}</p>
    `;

    formMsg.style.color = "green";
    formMsg.textContent = "Application submitted successfully!";
    admissionForm.after(displayArea);

    admissionForm.reset();

    setTimeout(() => {
      formMsg.textContent = "";
    }, 5000);
  });
}

// ========== TASK 3: Interactive Navigation (Simple active class) ==========
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ========== TASK 4: Animation with JS ==========
document.querySelectorAll(".card, .features article, .hero").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.style.transition = "transform .3s ease";
    el.style.transform = "translateY(-5px)";
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "translateY(0)";
  });
});