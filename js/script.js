$(document).ready(function () {

	var input = document.querySelector('#js-input');

	(function (params) {

		var jsSlider = document.querySelector('.js-slider');

		if (!jsSlider) {
			return false;
		}

		slider = new Slider({
			element: document.querySelector('.js-slider'),
			min: parseInt(jsSlider.getAttribute('data-min')),
			max: parseInt(jsSlider.getAttribute('data-max')),
			divisions: parseInt(jsSlider.getAttribute('data-divisions')),
			point: parseInt(jsSlider.getAttribute('data-point')),
			beforeDivisionsStep: parseInt(jsSlider.getAttribute('data-beforedivisionsstep')),
			afterDivisionsStep: parseInt(jsSlider.getAttribute('data-afterdivisionsstep')),
			beforeClick: parseInt(jsSlider.getAttribute('data-beforeclick')),
			afterClick: parseInt(jsSlider.getAttribute('data-afterclick')),
			create: function (slider, opts, handleLeft, mobileDetect) {

				var obj = this;
				opts.tags = {};
				opts.tags.minus = $('<div class="slider__handle-minus"></div>')[0];
				opts.tags.text = $('<div class="slider__handle-text"></div>')[0];
				opts.tags.plus = $('<div class="slider__handle-plus"></div>')[0];

				handleLeft.appendChild(opts.tags.minus);
				handleLeft.appendChild(opts.tags.text);
				handleLeft.appendChild(opts.tags.plus);

				opts.tags.minus.addEventListener((mobileDetect ? 'touchstart' : 'mousedown'), function (e) {

					e.stopPropagation();

					obj.setValuesOutSide(false);

				});

				opts.tags.plus.addEventListener((mobileDetect ? 'touchstart' : 'mousedown'), function (e) {

					e.stopPropagation();

					obj.setValuesOutSide(true);

				});

			},
			slide: function (x, opts, handleLeft) {

				input.value = x;
				opts.tags.text.innerHTML = x;
				handleLeft.style.marginLeft = (opts.tags.text.offsetWidth / 2) * (-1) + 'px';

			}
		});

	})();

});