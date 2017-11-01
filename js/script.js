$(document).ready(function () {

	var input = document.querySelector('#js-input');

	new Slider({
		element: document.querySelector('.js-slider'),
		min: 0,
		max: 10,
		step: 1.2,
		// divisionPer: 70,
		// point: 25,
		callback: function (x) {
			input.value = x;
		}
	});

});