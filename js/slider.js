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
			mainClass: 'slider',
			min: 0,
			max: 1000,
			range: false,
			step: 1,
			point: null,
			divisions: null,
			beforeDivisionsStep: null,
			afterDivisionsStep: null,
			beforeClick: null,
			afterClick: null,
			create: function () { },
			slide: function () { }
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

			this.defaults.create.call(this, this.tags.slider, this.defaults, this.tags.handleLeft, mobileDetect);

			this.reinit();
			this.events(this.tags.handleLeft, 'triggerLeft');

			return this;

		},

		createDOM: function () {

			this.tags = {};
			this.tags.slider = this.defaults.element;
			this.tags.handleLeft = createElement(this.defaults.mainClass + '__handle ' + this.defaults.mainClass + '__handle_left', this.tags.slider);

			delete this.defaults.element;

			return this;

		},

		getValues: function () {

			this.values.size = this.tags.slider.offsetWidth;

			return this;

		},

		setValuesOutSide: function (trigger) {

			if (trigger) {
				if (this.defaults.divisions) {
					if (this.defaults.value < this.defaults.point) {
						this.defaults.value = this.defaults.value + this.defaults.beforeClick;
					} else {
						this.defaults.value = this.defaults.value + this.defaults.afterClick;
					}
				} else {
					this.defaults.value = this.defaults.value + 1;
				}
			} else {
				if (this.defaults.divisions) {
					if (this.defaults.value >= this.defaults.point) {
						this.defaults.value = this.defaults.value - this.defaults.afterClick;
					} else {
						this.defaults.value = this.defaults.value - this.defaults.beforeClick;
					}
				} else {
					this.defaults.value = this.defaults.value - 1;
				}
			}

			return this;

		},

		setValues: function (x) {

			var _x;
			var _tmp;

			if (this.defaults.min < this.defaults.max) {

				if (this.defaults.divisions && this.defaults.point && (this.defaults.point > this.defaults.min && this.defaults.point < this.defaults.max)) {

					if (x <= this.defaults.divisions) {

						_tmp = x / this.defaults.divisions;
						_x = Math.round((this.defaults.min + (Math.abs(this.defaults.min * (-1) + this.defaults.point) * _tmp)) / this.defaults.beforeDivisionsStep) * this.defaults.beforeDivisionsStep;

					} else {

						_tmp = ((x - this.defaults.divisions) / (100 - this.defaults.divisions));
						_x = Math.round((this.defaults.point + (Math.abs(this.defaults.point * (-1) + this.defaults.max) * _tmp)) / this.defaults.beforeDivisionsStep) * this.defaults.beforeDivisionsStep;

					}

				} else {

					_tmp = x / 100;
					_x = Math.round((this.defaults.min + (Math.abs(this.defaults.min * (-1) + this.defaults.max) * _tmp)) / this.defaults.step) * this.defaults.step;

				}

			} else {

				if (this.defaults.divisions && this.defaults.point && (this.defaults.point > this.defaults.min && this.defaults.point < this.defaults.max)) {

					if (x <= this.defaults.divisions) {

						_tmp = x / this.defaults.divisions;
						_x = Math.round((this.defaults.min - (Math.abs(this.defaults.min * (-1) + this.defaults.point) * _tmp)) / this.defaults.beforeDivisionsStep) * this.defaults.beforeDivisionsStep;

					} else {

						_tmp = ((x - this.defaults.divisions) / (100 - this.defaults.divisions));
						_x = Math.round((this.defaults.point - (Math.abs(this.defaults.point * (-1) + this.defaults.max) * _tmp)) / this.defaults.afterDivisionsStep) * this.defaults.afterDivisionsStep;

					}

				} else {

					_tmp = x / 100;
					_x = Math.round((this.defaults.min - (Math.abs(this.defaults.min * (-1) + this.defaults.max) * _tmp)) / this.defaults.step) * this.defaults.step;

				}

			}

			if (x <= 0) {
				_x = this.defaults.min;
			}
			else if (x >= 100) {
				_x = this.defaults.max;
			}

			var _t = this.defaults.step.toString().split('.')[1];
			if (_t) {
				_t = _t.length;
			}

			var rounded = function (number) {
				return +number.toFixed(_t ? _t : 1);
			}

			this.defaults.value = rounded(_x);
			this.defaults.slide(rounded(_x), this.defaults, this.tags.handleLeft);

			return this;

		},

		reinit: function () {

			this.getValues();
			this.setValues(0);

			return this;

		},

		events: function (element, trigger) {

			var obj = this;
			this.values[trigger] = false;
			var x;
			var shiftX;
			var eventsStart = mobileDetect ? "touchstart" : "mousedown";
			var eventsMove = mobileDetect ? "touchmove" : "mousemove";
			var eventsEnd = mobileDetect ? "touchend" : "mouseup";

			element.addEventListener('dragstart', function () {
				return false;
			});

			element.addEventListener(eventsStart, function (e) {

				e.stopPropagation();
				obj.values[trigger] = true;
				shiftX = (mobileDetect ? e.touches[0].pageX : e.pageX) - this.offsetLeft - (this.offsetWidth / 2);

			}, false);

			document.addEventListener(eventsMove, function (e) {

				if (!obj.values[trigger]) {
					return false;
				}

				e.preventDefault();
				e.stopPropagation();

				x = (((mobileDetect ? e.touches[0].pageX : e.pageX) - shiftX) / obj.values.size) * 100;

				if (x < 0) {
					x = 0;
				} else if (x > 100) {
					x = 100;
				}

				element.style.left = x + '%';

				obj.setValues(x);

			}, false);

			document.addEventListener(eventsEnd, function (e) {

				e.stopPropagation();
				obj.values[trigger] = false;

			}, false);

			this.tags.slider.addEventListener(eventsEnd, function (e) {

				e.stopPropagation();
				obj.values[trigger] = false;

				x = (((mobileDetect ? e.touches[0].pageX : e.pageX) - obj.tags.slider.getBoundingClientRect().left) / obj.values.size) * 100;

				if (x < 0) {
					x = 0;
				} else if (x > 100) {
					x = 100;
				}

				element.style.left = x + '%';

				obj.setValues(x);

			});

			return this;

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