/* import {Person} from './Person'; */
/* import $, { ready } from 'jquery'; */
import 'bootstrap';
import './scss/style.scss';
// import Swiper JS
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';



const swiper = new Swiper('.swiper', {
	slidesPerView: 1,
	spaceBetween: 16,
	modules: [Navigation],

	// Responsive breakpoints
	breakpoints: {
		// when window width is >= 576px
		576: {
			slidesPerView: 2
		}
	},

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});


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
						var thumbnail_image = new Image();
						var hd_image = new Image();
						// Attach onload event to the image
						thumbnail_image.onload = function () {
							// Image loaded successfully
							console.log('Image loaded:', item.thumbnail_name);
						};
						hd_image.onload = function () {
							// Image loaded successfully
							console.log('Image loaded:', item.hd_name);
						};
						// Set image source
						thumbnail_image.src = './img/' + item.thumbnail_name;
						// Store the image element in the array
						imageElements.push(thumbnail_image);

						// Set image source
						hd_image.src = './img/' + item.hd_name;
						// Store the image element in the array
						imageElements.push(hd_image);

						dynamicContent = xhr.responseText;
						dynamicContent = dynamicContent
							.replace('{{tumbnail_image}}', item.thumbnail_name)
							.replaceAll('{{hd_image}}', item.hd_name)
							.replace('{{project_description}}', item.project_description)
							.replaceAll('{{name}}', item.name);

						// Append the dynamic content to the container
						dynamic_content_container.innerHTML += dynamicContent;
					});
				}
			};
			// Send the request for the JSON file
			jsonXhr.send();
		}
	};
	// Send the request for the template file
	xhr.send();

});