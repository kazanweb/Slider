$(document).ready(function () {

	var input = document.querySelector('#js-input');

	new Slider({
		element: document.querySelector('.js-slider'),
		min: 0,
		max: 100000,
		callback: function (x) {
			input.value = x;
		}
	});

});