const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");
const heightMetric = document.querySelector(".height-metric");
const weightMetric = document.querySelector(".weight-metric");
const bmiResult = document.querySelector(".hero-result-number");
const rangeMin = document.querySelector(".hero-result-range-min");
const rangeMax = document.querySelector(".hero-result-range-max");
const weightResult = document.querySelector(".hero-result-weight");
const heightImperialFt = document.querySelector(".height-imperial-ft");
const heightImperialIn = document.querySelector(".height-imperial-in");
const weightImperialSt = document.querySelector(".weight-imperial-st");
const weightImperialLbs = document.querySelector(".weight-imperial-lbs");
const bmiResultDescription = document.querySelector(".result-description-text");

function unitChange(e) {
  const metricInput = document.querySelectorAll(".metric");
  const imperialInput = document.querySelectorAll(".imperial");
  const heroValues = document.querySelector(".hero-values");

  //changing input between metric and imperial units
  if (e.target.id === "metric") {
    metricInput.forEach((input) => input.classList.remove("hidden"));
    imperialInput.forEach((input) => input.classList.add("hidden"));
    heroValues.style.flexDirection = "row";
  }

  if (e.target.id === "imperial") {
    metricInput.forEach((input) => input.classList.add("hidden"));
    imperialInput.forEach((input) => input.classList.remove("hidden"));
    heroValues.style.flexDirection = "column";
  }
}

function updateBMI(input) {
  //saving height and weight input, based on the selection between metric and imperial
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

  //if opposite input is valid, update BMI. Use BMI formula corresponding to the selected. Limited to 4 characters and 1 decimal.
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

  //If the last character is a decimal, remove it
  if (bmiResult.textContent.charAt(3) === ".") {
    bmiResult.textContent = bmiResult.textContent.slice(0, 3);
  }

  const bmiInterpreted = Number(bmiResult.textContent);

  //change the description according to the BMI range
  if (bmiInterpreted < 18.5) {
    weightResult.textContent = "underweight";
    bmiResultDescription.textContent = `A BMI below 18.5 is considered underweight. This can sometimes indicate underlying health conditions. If your BMI falls into this category, consult with a healthcare professional to determine the best course of action for you. They can help you develop a plan for healthy weight gain, which may involve dietary changes and exercise routines.`;
  }

  if (bmiInterpreted >= 18.5 && bmiInterpreted <= 24.9) {
    weightResult.textContent = "a healthy weight";
    bmiResultDescription.textContent = `A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.`;
  }

  if (bmiInterpreted >= 25 && bmiInterpreted < 29.9) {
    weightResult.textContent = "overweight";
    bmiResultDescription.textContent = `A BMI between 25 and 29.9 is considered overweight. While it doesn't necessarily indicate immediate health problems, it can increase your risk for certain conditions over time.  If your BMI falls into this category, consider talking to a doctor or registered dietitian about creating a weight management plan. This may include adjustments to your diet and exercise habits.`;
  }

  if (bmiInterpreted >= 30) {
    weightResult.textContent = "obese";
    bmiResultDescription.textContent = `A BMI over 30 is considered obese. This can significantly increase your risk for various health problems, including heart disease, stroke, type 2 diabetes, and some cancers. If your BMI falls into this category, consulting with a healthcare professional is crucial. They can help you develop a comprehensive plan for weight loss, which may include lifestyle changes, medication, or even surgery in some cases.`;
  }

  //calculating the ideal minimum and maximum weight, according to the selected units
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

  //showing the ideal min and max weight, converted to lbs, if imperial is selected
  rangeMin.textContent = metric.checked
    ? `${idealMin}kgs`
    : `${(idealMin * 2.204).toFixed()}lbs`;
  rangeMax.textContent = metric.checked
    ? `${idealMax}kgs`
    : `${(idealMax * 2.204).toFixed()}lbs`;
}

//when typing either of the values, the BMI will update when both values are filled in
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

//changing input between metric and imperial
metric.addEventListener("change", unitChange);

imperial.addEventListener("change", unitChange);
