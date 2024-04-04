const usernameInput = document.getElementById("username");
const nameError = document.getElementById("nameError");
const nameSuccess = document.getElementById("nameSuccess");

const ageInput = document.getElementById("age");
const ageError = document.getElementById("ageError");
const ageSuccess = document.getElementById("ageSuccess");

const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const emailSuccess = document.getElementById("emailSuccess");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const passwordSuccess = document.getElementById("passwordSuccess");

const secondPasswordInput = document.getElementById("secondpassword");
const secondpasswordError = document.getElementById("secondpasswordError");
const secondpasswordSuccess = document.getElementById("secondpasswordSuccess");

const submitButton = document.querySelector(".submit");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modalclose");

nameError.style.display = "none";
nameSuccess.style.display = "none";
ageError.style.display = "none";
ageSuccess.style.display = "none";
emailError.style.display = "none";
emailSuccess.style.display = "none";
passwordError.style.display = "none";
passwordSuccess.style.display = "none";
secondpasswordError.style.display = "none";
secondpasswordSuccess.style.display = "none";

function validateName() {
  const nameValue = usernameInput.value.trim();

  if (nameValue === "") {
    nameError.style.display = "block";
    nameSuccess.style.display = "none";
  } else {
    nameError.style.display = "none";
    nameSuccess.style.display = "block";
  }
}

function validateAge() {
  const ageValue = ageInput.value.trim();

  if (
    !isNaN(ageValue) &&
    parseInt(ageValue) > 0 &&
    ageValue.indexOf(".") === -1 &&
    parseInt(ageValue) >= 19
  ) {
    ageError.style.display = "none";
    ageSuccess.style.display = "block";
  } else {
    ageError.style.display = "block";
    ageSuccess.style.display = "none";
  }
}

function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailPattern.test(emailValue)) {
    emailError.style.display = "none";
    emailSuccess.style.display = "block";
  } else {
    emailError.style.display = "block";
    emailSuccess.style.display = "none";
  }
}

function validatePassword() {
  const passwordValue = passwordInput.value;

  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{4,12}$/;

  if (passwordPattern.test(passwordValue)) {
    passwordError.style.display = "none";
    passwordSuccess.style.display = "block";
  } else {
    passwordError.style.display = "block";
    passwordSuccess.style.display = "none";
  }
}
function validateConfirmPassword() {
  const passwordValue = passwordInput.value;
  const secondPasswordValue = secondPasswordInput.value;

  if (passwordValue === secondPasswordValue) {
    secondpasswordError.style.display = "none";
    secondpasswordSuccess.style.display = "block";
  } else {
    secondpasswordError.style.display = "block";
    secondpasswordSuccess.style.display = "none";
  }
}

function toggleSubmitButton() {
  const isValidName = usernameInput.value.trim() !== "";
  const isValidAge = ageInput.value.length >= 2 && ageInput.value.length <= 5;
  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    emailInput.value.trim()
  );
  const isValidPassword =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]+$/.test(
      passwordInput.value
    );
  const passwordsMatch = passwordInput.value === secondPasswordInput.value;

  if (
    isValidName &&
    isValidAge &&
    isValidEmail &&
    isValidPassword &&
    passwordsMatch
  ) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "true");
  }
}

usernameInput.addEventListener("input", validateName);
ageInput.addEventListener("input", validateAge);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
secondPasswordInput.addEventListener("input", validateConfirmPassword);

function closeModal() {
  modal.style.display = "none";
}

submitButton.addEventListener("click", () => {
  event.preventDefault();

  const isValidName = usernameInput.value.trim() !== "";
  const isValidAge = ageInput.value.length >= 2 && ageInput.value.length <= 5;
  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    emailInput.value.trim()
  );
  const isValidPassword =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]+$/.test(
      passwordInput.value
    );
  const passwordsMatch = passwordInput.value === secondPasswordInput.value;

  if (
    isValidName &&
    isValidAge &&
    isValidEmail &&
    isValidPassword &&
    passwordsMatch
  ) {
    modal.style.display = "block";
  }
});

modalCloseButton.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
