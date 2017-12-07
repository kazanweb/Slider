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
			value: 0,
			range: false,
			step: 1,
			point: null,
			division: null,
			beforeDivisionStep: 1,
			afterDivisionStep: 1,
			handleMinus: null,
			handlePlus: null,
			beforeOutSideClickStep: 1,
			afterOutSideClickStep: 1,
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
			this.tags.handleRange = createElement(this.defaults.mainClass + '__range ', this.tags.slider);

			delete this.defaults.element;

			return this;

		},

		getValues: function () {

			this.values.size = this.tags.slider.offsetWidth;

			return this;

		},

		setValuesOutSide: function (value, trigger) {

			var _x;
			this.defaults.value = value;

			if (this.defaults.point && this.defaults.division) {

				if (this.defaults.value <= this.defaults.point) {
					_x = this.defaults.value / this.defaults.point * this.defaults.division;
				} else {
<<<<<<< HEAD
					_x = (((this.defaults.value - this.defaults.point) / (this.defaults.max - this.defaults.point)) * (100 - this.defaults.division)) + this.defaults.division;
=======
					_x = (((((this.defaults.value - this.defaults.point) / (this.defaults.max - this.defaults.point)) * 100) / 100) * this.defaults.division) + this.defaults.division;
>>>>>>> cb168f64f5ff236434a5a23be23db7d94a613fc9
				}
			} else {
				_x = (this.defaults.value / this.defaults.max) * 100;
			}

			if (this.defaults.value <= this.defaults.min) {
				_x = 0;
				this.defaults.value = this.defaults.min;
			} else if (this.defaults.value >= this.defaults.max) {
				_x = 100;
				this.defaults.value = this.defaults.max;
			}

			this.values[trigger] = false;
			this.tags.handleLeft.style.left = _x + '%';

			this.defaults.slide(this.defaults.value, this.defaults, this.tags.handleLeft);
			return this;

		},

		setValues: function (x) {

			var _x;
			var _tmp;

			if (this.defaults.min < this.defaults.max) {

				if (this.defaults.division && this.defaults.point && (this.defaults.point > this.defaults.min && this.defaults.point < this.defaults.max)) {

					if (x <= this.defaults.division) {

						_tmp = x / this.defaults.division;
						_x = Math.round((this.defaults.min + (Math.abs(this.defaults.min * (-1) + this.defaults.point) * _tmp)) / this.defaults.beforeDivisionStep) * this.defaults.beforeDivisionStep;

					} else {

						_tmp = ((x - this.defaults.division) / (100 - this.defaults.division));
						_x = Math.round((this.defaults.point + (Math.abs(this.defaults.point * (-1) + this.defaults.max) * _tmp)) / this.defaults.beforeDivisionStep) * this.defaults.beforeDivisionStep;

					}

				} else {

					_tmp = x / 100;
					_x = Math.round((this.defaults.min + (Math.abs(this.defaults.min * (-1) + this.defaults.max) * _tmp)) / this.defaults.step) * this.defaults.step;

				}

			} else {

				if (this.defaults.division && this.defaults.point && (this.defaults.point > this.defaults.min && this.defaults.point < this.defaults.max)) {

					if (x <= this.defaults.division) {

						_tmp = x / this.defaults.division;
						_x = Math.round((this.defaults.min - (Math.abs(this.defaults.min * (-1) + this.defaults.point) * _tmp)) / this.defaults.beforeDivisionStep) * this.defaults.beforeDivisionStep;

					} else {

						_tmp = ((x - this.defaults.division) / (100 - this.defaults.division));
						_x = Math.round((this.defaults.point - (Math.abs(this.defaults.point * (-1) + this.defaults.max) * _tmp)) / this.defaults.afterDivisionStep) * this.defaults.afterDivisionStep;

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
			this.setValuesOutSide(this.defaults.value);
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

			if (this.defaults.handleMinus) {

				var minus = document.querySelector(this.defaults.handleMinus);

				if (minus) {
					minus.addEventListener(eventsStart, function (e) {

						e.stopPropagation();
						e.preventDefault();
<<<<<<< HEAD
						obj.setValuesOutSide(obj.defaults.value - (obj.defaults.value <= obj.defaults.point ? obj.defaults.beforeOutSideClickStep : obj.defaults.afterOutSideClickStep), 'triggerLeft');
=======
						obj.setValuesOutSide(obj.defaults.value - (obj.defaults.value < obj.defaults.point ? obj.defaults.beforeOutSideClickStep : obj.defaults.afterOutSideClickStep), 'triggerLeft');
>>>>>>> cb168f64f5ff236434a5a23be23db7d94a613fc9

					});

					minus.addEventListener(eventsEnd, function (e) {
						e.stopPropagation();
						e.preventDefault();
					});
				}
			}

			if (this.defaults.handlePlus) {

				var plus = document.querySelector(this.defaults.handlePlus);

				if (plus) {
					plus.addEventListener(eventsStart, function (e) {

						e.stopPropagation();
						e.preventDefault();
<<<<<<< HEAD
						obj.setValuesOutSide(obj.defaults.value + (obj.defaults.value <= obj.defaults.point ? obj.defaults.beforeOutSideClickStep : obj.defaults.afterOutSideClickStep), 'triggerLeft');
=======
						obj.setValuesOutSide(obj.defaults.value + (obj.defaults.value < obj.defaults.point ? obj.defaults.beforeOutSideClickStep : obj.defaults.afterOutSideClickStep), 'triggerLeft');
>>>>>>> cb168f64f5ff236434a5a23be23db7d94a613fc9

					});

					plus.addEventListener(eventsEnd, function (e) {
						e.stopPropagation();
						e.preventDefault();
					});
				}
			}

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

			this.tags.handleRange.addEventListener(eventsEnd, function (e) {

				e.stopPropagation();
				e.preventDefault();
				obj.values[trigger] = false;

				x = (((mobileDetect ? e.touches[0].pageX : e.pageX) - obj.tags.slider.getBoundingClientRect().left) / obj.values.size) * 100;

				if (x < 0) {
					x = 0;
				} else if (x > 100) {
					x = 100;
				}

				element.style.left = x + '%';

				obj.setValues(x);

			}, false);

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