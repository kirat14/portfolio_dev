/* import {Person} from './Person'; */
import jQuery from 'jquery';
import 'bootstrap';
import './scss/style.scss';
// import Swiper JS
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';



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

	on: {
		realIndexChange: function () {
			let project = swiper_projects[swiper.activeIndex + 1];
			let hd_img = jQuery("#" + project.name + "-hd-img");
			let thumbnail_img = jQuery("#" + project.name + "-thumbnail-img");

			console.log(thumbnail_img.attr('src'));

			if (thumbnail_img.attr('src') === undefined) {
				hd_img.attr("src", "./img/" + project.hd_name);
				thumbnail_img.attr("src", "./img/" + project.thumbnail_name);
			}
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

// Store projects imgs and descriptions
var swiper_projects;
var xhr;
var dynamicContent;
var dynamic_content_container;

// load project dynamically from json file
// use template.html as a loop template
document.addEventListener('DOMContentLoaded', function () {


	dynamic_content_container = document.getElementById('dynamic-portfolio-container');

	// Your template file path
	var templateFilePath = './template.html';


	// Create a new XMLHttpRequest object for the template file
	xhr = new XMLHttpRequest();
	xhr.open('GET', templateFilePath, true);

	// Set up a callback function to handle the template file loading
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			// Replace placeholders with data from the current item
			dynamicContent = xhr.responseText

			// Your JSON file path
			var jsonFilePath = './data/projects.json';

			// Create a new XMLHttpRequest object for the JSON file
			var jsonXhr = new XMLHttpRequest();
			jsonXhr.open('GET', jsonFilePath, true);

			// Set up a callback function to handle the JSON file loading
			jsonXhr.onreadystatechange = function () {
				if (jsonXhr.readyState === 4 && jsonXhr.status === 200) {
					// Parse the JSON data
					swiper_projects = JSON.parse(jsonXhr.responseText);

					swiper_projects.forEach(function (item, index) {
						bind_projects_data(item);
						if (index < 2) {
							jQuery("#" + item.name + "-hd-img").attr("src", "./img/" + item.hd_name);
							jQuery("#" + item.name + "-thumbnail-img").attr("src", "./img/" + item.thumbnail_name);
						}
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

function bind_projects_data(item) {
	dynamicContent = xhr.responseText;
	dynamicContent = dynamicContent
		.replaceAll('{{name}}', item.name);

	// Append the dynamic content to the container
	dynamic_content_container.innerHTML += dynamicContent;
}