const form = document.getElementById("admissionForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(form);
  const fullName = data.get("fullname").trim();
  const email = data.get("email").trim();
  const phone = data.get("phone").trim();
  const course = data.get("course");
  const gender = data.get("gender");

  let errors = [];

  if (fullName.length < 3) errors.push("Name too short.");
  if (!email.includes("@")) errors.push("Invalid email.");
  if (!/^\d{10}$/.test(phone)) errors.push("Invalid phone.");
  if (!course) errors.push("Course not selected.");
  if (!gender) errors.push("Gender not selected.");

  if (errors.length > 0) {
    formMsg.style.color = "red";
    formMsg.textContent = errors.join(" ");
    return;
  }

  formMsg.style.color = "green";
  formMsg.textContent = "Form submitted successfully!";
  form.reset();
});
