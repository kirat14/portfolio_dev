/* import {Person} from './Person'; */
import $ from 'jquery';
import 'bootstrap';
import './scss/style.scss';


// load project dynamically from json file
// use template.html as a loop template
document.addEventListener('DOMContentLoaded', function () {
	var dynamic_content_container = document.getElementById('dynamic-portfolio-container');

	// Your template file path
	var templateFilePath = './template.html';


	// Create a new XMLHttpRequest object for the template file
	var xhr = new XMLHttpRequest();
	xhr.open('GET', templateFilePath, true);

	// Set up a callback function to handle the template file loading
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			// Replace placeholders with data from the current item
			var dynamicContent = xhr.responseText

			// Your JSON file path
			var jsonFilePath = './data/projects.json';

			// Create a new XMLHttpRequest object for the JSON file
			var jsonXhr = new XMLHttpRequest();
			jsonXhr.open('GET', jsonFilePath, true);

			// Set up a callback function to handle the JSON file loading
			jsonXhr.onreadystatechange = function () {
				if (jsonXhr.readyState === 4 && jsonXhr.status === 200) {
					// Parse the JSON data
					var jsonData = JSON.parse(jsonXhr.responseText);

					 // Array to store image elements
					 var imageElements = [];

					// Loop through each item in the JSON data
					jsonData.forEach(function (item) {
						// Create a new image element
						var image = new Image();
						// Attach onload event to the image
						image.onload = function () {
							// Image loaded successfully
							console.log('Image loaded:', item.thumbnail_name);
						};
						// Set image source
						image.src = './img/' + item.thumbnail_name;
						// Store the image element in the array
						imageElements.push(image);
						// Set image source
						image.src = './img/' + item.hd_name;
						// Store the image element in the array
						imageElements.push(image);

						dynamicContent = xhr.responseText;
						dynamicContent = dynamicContent
							.replace('{{tumbnail_image}}', item.thumbnail_name)
							.replace('{{hd_image}}', item.hd_name)
							.replace('{{project_description}}', item.project_description)
							.replaceAll('{{name}}', item.name);

						// Append the dynamic content to the container
						dynamic_content_container.innerHTML += dynamicContent;
					});

					// Function to check if all images are loaded
					function allImagesLoaded() {
						return imageElements.every(function (image) {
							return image.complete;
						});
					}

					// Check if all images are loaded
					function checkImages() {
						if (allImagesLoaded()) {
							// All images are loaded
							console.log('All images loaded');
							isotop_init();
						} else {
							// Not all images are loaded, check again after a delay
							setTimeout(checkImages, 100);
						}
					}

					// Check images initially
					checkImages();

					
				}
			};
			// Send the request for the JSON file
			jsonXhr.send();
		}
	};
	// Send the request for the template file
	xhr.send();

});



function isotop_init() {
	console.log('iso executed');
	// external js: isotope.pkgd.js

	// init Isotope
	var iso = new Isotope('.grid', {
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});

	// filter functions
	var filterFns = {
		// show if number is greater than 50
		numberGreaterThan50: function (itemElem) {
			var number = itemElem.querySelector('.number').textContent;
			return parseInt(number, 10) > 50;
		},
		// show if name ends with -ium
		ium: function (itemElem) {
			var name = itemElem.querySelector('.name').textContent;
			return name.match(/ium$/);
		}
	};

	// bind filter button click
	var filtersElem = document.querySelector('.filters-button-group');

	filtersElem.addEventListener('click', function (event) {
		event.preventDefault();

		if (!matchesSelector(event.target, 'a')) {
			return;
		}

		var filterValue = event.target.getAttribute('data-filter');
		// use matching filter function
		filterValue = filterFns[filterValue] || filterValue;
		iso.arrange({ filter: filterValue });

	});

	// change is-checked class on buttons
	var buttonGroups = document.querySelectorAll('.filters-button-group');
	for (var i = 0, len = buttonGroups.length; i < len; i++) {
		var buttonGroup = buttonGroups[i];
		radioButtonGroup(buttonGroup);
	}

	let view_all = document.getElementById('view-all');
	view_all.addEventListener('click', function (event) {
		event.preventDefault();
		document.getElementById('nav-link-all').click();
	});

	function radioButtonGroup(buttonGroup) {
		buttonGroup.addEventListener('click', function (event) {
			// only work with buttons
			if (!matchesSelector(event.target, 'a')) {
				return;
			}
			buttonGroup.querySelector('.active').classList.remove('active');
			event.target.classList.add('active');
		});
	}

}