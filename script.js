const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");
const heightMetric = document.querySelector(".height-metric");
const weightMetric = document.querySelector(".weight-metric");
const heightImperialFt = document.querySelector(".height-imperial-ft");
const heightImperialIn = document.querySelector(".height-imperial-in");
const weightImperialSt = document.querySelector(".weight-imperial-st");
const weightImperialLbs = document.querySelector(".weight-imperial-lbs");
const bmiResult = document.querySelector(".hero-result-number");
const rangeMin = document.querySelector(".hero-result-range-min");
const rangeMax = document.querySelector(".hero-result-range-max");
const weightResult = document.querySelector(".hero-result-weight");

function unitChange(e) {
  const metricInput = document.querySelectorAll(".metric");
  const imperialInput = document.querySelectorAll(".imperial");

  if (e.target.id === "metric") {
    metricInput.forEach((input) => input.classList.remove("hidden"));
    imperialInput.forEach((input) => input.classList.add("hidden"));
  }

  if (e.target.id === "imperial") {
    metricInput.forEach((input) => input.classList.add("hidden"));
    imperialInput.forEach((input) => input.classList.remove("hidden"));
  }
}

function updateBMI(input) {
  const heightInput = metric.checked
    ? heightMetric.value
    : imperial.checked
    ? Number(heightImperialFt.value) * 12 + Number(heightImperialIn.value)
    : null;
  const weightInput = metric.checked
    ? weightMetric.value
    : imperial.checked
    ? Number(weightImperialSt.value) * 14 + Number(weightImperialLbs.value)
    : null;

  if (input)
    bmiResult.textContent = metric.checked
      ? (Number(weightInput) / Math.pow(Number(heightInput) / 100, 2))
          .toFixed(1)
          .slice(0, 4)
      : imperial.checked
      ? ((Number(weightInput) * 703) / Math.pow(Number(heightInput), 2))
          .toFixed(1)
          .slice(0, 4)
      : "0.0";

  if (bmiResult.textContent.charAt(3) === ".") {
    bmiResult.textContent = bmiResult.textContent.slice(0, 3);
  }

  const bmiInterpreted = Number(bmiResult.textContent);

  if (bmiInterpreted < 18.5) weightResult.textContent = "underweight";
  if (bmiInterpreted >= 18.5 && bmiInterpreted <= 24.9)
    weightResult.textContent = "a healthy weight";
  if (bmiInterpreted >= 25 && bmiInterpreted < 29.9)
    weightResult.textContent = "overweight";
  if (bmiInterpreted >= 30) weightResult.textContent = "obese";

  const idealMin = metric.checked
    ? (18.5 * Math.pow(Number(heightInput) / 100, 2)).toFixed(1)
    : imperial.checked
    ? ((18.5 * Math.pow(Number(heightInput), 2)) / 703).toFixed(1)
    : "0.0";
  const idealMax = metric.checked
    ? (24.9 * Math.pow(Number(heightInput) / 100, 2)).toFixed(1)
    : imperial.checked
    ? ((24.9 * Math.pow(Number(heightInput), 2)) / 703).toFixed(1)
    : "0.0";

  rangeMin.textContent = metric.checked
    ? `${idealMin}kgs`
    : `${(idealMin * 2.204).toFixed()}lbs`;
  rangeMax.textContent = metric.checked
    ? `${idealMax}kgs`
    : `${(idealMax * 2.204).toFixed()}lbs`;
}

heightMetric.addEventListener("input", () => updateBMI(weightMetric.value));

weightMetric.addEventListener("input", () => updateBMI(heightMetric.value));

heightImperialFt.addEventListener("input", () =>
  updateBMI(weightImperialSt.value)
);

heightImperialIn.addEventListener("input", () =>
  updateBMI(weightImperialSt.value)
);

weightImperialSt.addEventListener("input", () =>
  updateBMI(heightImperialFt.value)
);
weightImperialLbs.addEventListener("input", () =>
  updateBMI(heightImperialFt.value)
);

metric.addEventListener("change", unitChange);

imperial.addEventListener("change", unitChange);
