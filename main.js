const form = document.getElementById("form");
const resultYears = document.querySelector(".result__years span");
const resultMonths = document.querySelector(".result__months span");
const resultDays = document.querySelector(".result__days span");

const inputs = document.querySelector(".inputs");
const dayError = document.querySelector("#day-error");
const monthError = document.querySelector("#month-error");
const yearError = document.querySelector("#year-error");

console.log(form);

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const data = new FormData(form);
	const dataArray = [...data];

	const day = dataArray[0][1];
	const month = dataArray[1][1];
	const year = dataArray[2][1];

	const now = new Date();
	const nowDay = now.getDate();
	const nowMonth = now.getMonth() + 1;
	const nowYear = now.getFullYear();

	let dataOK = true;
	yearError.classList.remove("error");
	yearError.parentElement.classList.remove("error");
	monthError.classList.remove("error");
	monthError.parentElement.classList.remove("error");
	dayError.classList.remove("error");
	dayError.parentElement.classList.remove("error");
	const dayPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	function inputError(input, errorMessage) {
		input.textContent = errorMessage;
		input.classList.add("error");
		input.parentElement.classList.add("error");
	}

	if (year > nowYear) {
		dataOK = false;
		inputError(yearError, "Must be in the past");
	}

	if (month > 12 || month < 1) {
		dataOK = false;
		inputError(monthError, "Must be a valid month");
	}

	if (day > dayPerMonth[month - 1] || day > 31 || day < 1) {
		dataOK = false;
		inputError(dayError, "Must be a valid day");
	}
	console.log("esto:", year);

	if (year === "") {
		dataOK = false;
		inputError(yearError, "This field is required");
		console.log("entro year");
	}

	if (month === "") {
		dataOK = false;
		inputError(monthError, "This field is required");
		console.log("entro month");
	}

	if (day === "") {
		dataOK = false;
		inputError(dayError, "This field is required");
		console.log("entro day");
	}

	if (dataOK) {
		let outputDays = nowDay - day;
		let outputMonths = nowMonth - month;
		let outputYears = nowYear - year;

		if (outputDays < 0) {
			outputDays += dayPerMonth[month - 1];
			outputMonths -= 1;
		}

		if (outputMonths < 0) {
			outputMonths += 12;
			outputYears -= 1;
		}

		resultDays.textContent = outputDays;
		resultMonths.textContent = outputMonths;
		resultYears.textContent = outputYears;

		console.log(outputDays, outputMonths, outputYears);
	} else {
		resultDays.textContent = "--";
		resultMonths.textContent = "--";
		resultYears.textContent = "--";
	}
});
