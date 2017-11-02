$(document).ready(function () {

	var input = document.querySelector('#js-input');
	var slider;

	slider = new Slider({
		element: document.querySelector('.js-slider'),
		min: 0,
		max: 200000,
		divisionPer: 70,
		point: 10000,
		beforePointStep: 100,
		afterPointStep: 1000,
		create: function (slider, opts, handleLeft, mobileDetect) {

			var obj = this;
			opts.handleLeft = {};
			opts.handleLeft.minus = $('<div class="slider__handle-minus"></div>')[0];
			opts.handleLeft.text = $('<div class="slider__handle-text"></div>')[0];
			opts.handleLeft.plus = $('<div class="slider__handle-plus"></div>')[0];

			handleLeft.appendChild(opts.handleLeft.minus);
			handleLeft.appendChild(opts.handleLeft.text);
			handleLeft.appendChild(opts.handleLeft.plus);

			opts.handleLeft.minus.addEventListener((mobileDetect ? 'touchstart' : 'mousedown'), function (e) {
				e.stopPropagation();
				debugger;
			});

			opts.handleLeft.plus.addEventListener((mobileDetect ? 'touchstart' : 'mousedown'), function (e) {
				e.stopPropagation();
				console.dir(obj)
				debugger;
			});

		},
		slide: function (x) {
			input.value = x;
		}
	});

});