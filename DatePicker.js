"use strict";

const numberOfDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
				'August', 'September', 'October', 'November', 'December'];

function DatePicker(id) {
	this.id = id;
}

function getDayInWeek(day, month, year) {
	++month;
	return (day + 2 * month + parseInt(3 * (month + 1) / 5)
	+ year + parseInt(year / 4)) % 7;
}

function winter(isChristmas) {
	var infoBar = document.getElementById("info-bar");
	var firstMountain = document.createElement("div");
	var secondMountain = document.createElement("div");
	var firstPeak = document.createElement("div");
	var secondPeak = document.createElement("div");
	var pineTree = document.createElement("img");
	var christmas = document.createElement("img");
	
	firstMountain.className = "mountain first";
	secondMountain.className = "mountain second";
	firstPeak.className = "mountain mountain-peak first";
	secondPeak.className = "mountain mountain-peak second";
	pineTree.className = "pine-tree";
	pineTree.setAttribute("src", "pine-tree.png");
	christmas.setAttribute("src", "christmas.png");
	christmas.className = "christmas";

	const snowGenerator = () => {
		// Initialising 50 big-snow objects and 50 small-snow ones 
		var snowBox = [];
		for (let i = 0; i < 50; ++i) {
			var bigSnow = document.createElement("div");
			var smallSnow = document.createElement("div");
			bigSnow.className = `snow big a${i}`;
			smallSnow.className = `snow small a${i}`;
			snowBox.push(bigSnow);
			snowBox.push(smallSnow);
		}

		const shuffle = (a) => {
			var j, x, i;
			for (i = a.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = a[i];
				a[i] = a[j];
				a[j] = x;
			}
			return a;
		};

		snowBox = shuffle(snowBox);

		snowBox.forEach(snow => {
			var style = document.createElement("style");
			style.innerText = (snow.classList.contains("big")
			? ".snow.big." : ".snow.small.")
			+ `${snow.classList[2]} {
				left: ${Math.random() * 300}px;
				animation: snowrain 7s infinite;
				animation-delay: ${Math.random() * 6}s;
			}`;
			snow.appendChild(style);
			infoBar.appendChild(snow);
		});
		
	};

	firstMountain.appendChild(firstPeak);
	secondMountain.appendChild(secondPeak);
	infoBar.appendChild(firstMountain);
	infoBar.appendChild(secondMountain);
	infoBar.appendChild(pineTree);
	if (isChristmas) infoBar.appendChild(christmas);
	infoBar.style.backgroundImage = "linear-gradient(90deg, #FF5F6D, #FFC371)";
	snowGenerator();
}

function summer() {
	var infoBar = document.getElementById("info-bar");
	var sun = document.createElement("img");

	sun.className = "sun";
	sun.setAttribute("src", "sun.png");

	/**
	 * Create evaporation effect by utilizing clip-path 
	 * CSS property
	 */
	for (let i = 0; i < 20; ++i) {
		var vapour = document.createElement("img");
		var style = document.createElement("style");
		vapour.className = `vapour b${i}`;
		vapour.src = "curve-line.png";
		style.innerText = `
			.vapour.b${i} {
				left: ${Math.random() * 300}px;
				animation: evaporate 3s infinite;
				animation-delay: ${Math.random() * 3}s;
			}
		`;
		vapour.appendChild(style);
		infoBar.appendChild(vapour);
	}
	infoBar.style.backgroundImage = "linear-gradient(90deg, #22C1C3, #FDBB2D)";
	infoBar.appendChild(sun);
}

function autumn() {
	var infoBar = document.getElementById("info-bar");
	var firstTree = document.createElement("img");
	var secondTree = document.createElement("img");
	
	firstTree.className = "tree first";
	secondTree.className = "tree second";
	firstTree.src = "tree.png";
	secondTree.src = "tree.png";

	// Initialising winds
	for (let i = 0; i < 10; ++i) {
		var wind = document.createElement("div");
		var style = document.createElement("style");
		wind.className = `wind c${i}`;
		style.innerText = `
			.wind.c${i} {
				top: ${Math.random() * 40}px;
				animation: blow 3s infinite;
				animation-delay: ${Math.random() * 5}s;
			}
		`;
		wind.appendChild(style);
		infoBar.appendChild(wind);
	}
	
	// Initialising leafs
	for (let i = 0; i < 10; ++i) {
		var leaf = document.createElement("img");
		var style = document.createElement("style");
		var animation_duration = Math.max(5, Math.random() * 8); 
		var leaf_size = Math.max(5, Math.random() * 10);
		leaf.className = `leaf d${i}`;
		leaf.src = "leaf.png";
		style.innerText = `
			.leaf.d${i} {
				top: ${Math.random() * 40}px;
				bottom: ${Math.max(5, Math.random() * 40)}px;
				height: ${leaf_size}px;
				width: ${leaf_size}px;
				animation: leaf-spinning ${animation_duration}s infinite,
							leaf-moving ${animation_duration + 3}s infinite;
				animation-delay: ${Math.random() * 3}s;	
			}		

			@keyframes leaf-spinning {
				50% {
					transform: rotate(360deg);
				}
			}

			@keyframes leaf-moving {
				50% {
					opacity: 1;
				}
				100% {
					opacity: 0;
					transform: translateX(290px);
				}
			}
		`;
		leaf.appendChild(style);
		infoBar.appendChild(leaf);
	}

	infoBar.style.backgroundImage = "linear-gradient(90deg, #b21f1f, #1a2a6c, #fdbb2d)";
	infoBar.appendChild(firstTree);
	infoBar.appendChild(secondTree);
}

DatePicker.prototype.render = (date) => {
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const container = document.createElement("div");
	const infoBar = document.createElement("div");
	const navigationBar = document.createElement("div");
	const previousButton = document.createElement("button"); 
	const nextButton = document.createElement("button"); 
	const table = document.createElement("table"); 
	const tableHeader = document.createElement("tr");

	var initialDay = date.getDay();
	var initialMonth = date.getMonth();
	var initialYear = date.getFullYear();
	var currentDay = initialDay;
	var currentMonth = initialMonth;
	var currentYear = initialYear;
	var currentSeasonMonth;
	var isChristmas = false;
	
	container.className = "container";
	infoBar.className = "info-bar";
	infoBar.setAttribute("id", "info-bar");
	tableHeader.className = "header";
	navigationBar.className = "navigation-bar";

	const print = (msg, directionOfTime) => {
		// var infoBar = document.querySelector(".info-bar");
		var infoBarNewTextContent = document.querySelector(".info-bar span.new");
		// var infoBarOldTextContent = document.querySelector(".info-bar span.old");
		// var infoBarNewerTextContent = document.createElement("span");

		// infoBarOldTextContent?.remove();
		// infoBarNewTextContent.classList.remove("new");
		// infoBarNewTextContent.classList.add("old");
		// infoBarNewerTextContent.classList.add("new");
		// infoBar.appendChild(infoBarNewerTextContent);

		// var keyframes = `
		// 	@keyframes forward-out {
		// 		100% {
		// 			opacity: 0;
		// 			transform: translateX(-150px);
		// 		}
		// 	}
		// 	@keyframes forward-in {
		// 		0% {
		// 			opacity: 0;
		// 			right: 0;
		// 		}
		// 		100% {
		// 			opacity: 1;
		// 			transform: translateX(-150px);
		// 		}
		// 	}
		// 	@keyframes backward-out {
		// 		100% {
		// 			opacity: 0;
		// 			transform: translateX(150px);
		// 		}
		// 	}
		// 	@keyframes backward-in {
		// 		0% {
		// 			opacity: 0;
		// 			left: 0;
		// 		}
		// 		100% {
		// 			opacity: 1;
		// 			transform: translateX(150px);
		// 		}
		// 	}
		// `;
		// var direction = directionOfTime?.split("-")[0];
		// if (directionOfTime === "forward-month" || directionOfTime === "backward-month") {
		// 	infoBarNewerTextContent.textContent = `${msg}`;
		// 	infoBarNewTextContent.innerHTML = `
		// 		<style>
		// 			.info-bar span.old {
		// 				animation: ${direction === "forward" ? "forward-out" : "backward-out"} 1s;
		// 			} 
		// 			${keyframes}
		// 		</style>
		// 	`;		
		// 	infoBarNewerTextContent.innerHTML = `
		// 		<style>
		// 			.info-bar span.new {
		// 				animation: ${direction === "forward" ? "forward-in" : "backward-in"} 1s;
		// 				animation-delay: 0.5s;
		// 			}
		// 			${keyframes}
		// 		</style>
		// 	`;
		// 	return;
		// }
		infoBarNewTextContent.textContent = `${msg}`;
	};

	const initializeTable = (directionOfTime) => {
		// console.log(initialDay + " " + initialMonth + " " + initialYear); 
		// console.log(currentDay + " " + currentMonth + " " + currentYear);
		table.innerHTML = "";
		tableHeader.innerHTML = "";
		
		for (let i = 0; i < 7; ++i) {
			tableHeader.innerHTML += i === 0 || i === 6 
			? `<th class="weekend"><span>${weekdays[i]}</span></td>` 
			: `<th><span>${weekdays[i]}</span></td>`
		}
		table.appendChild(tableHeader);

		const isSameSeason = () => {
			if ((currentMonth === 11 || (0 <= currentMonth && currentMonth <= 2)) 
				&& (currentSeasonMonth === 11 || (0 <= currentSeasonMonth && currentSeasonMonth <= 2)))
				return true;
			if ((3 <= currentMonth && currentMonth <= 8) && (3 <= currentSeasonMonth && currentSeasonMonth <= 8))
				return true;
			if ((9 <= currentMonth && currentMonth <= 10) && (9 <= currentSeasonMonth && currentSeasonMonth <= 10))
				return true;
			return false;
		}
		
		if (!currentSeasonMonth || !isSameSeason()) {
			infoBar.innerHTML = `<span class="new"></span>`;
		} 

		print(`${months[currentMonth]} - ${currentYear}`, directionOfTime);

		var n_start = getDayInWeek(1, currentMonth, currentYear);
		var daysArr = [];
		
		/** 
		 * Push up days before start day of the month
		*/
		var isLeapYear = !(currentYear % 400)|| (!(currentYear % 4) && (currentYear % 100)) ? true : false;
		var currentDayOfPriorMonth = numberOfDaysInMonths[currentMonth > 0 ? currentMonth - 1 : 11];
		currentDayOfPriorMonth += isLeapYear && currentMonth === 2 ? 1 : 0; 
		
		for (let i = n_start - 1; i >= 0; --i) {
			daysArr.push(currentDayOfPriorMonth);
			--currentDayOfPriorMonth;
		}
		daysArr = daysArr.reverse();
	
		/** 
		 * Push up days in the current month
		*/
		var numberOfDaysOfCurrentMonth = numberOfDaysInMonths[currentMonth] + (isLeapYear && currentMonth === 1 ? 1 : 0);
		for (let i = 1; i <= numberOfDaysOfCurrentMonth; ++i) {
			daysArr.push(i);
		}
		if (isLeapYear && currentMonth === 1) daysArr.push(29);
	
		/**
		 * Push up days in the next month
		 */ 
		var currentSizeOfDaysArr = daysArr.length;
		for (let i = 1; i <= 42 - currentSizeOfDaysArr; ++i) {
			daysArr.push(i);
		}
	
		/** 
		 * TODO: Remember to set "out-of-current-month" class for 
		 *  	days does not belong to the current month
		* */ 
		var cur = 0, isCurrentMonth = false, before = true, dayCellsArr = [];
		var currentSelectedCell;

		for (let i = 0; i < 6; ++i) {
			var currentRow = document.createElement("tr");
			table.appendChild(currentRow);
			for (let j = 0; j < 7; ++j) {
				if (daysArr[cur] === 1) isCurrentMonth = !isCurrentMonth;
				var dayCell = document.createElement("td");
				dayCell.setAttribute("id", `${i}${j}`);
				dayCell.className = isCurrentMonth ? "current-month" : "out-of-current-month";
				dayCell.classList += " selected";
				if (!isCurrentMonth) {
					dayCell.classList += before ? " before" : " after"; 
					dayCell.classList.toggle("selected");
				}
				else {
					before = false;
					if (parseInt(initialDay) !== daysArr[cur] || initialMonth !== currentMonth
						|| initialYear !== currentYear) {
						// console.log(parseInt(initialDay) === daysArr[cur]);
						dayCell.classList.toggle("selected");
					}
					else {
						currentSelectedCell = dayCell;
						print(`${currentDay} - ${currentMonth + 1} - ${currentYear}`, directionOfTime);
						if (parseInt(initialDay) === 25 && parseInt(initialMonth) === 11) isChristmas = true;		
					}
				}
				dayCell.textContent = daysArr[cur];
				currentRow.appendChild(dayCell);
				dayCellsArr.push(dayCell);
				++cur;
			}
		}

		/**
		 * Add click-event handler
		 */
		dayCellsArr.forEach(dayCell => {
			dayCell.addEventListener("click", () => {
				currentSelectedCell?.classList.toggle("selected");
				var timeDirection;
				var cd = parseInt(currentDay), id = parseInt(initialDay);
				var cm = parseInt(currentMonth), im = parseInt(initialMonth);
				var cy = parseInt(currentYear), iy = parseInt(initialYear);
				if (cm === im && cy === iy) {
					timeDirection = cd < id ? "backward-day" : (cd !== id ? "forward-day" : ""); 
				}
				currentDay = dayCell.textContent;
				initialDay = dayCell.textContent;
				if (dayCell.classList.contains("current-month")) {
					currentSelectedCell = dayCell;
					initialMonth = currentMonth;
					initialYear = currentYear;
					dayCell.classList.toggle("selected");
					// print(`${currentDay} - ${currentMonth + 1} - ${currentYear}`, directionOfTime);
					initializeTable(timeDirection);		// Triggering table re-initialisation
					return;
				}
				// Handling out-of-current-month days cases
				if (dayCell.classList.contains("before")) {
					if (currentMonth > 0) {
						--currentMonth;
						initialMonth = currentMonth;
					}
					else {
						initialMonth = 11;
						currentMonth = 11;
						--currentYear;
					}
					initialYear = currentYear;
					initializeTable("backward-day");	// Triggering table re-initialisation
				}
				else {
					if (currentMonth < 11) {
						++currentMonth;
						initialMonth = currentMonth;
					}
					else {
						initialMonth = 0;
						currentMonth = 0;
						++currentYear;
					}
					initialYear = currentYear;
					initializeTable("forward-day");	// Triggering table re-initialisation
				}
			});
		});

		/**
		 * Add hover-event handler
		 */
		dayCellsArr.forEach(dayCell => dayCell.addEventListener("mouseover", () => {
			var x = parseInt(dayCell.getAttribute("id")[0]);
			var y = parseInt(dayCell.getAttribute("id")[1]);
			var adjacentDayCell_1 = document.getElementById(`${x - 1}${y - 1}`);		
			var adjacentDayCell_2 = document.getElementById(`${x - 1}${y}`);		
			var adjacentDayCell_3 = document.getElementById(`${x - 1}${y + 1}`);		
			var adjacentDayCell_4 = document.getElementById(`${x}${y - 1}`);		
			var adjacentDayCell_5 = document.getElementById(`${x}${y + 1}`);		
			var adjacentDayCell_6 = document.getElementById(`${x + 1}${y - 1}`);		
			var adjacentDayCell_7 = document.getElementById(`${x + 1}${y}`);		
			var adjacentDayCell_8 = document.getElementById(`${x + 1}${y + 1}`);		

			var border_color = "rgba(0, 0, 0, 0.2)";
			if (x >= 1 && y >= 1) {
				adjacentDayCell_1.style.borderRight = `0.25px solid ${border_color}`;
				adjacentDayCell_1.style.borderBottom = `0.25px solid ${border_color}`;
			}
			if (x >= 1) adjacentDayCell_2.style.borderBottom = `0.25px solid ${border_color}`;
			if (x >= 1 && y < 6) {
				adjacentDayCell_3.style.borderBottom = `0.25px solid ${border_color}`;
				adjacentDayCell_3.style.borderLeft = `0.25px solid ${border_color}`;
			}
			if (y >= 1) {
				adjacentDayCell_4.style.borderRight = `0.25px solid ${border_color}`;
				adjacentDayCell_4.style.borderBottom = `0.25px solid ${border_color}`;
			}
			if (y < 6) {
				adjacentDayCell_5.style.borderLeft = `0.25px solid ${border_color}`;
				adjacentDayCell_5.style.borderBottom = `0.25px solid ${border_color}`;
			}
			if (x < 5 && y >= 1) adjacentDayCell_6.style.borderRight = `0.25px solid ${border_color}`;
			if (x < 5) {
				adjacentDayCell_7.style.borderTop = `0.25px solid ${border_color}`;
				adjacentDayCell_7.style.borderRight = `0.25px solid ${border_color}`;
			}
		}));

		/**
		 * Add mouse-out handler
		 */
		dayCellsArr.forEach(dayCell => dayCell.addEventListener("mouseout", () => {
			var x = parseInt(dayCell.getAttribute("id")[0]);
			var y = parseInt(dayCell.getAttribute("id")[1]);
			var adjacentDayCell_1 = document.getElementById(`${x - 1}${y - 1}`);		
			var adjacentDayCell_2 = document.getElementById(`${x - 1}${y}`);		
			var adjacentDayCell_3 = document.getElementById(`${x - 1}${y + 1}`);		
			var adjacentDayCell_4 = document.getElementById(`${x}${y - 1}`);		
			var adjacentDayCell_5 = document.getElementById(`${x}${y + 1}`);		
			var adjacentDayCell_6 = document.getElementById(`${x + 1}${y - 1}`);		
			var adjacentDayCell_7 = document.getElementById(`${x + 1}${y}`);		
			var adjacentDayCell_8 = document.getElementById(`${x + 1}${y + 1}`);		

			if (x >= 1 && y >= 1) {
				adjacentDayCell_1.style.border = "none";
			}
			if (x >= 1) {
				adjacentDayCell_2.style.border = "none";
			}
			if (x >= 1 && y < 6) {
				adjacentDayCell_3.style.border = "none";
			}
			if (y >= 1) {
				adjacentDayCell_4.style.border = "none";
			}
			if (y < 6) {
				adjacentDayCell_5.style.border = "none";
			}
			if (x < 5 && y >= 1) {
				adjacentDayCell_6.style.border = "none";
			}
			if (x < 5) {
				adjacentDayCell_7.style.border = "none";
			}
		}));	

		/**
		 * Simulating corresponding seasons
		 */
		if (isChristmas) {
			if (parseInt(currentDay) === 25 && parseInt(currentMonth) === 11) {
				infoBar.innerHTML = `<span class="new"></span>`;
				print(`${currentDay} - ${currentMonth + 1} - ${currentYear}`);
				winter(isChristmas);
				currentSeasonMonth = currentMonth;
			}
			else {
				isChristmas = false;
				currentSeasonMonth = null;
				initializeTable(`${parseInt(currentDay) > 25 ? (parseInt(currentMonth) === 11 ? "forward" : "backward") 
								: (parseInt(currentMonth) === 11) ? "backward" : "forward"}-day`);		// Triggering table re-initialisation
			}
		}
		else if ((currentMonth === 11 || (0 <= currentMonth && currentMonth <= 2)) && (!currentSeasonMonth || !isSameSeason())) {
			winter(isChristmas);
			currentSeasonMonth = currentMonth;
		}
		else if (3 <= currentMonth && currentMonth <= 8 && (!currentSeasonMonth || !isSameSeason())) { 
			summer();
			currentSeasonMonth = currentMonth;
		}
		else if (9 <= currentMonth && currentMonth <= 10 && (!currentSeasonMonth || !isSameSeason())) {
			autumn();
			currentSeasonMonth = currentMonth;
		}
	};

	
	/** 
	 * Navigation bar
	*/
	previousButton.className = "prev-btn";
	previousButton.type = "button";
	previousButton.innerHTML += 
	`
		<img src="back.png" alt="Previous month">
	`; 

	nextButton.className = "next-btn";
	nextButton.type = "button";
	nextButton.innerHTML += 
	`
		<img src="next.png" alt="Next month">
	`; 	

	/** 
	 * Triggering table re-initialisation
	*/
	previousButton.addEventListener("click", () => {		
		if (!currentYear && !currentMonth) {
			previousButton.disabled = true;
			previousButton.style.opacity = 0;
			return;
		}
		previousButton.disabled = false;
		previousButton.opacity = 1;
		if (currentMonth > 0) --currentMonth;
		else {
			--currentYear;
			currentMonth = 11;
		}
		initializeTable("backward-month");
	});

	nextButton.addEventListener("click", () => {	
		++currentMonth;	
		if (currentMonth >= 12) {
			++currentYear;
			currentMonth = 0;
		}
		initializeTable("forward-month");
	});

	navigationBar.appendChild(previousButton);
	navigationBar.appendChild(nextButton);
	document.body.appendChild(container);
	container.appendChild(infoBar);
	container.appendChild(table);
	container.appendChild(navigationBar);

	initializeTable();
}




var a = new DatePicker("1");
a.render(new Date("2024-12-2"));
