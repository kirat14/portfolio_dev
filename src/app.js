/* import {Person} from './Person'; */
import $, { ready } from 'jquery';
import 'bootstrap';
import './scss/style.scss';
// import Swiper JS
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';



const swiper = new Swiper('.swiper', {
	loop: true,
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

$(document).ready(function(){
	console.log(swiper.navigation);
});