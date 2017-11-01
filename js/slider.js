; (function (global) {

	var mobileDetect = /Android|iPhone|iPad|iPod|BlackBerry|WPDesktop|IEMobile|Opera Mini/i.test(navigator.userAgent);

	var createElement = function (cls, parent) {
		var obj = document.createElement('div');
		obj.className = cls;
		if (parent) {
			parent.appendChild(obj);
		}
		return obj;
	}

	function Slider(opts) {

		this.tags = {};
		this.values = {};

		this.eventsTrigger = mobileDetect ? 'touchend' : 'mouseup';

		this.defaults = this.extend({
			element: '',
			min: 0,
			max: 1000,
			border: null,
			borderRange: null,
			range: false,
			step: 1,
			beforeBorderStep: null,
			afterBorderStep: null,
			callback: function () { }
		}, opts);

		if (!this.defaults.element) {
			return false;
		}

		this.init();
		return this;

	}

	Slider.prototype = {

		init: function () {

			this.createDOM();
			this.reinit();
			this.events(this.tags.handleLeft, 'triggerLeft');

		},

		createDOM: function () {

			this.tags = {};
			this.tags.slider = this.defaults.element;
			this.tags.handleLeft = createElement('slider__handle slider__handle_left', this.tags.slider);

		},

		getValues: function () {

			this.values.width = this.tags.slider.offsetWidth;

		},

		setValues: function (x) {

			var _x;
			var _tmp;

			if (this.defaults.min < this.defaults.max) {

				if (this.defaults.borderRange && this.defaults.border && (this.defaults.border > this.defaults.min && this.defaults.border < this.defaults.max)) {

					if (x <= this.defaults.borderRange) {

						_tmp = x / this.defaults.borderRange;
						_x = this.defaults.min + (Math.abs(this.defaults.min * (-1) + this.defaults.border) * _tmp);

					} else {

						_tmp = ((x - this.defaults.borderRange) / (100 - this.defaults.borderRange));
						_x = this.defaults.border + (Math.abs(this.defaults.border * (-1) + this.defaults.max) * _tmp);

					}

				} else {

					_tmp = x / 100;
					_x = this.defaults.min + (Math.abs(this.defaults.min * (-1) + this.defaults.max) * _tmp);

				}

			} else {

				if (this.defaults.borderRange && this.defaults.border && (this.defaults.border > this.defaults.min && this.defaults.border < this.defaults.max)) {

					if (x <= this.defaults.borderRange) {

						_tmp = x / this.defaults.borderRange;
						_x = this.defaults.min - (Math.abs(this.defaults.min * (-1) + this.defaults.border) * _tmp);

					} else {

						_tmp = ((x - this.defaults.borderRange) / (100 - this.defaults.borderRange));
						_x = this.defaults.border - (Math.abs(this.defaults.border * (-1) + this.defaults.max) * _tmp);

					}

				} else {

					_tmp = x / 100;
					_x = this.defaults.min - (Math.abs(this.defaults.min * (-1) + this.defaults.max) * _tmp);

				}

			}

			this.defaults.callback(parseInt(_x));

		},

		reinit: function () {

			this.getValues();
			this.setValues();

		},

		events: function (element, trigger) {

			var obj = this;
			this.values[trigger] = false;
			var x;
			var shiftX;

			element.addEventListener('dragstart', function () {
				return false;
			});

			element.addEventListener('mousedown', function (e) {

				obj.values[trigger] = true;
				shiftX = e.pageX - this.offsetLeft - (this.offsetWidth / 2);

			}, false);

			document.addEventListener('mousemove', function (e) {

				if (!obj.values[trigger]) {
					return false;
				}

				e.preventDefault();

				x = ((e.pageX - shiftX) / obj.values.width) * 100;

				if (x < 0) {
					x = 0;
				} else if (x > 100) {
					x = 100;
				}

				element.style.left = x + '%';

				obj.setValues(x);

			}, false);

			document.addEventListener('mouseup', function () {

				obj.values[trigger] = false;

			}, false);

		},

		extend: function (defaults, source) {

			for (var key in source) {
				if (source.hasOwnProperty(key)) {
					defaults[key] = source[key];
				}
			}

			return defaults;
		}
	}

	window.Slider = Slider;

})(window);