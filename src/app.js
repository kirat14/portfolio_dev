/* import {Person} from './Person'; */
import $ from 'jquery';
import 'bootstrap';
import './scss/style.scss';
// import Swiper JS
import Swiper from 'swiper';



const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 1	,
	spaceBetween: 16,

	// Responsive breakpoints
	breakpoints: {
		// when window width is >= 320px
		576: {
			slidesPerView: 2
		},
		// when window width is >= 480px
		768: {
			slidesPerView: 3
		},
		// when window width is >= 640px
		992: {
			slidesPerView: 4
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