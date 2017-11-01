$(document).ready(function () {

	var input = document.querySelector('#js-input');

	new Slider({
		element: document.querySelector('.js-slider'),
		min: 0,
		max: 10,
		step: 1.5,
		// borderRange: 70,
		// border: 25,
		callback: function (x) {
			input.value = x;
		}
	});

});