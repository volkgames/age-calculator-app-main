function $(selector) {
  return document.querySelector(selector);
}

const dayInput = document.querySelector("#day");
const monthInput = $("#month");
const yearInput = $("#year");

const outputYears = $("#output-years");
const outputMonths = $("#output-months");
const outputDays = $("#output-days");

const button = $(".submit-button button");

const inputsGroups = document.querySelectorAll(".input-group");

function makeError(text) {
  inputsGroups.forEach((el) => {
    el.classList.add("error");
    el.querySelector("p").innerText = text;
  });
  outputYears.textContent = "--";
  outputMonths.textContent = "--";
  outputDays.textContent = "--";
}

function clear() {
  inputsGroups.forEach((el) => {
    el.classList.remove("error");
    el.querySelector("p").innerText = "";
  });
}

function updateAge() {
  clear();
  const currentDate = new Date();
  const inputDate = setDate(yearInput.value, monthInput.value, dayInput.value);

  console.log(dayInput.value);

  if (!dayInput.value) {
    dayInput.parentElement.classList.add("error");
    dayInput.parentElement.querySelector("p").innerText =
      "the field is required";
    outputYears.textContent = "--";
    outputMonths.textContent = "--";
    outputDays.textContent = "--";
    return;
  }

  if (!monthInput.value) {
    monthInput.parentElement.classList.add("error");
    monthInput.parentElement.querySelector("p").innerText =
      "the field is required";
    outputYears.textContent = "--";
    outputMonths.textContent = "--";
    outputDays.textContent = "--";
    return;
  }

  if (!yearInput.value) {
    yearInput.parentElement.classList.add("error");
    yearInput.parentElement.querySelector("p").innerText =
      "the field is required";
    outputYears.textContent = "--";
    outputMonths.textContent = "--";
    outputDays.textContent = "--";
    return;
  }

  // Validate input
  if (!isValidDate(yearInput.value, monthInput.value, dayInput.value)) {
    // Highlight invalid inputs
    makeError("Must be a valid Date");
    outputYears.textContent = "--";
    outputMonths.textContent = "--";
    outputDays.textContent = "--";
    return;
  }

  // Remove invalid input highlighting
  clear();

  // Calculate age correctly
  const ageInMilliseconds = currentDate - inputDate;
  const ageDate = new Date(ageInMilliseconds);

  // Extract years, months, and days from age
  const ageYears = ageDate.getUTCFullYear() - 1970;
  const ageMonths = ageDate.getUTCMonth();
  const ageDays = ageDate.getUTCDate() - 1;

  // Update output
  outputYears.textContent = ageYears;
  outputMonths.textContent = ageMonths;
  outputDays.textContent = ageDays;
}

function isValidDate(year, month, day) {
  const testDate = new Date(`${year}-${month}-${day}`);
  return !isNaN(testDate.getTime()) && testDate.getTime() > 0;
}

function setDate(year, month, day) {
  return new Date(`${year}-${month}-${day}`);
}

// Initial calculation on page load
//   updateAge();

button.addEventListener("click", (e) => {
  updateAge();
});
