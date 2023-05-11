var WebTour = (function () {
  'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var WebTour = function () {
    function WebTour() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, WebTour);
      if (!!this.constructor.instance) {
        return this.constructor.instance;
      }
      this.constructor.instance = this;
      this.options = _objectSpread2({
        animate: true,
        opacity: 0.5,
        offset: 20,
        borderRadius: 3,
        allowClose: true,
        highlight: true,
        highlightOffset: 5,
        keyboard: true,
        width: '300px',
        zIndex: 10050,
        removeArrow: false,
        hideBackButton: false,
        showCloseButton: true,
        onNext: function onNext() {
          return null;
        },
        onPrevious: function onPrevious() {
          return null;
        }
      }, options);
      this.steps = [];
      this.stepIndex = 0;
      this.isRunning = false;
      this.isPaused = false;
      this.window = window;
      this.document = document;
      this.onClick = this.onClick.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.bind();
      return this;
    }
    _createClass(WebTour, [{
      key: "bind",
      value: function bind() {
        if (!('ontouchstart' in this.document.documentElement)) {
          this.window.addEventListener('click', this.onClick, false);
        } else {
          this.window.addEventListener('touchstart', this.onClick, false);
        }
        this.window.addEventListener('resize', this.onResize, false);
        this.window.addEventListener('keyup', this.onKeyUp, false);
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        e.stopPropagation();
        if (e.target.classList.contains('wt-btn-next')) {
          this.onNext();
          this.next();
        }
        if (e.target.classList.contains('wt-btn-back')) {
          this.onPrevious();
          this.previous();
        }
        if (e.target.classList.contains('wt-overlay')) {
          if (this.options.allowClose) {
            this.stop();
          }
        }
      }
    }, {
      key: "onKeyUp",
      value: function onKeyUp(event) {
        if (!this.isRunning || !this.options.keyboard) {
          return;
        }
        if (event.keyCode === 27 && this.options.allowClose) {
          this.stop();
          return;
        }
        if (event.keyCode === 39) {
          this.onNext();
          this.next();
        } else if (event.keyCode === 37) {
          this.onPrevious();
          this.previous();
        }
      }
    }, {
      key: "onResize",
      value: function onResize() {
        if (!this.isRunning) {
          return;
        }
        this.clear();
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "setSteps",
      value: function setSteps(steps) {
        this.steps = null;
        this.steps = steps;
      }
    }, {
      key: "getSteps",
      value: function getSteps() {
        return this.steps;
      }
    }, {
      key: "highlight",
      value: function highlight(element) {
        var _this = this;
        var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return function (element) {
          _this.isRunning = true;
          var element = _this.document.querySelector(element);
          if (element) {
            if (step) {
              _this.steps = null;
              _this.stepIndex = 0;
              _this.steps = step;
              _this.render(_this.steps[_this.stepIndex]);
            } else {
              _this.createOverlay(element, step);
            }
          }
        }(element);
      }
    }, {
      key: "start",
      value: function start() {
        var startIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.isRunning = true;
        this.stepIndex = startIndex;
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.clear();
        this.isRunning = false;
      }
    }, {
      key: "showLoader",
      value: function showLoader() {
        var popover = this.document.querySelector('.wt-popover');
        var loader = this.document.createElement('div');
        loader.classList.add('wt-loader');
        loader.style.zIndex = this.options.zIndex + 10;
        popover.prepend(loader);
      }
    }, {
      key: "moveNext",
      value: function moveNext() {
        this.isPaused = false;
        this.next();
      }
    }, {
      key: "movePrevious",
      value: function movePrevious() {
        this.isPaused = false;
        this.previous();
      }
    }, {
      key: "onNext",
      value: function onNext() {
        if (this.isPaused) return;
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onNext) this.steps[this.stepIndex].onNext();
      }
    }, {
      key: "onPrevious",
      value: function onPrevious() {
        if (this.isPaused) return;
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onPrevious) this.steps[this.stepIndex].onPrevious();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) return;
        this.stepIndex++;
        this.clear();
        if (this.steps.length === 0) return false;
        if (this.stepIndex >= this.steps.length) {
          this.stop();
          return;
        }
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "previous",
      value: function previous() {
        if (this.isPaused) return;
        this.stepIndex--;
        this.clear();
        if (this.steps.length === 0) return false;
        if (this.stepIndex < 0) {
          this.stop();
          return;
        }
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "render",
      value: function render(step) {
        var _this2 = this;
        var element = step.element ? this.document.querySelector(step.element) : null;
        if (element) {
          element.style.position = !element.style.position ? 'relative' : element.style.position;
          var step_highlight = !step.highlight ? true : step.highlight;
          if (this.options.highlight && step_highlight) {
            element.setAttribute('wt-highlight', 'true');
          }
        }
        var popover = this.document.createElement('div');
        popover.classList.add('wt-popover');
        popover.style.borderRadius = this.options.borderRadius + 'px';
        popover.style.zIndex = this.options.zIndex + 10;
        if (step.placement) popover.classList.add(step.placement);
        if (this.options.width) {
          if (typeof this.options.width === 'string') {
            popover.style.width = this.options.width;
          } else if (this.options.width > 0) {
            popover.style.width = this.options.width + 'px';
          }
        }
        if (step.width) {
          if (typeof step.width === 'string') {
            popover.style.width = step.width;
          } else if (step.width > 0) {
            popover.style.width = step.width + 'px';
          }
        }
        var popoverInner = this.document.createElement('div');
        popoverInner.classList.add('wt-popover-inner');
        var title = this.document.createElement('div');
        title.classList.add('wt-title');
        if (step.title) popoverInner.append(title);
        if (step.title) title.innerText = step.title;
        if (this.options.showCloseButton) {
          var closeBtn = this.document.createElement('button');
          closeBtn.classList.add('wt-close');
          closeBtn.innerHTML = '&times;';
          closeBtn.addEventListener('click', function () {
            _this2.stop();
          });
          popoverInner.append(closeBtn);
        }
        var content = this.document.createElement('div');
        content.classList.add('wt-content');
        popoverInner.append(content);
        content.innerHTML = step.content ? step.content : '';
        var showBtns = step.showBtns == null || step.showBtns == 'undefined' ? true : Boolean(step.showBtns);
        if (showBtns) {
          var btnNext = this.document.createElement('button');
          btnNext.classList.add('wt-btns', 'wt-btn-next');
          btnNext.innerHTML = step.btnNext && step.btnNext.text ? step.btnNext.text : this.stepIndex == this.steps.length - 1 ? 'Done' : 'Next &#8594;';
          btnNext.style.backgroundColor = step.btnNext && step.btnNext.backgroundColor ? step.btnNext.backgroundColor : '#7cd1f9';
          btnNext.style.color = step.btnNext && step.btnNext.textColor ? step.btnNext.textColor : '#fff';
          popoverInner.append(btnNext);
          if (!this.options.hideBackButton) {
            var btnBack = this.document.createElement('button');
            btnBack.classList.add('wt-btns', 'wt-btn-back');
            btnBack.innerHTML = step.btnBack && step.btnBack.text ? step.btnBack.text : this.stepIndex == 0 ? 'Close' : '	&#8592; Back';
            btnBack.style.backgroundColor = step.btnBack && step.btnBack.backgroundColor ? step.btnBack.backgroundColor : '#efefef;';
            btnBack.style.color = step.btnBack && step.btnBack.textColor ? step.btnBack.textColor : '#555';
            popoverInner.append(btnBack);
          }
        }
        var arrow = this.document.createElement('div');
        arrow.classList.add('wt-arrow');
        arrow.setAttribute('data-popper-arrow', 'true');
        popover.append(arrow);
        popover.append(popoverInner);
        this.document.body.appendChild(popover);
        if (element) {
          this.positionPopover(element, popover, arrow, step);
          if (this.options.highlight) {
            this.createOverlay(element, step);
          }
        } else {
          popover.classList.add('wt-slides');
          popover.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
          });
          if (this.options.highlight) {
            var overlay = document.createElement('div');
            overlay.classList.add('wt-overlay', 'open');
            overlay.style.zIndex = this.options.zIndex - 10;
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.right = 0;
            overlay.style.bottom = 0;
            this.document.body.appendChild(overlay);
          }
          arrow.remove();
        }
        if (this.options.removeArrow) {
          arrow.remove();
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        var popup = this.document.querySelector('.wt-popover');
        var loader = this.document.querySelector('.wt-loader');
        if (popup) popup.remove();
        if (loader) loader.remove();
        this.document.querySelectorAll('.wt-overlay').forEach(function (element) {
          element.remove();
        });
        this.document.querySelectorAll('*[wt-highlight]').forEach(function (element) {
          element.removeAttribute('wt-highlight');
        });
      }
    }, {
      key: "getWindowOffset",
      value: function getWindowOffset() {
        return {
          height: this.window.innerHeight - (this.window.innerHeight - this.document.documentElement.clientHeight),
          width: this.window.innerWidth - (this.window.innerWidth - this.document.documentElement.clientWidth)
        };
      }
    }, {
      key: "getOffset",
      value: function getOffset(el) {
        var _x = 0;
        var _y = 0;
        var rect = el.getBoundingClientRect();
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }
        _y = parseInt(rect.y) > parseInt(_y) ? rect.y : _y;
        _x = parseInt(rect.x) > parseInt(_x) ? rect.x : _x;
        return {
          top: _y,
          left: _x
        };
      }
    }, {
      key: "getTranslateXY",
      value: function getTranslateXY(element) {
        var style = window.getComputedStyle(element);
        var matrix = new DOMMatrixReadOnly(style.transform);
        return {
          translateX: Math.abs(element.offsetWidth * (matrix.m41 / 100)),
          translateY: Math.abs(element.offsetHeight * (matrix.m42 / 100))
        };
      }
    }, {
      key: "getTranslate3D",
      value: function getTranslate3D(element) {
        var transform = window.getComputedStyle(element, null).getPropertyValue('-webkit-transform');
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/);
        var x, y, z;
        if (!results) {
          return {
            X: 0,
            Y: 0,
            Z: 0
          };
        }
        if (results[1] == '3d') {
          var _results$slice = results.slice(2, 5);
          var _results$slice2 = _slicedToArray(_results$slice, 3);
          x = _results$slice2[0];
          y = _results$slice2[1];
          z = _results$slice2[2];
          return {
            X: x,
            Y: y,
            Z: z
          };
        }
        results.push(0);
        var _results$slice3 = results.slice(5, 8);
        var _results$slice4 = _slicedToArray(_results$slice3, 3);
        x = _results$slice4[0];
        y = _results$slice4[1];
        z = _results$slice4[2];
        return {
          X: x,
          Y: y,
          Z: z
        };
      }
    }, {
      key: "getElementPosition",
      value: function getElementPosition(element) {
        return {
          top: this.getOffset(element).top + this.getTranslate3D(element).Y - (element.style.transform ? this.getTranslateXY(element).translateY : 0),
          left: this.getOffset(element).left + this.getTranslate3D(element).X - (element.style.transform ? this.getTranslateXY(element).translateX : 0)
        };
      }
    }, {
      key: "positionPopover",
      value: function positionPopover(element, popover, arrow, step) {
        var placement = step.placement || 'auto';
        var strategy = step.strategy || 'absolute';
        popover.style.position = strategy;
        arrow.style.position = 'absolute';
        var el_top, el_left;
        el_top = this.getElementPosition(element).top;
        el_left = this.getElementPosition(element).left;
        if (placement == 'auto' || placement == 'auto-start' || placement == 'auto-end') {
          var _arrow = placement.replace('auto', '').trim();
          var new_arrow = '';
          if (el_top + (popover.offsetHeight + this.options.offset) > this.window.innerHeight - 100) {
            if (el_left < this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_left > this.window.innerWidth - this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-end';
            }
            placement = 'top' + new_arrow;
          }
          if (el_left + element.offsetWidth + popover.offsetWidth > this.window.innerWidth) {
            if (el_top < this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_top > this.window.innerHeight - this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            }
            placement = 'left' + new_arrow;
          }
          if (el_left < popover.offsetWidth && element.offsetWidth + popover.offsetWidth < this.window.innerWidth) {
            if (el_top < this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_top > this.window.innerHeight - this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            }
            placement = 'right' + new_arrow;
          }
          if (el_top < popover.offsetHeight + this.options.offset || el_top < 100) {
            if (el_left < this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_left > this.window.innerWidth - this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-end';
            }
            placement = 'bottom' + new_arrow;
          }
          popover.classList.add(placement);
        }
        if (placement == 'top') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left + (element.offsetWidth / 2 - popover.offsetWidth / 2) + 'px';
        } else if (placement == 'top-start') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left - this.options.highlightOffset + 'px';
        } else if (placement == 'top-end') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left + element.offsetWidth + this.options.highlightOffset - popover.offsetWidth + 'px';
        } else if (placement == 'bottom') {
          popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
          popover.style.left = el_left + element.offsetWidth / 2 - popover.offsetWidth / 2 + 'px';
        } else if (placement == 'bottom-start') {
          popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
          popover.style.left = el_left - this.options.highlightOffset + 'px';
        } else if (placement == 'bottom-end') {
          popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
          popover.style.left = el_left + element.offsetWidth + this.options.highlightOffset - popover.offsetWidth + 'px';
        } else if (placement == 'right') {
          popover.style.top = el_top + Math.abs(popover.offsetHeight - element.offsetHeight) / 2 + 'px';
          popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'right-start') {
          popover.style.top = el_top - this.options.highlightOffset + 'px';
          popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'right-end') {
          popover.style.top = el_top + element.offsetHeight - popover.offsetHeight + this.options.highlightOffset + 'px';
          popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'left') {
          popover.style.top = el_top + Math.abs(popover.offsetHeight - element.offsetHeight) / 2 + 'px';
          popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'left-start') {
          popover.style.top = el_top - this.options.highlightOffset + 'px';
          popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'left-end') {
          popover.style.top = el_top + element.offsetHeight - popover.offsetHeight + this.options.highlightOffset + 'px';
          popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
        }
        if (strategy === 'fixed') {
          this.window.scrollTo(0, 0);
        } else {
          popover.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          });
        }
      }
    }, {
      key: "createOverlay",
      value: function createOverlay(element) {
        var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var strategy = step && step.strategy ? step.strategy : 'absolute';
        var overlay1 = document.createElement('div');
        overlay1.classList.add('wt-overlay', 'open', 'overlay1');
        overlay1.style.zIndex = this.options.zIndex - 10;
        var overlay2 = document.createElement('div');
        overlay2.classList.add('wt-overlay', 'open', 'overlay2');
        overlay2.style.zIndex = this.options.zIndex - 10;
        var overlay3 = document.createElement('div');
        overlay3.classList.add('wt-overlay', 'open', 'overlay3');
        overlay3.style.zIndex = this.options.zIndex - 10;
        var overlay4 = document.createElement('div');
        overlay4.classList.add('wt-overlay', 'open', 'overlay4');
        overlay4.style.zIndex = this.options.zIndex - 10;
        this.document.body.appendChild(overlay1);
        this.document.body.appendChild(overlay2);
        this.document.body.appendChild(overlay3);
        this.document.body.appendChild(overlay4);
        var el_top, el_left;
        el_top = this.getElementPosition(element).top;
        el_left = this.getElementPosition(element).left;
        var highlight_offset = this.options.highlightOffset;
        overlay1.style.position = strategy;
        overlay1.style.top = 0;
        overlay1.style.width = el_left - highlight_offset + 'px';
        overlay1.style.height = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay1.style.left = 0;
        overlay2.style.position = strategy;
        overlay2.style.top = 0;
        overlay2.style.right = 0;
        overlay2.style.height = el_top - highlight_offset + 'px';
        overlay2.style.left = el_left - highlight_offset + 'px';
        overlay3.style.position = strategy;
        overlay3.style.top = el_top - highlight_offset + 'px';
        overlay3.style.right = 0;
        overlay3.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay3.style.left = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.position = strategy;
        overlay4.style.top = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay4.style.width = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay4.style.left = 0;
      }
    }]);
    return WebTour;
  }();

  return WebTour;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGU6IHRydWUsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcclxuICAgICAgICAgICAgb2Zmc2V0OiAyMCxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICBhbGxvd0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodE9mZnNldDogNSxcclxuICAgICAgICAgICAga2V5Ym9hcmQ6IHRydWUsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDEwMDUwLFxyXG4gICAgICAgICAgICByZW1vdmVBcnJvdzogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpZGVCYWNrQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBvbk5leHQ6ICgpID0+IG51bGwsXHJcbiAgICAgICAgICAgIG9uUHJldmlvdXM6ICgpID0+IG51bGwsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0ZXBzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL2VsZW1lbnRzXHJcbiAgICAgICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xyXG5cclxuICAgICAgICAvL2V2ZW50c1xyXG4gICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25SZXNpemUgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbktleVVwID0gdGhpcy5vbktleVVwLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYmluZCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYmluZCgpIHtcclxuICAgICAgICBpZiAoISgnb250b3VjaHN0YXJ0JyBpbiB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbkNsaWNrLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXAsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1uZXh0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3dC1idG4tYmFjaycpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3dC1vdmVybGF5JykpIHtcclxuICAgICAgICAgICAgLy9pZiBhbGxvd0Nsb3NlID0gdHJ1ZSBjbG9zZSB3aGVuIGJhY2tkcm9wIGlzIGNsaWNrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcgfHwgIXRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgdGhpcy5vcHRpb25zLmFsbG93Q2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmlnaHQga2V5IGZvciBuZXh0XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25OZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2xlZnQga2V5IGZvciBiYWNrXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHtcclxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9wYWdlIGlzIHJlc2l6ZSB1cGRhdGUgcG9wb3ZlclxyXG4gICAgb25SZXNpemUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2V0IHdlYiB0b3VyIHN0ZXBzXHJcbiAgICBzZXRTdGVwcyhzdGVwcykge1xyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U3RlcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGlnaGxpZ2h0KGVsZW1lbnQsIHN0ZXAgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KGVsZW1lbnQsIHN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vc3RhcnQgdGhlIHdlYiB0b3VyXHJcbiAgICBzdGFydChzdGFydEluZGV4ID0gMCkge1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0ZXBJbmRleCA9IHN0YXJ0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zaG93IGxvYWRlciBwcm9ncmVzc1xyXG4gICAgc2hvd0xvYWRlcigpIHtcclxuICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtcG9wb3ZlcicpO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbG9hZGVyLmNsYXNzTGlzdC5hZGQoJ3d0LWxvYWRlcicpO1xyXG4gICAgICAgIGxvYWRlci5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4ICsgMTA7XHJcbiAgICAgICAgcG9wb3Zlci5wcmVwZW5kKGxvYWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZU5leHQoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVQcmV2aW91cygpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vZXhlY3V0ZSBvbk5leHQgZnVuY3Rpb24oKVxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vbk5leHQpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldmlvdXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuICAgICAgICAvL2V4ZWN1dGUgb25CYWNrIGZ1bmN0aW9uKClcclxuICAgICAgICBpZiAodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0gJiYgdGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0ub25QcmV2aW91cykgdGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0ub25QcmV2aW91cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKmdvIHRvIG5leHQgc3RlcCAqL1xyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnN0ZXBJbmRleCsrO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBJbmRleCA+PSB0aGlzLnN0ZXBzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXZpb3VzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc3RlcEluZGV4LS07XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRkIHRoZSBwb3BvdmVyIHRvIGRvY3VtZW50XHJcbiAgICByZW5kZXIoc3RlcCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gc3RlcC5lbGVtZW50ID8gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0ZXAuZWxlbWVudCkgOiBudWxsO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIGVsZW1lbnQgaXMgcHJlc2VudCBpZiBub3QgbWFrZSBpdCBmbG9hdGluZ1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAhZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA/ICdyZWxhdGl2ZScgOiBlbGVtZW50LnN0eWxlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBzdGVwX2hpZ2hsaWdodCA9ICFzdGVwLmhpZ2hsaWdodCA/IHRydWUgOiBzdGVwLmhpZ2hsaWdodDtcclxuICAgICAgICAgICAgLy9oaWdobGlnaHQgaXMgc2V0IHRvIHRydWVcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQgJiYgc3RlcF9oaWdobGlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd3dC1oaWdobGlnaHQnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BvcG92ZXJcclxuICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXInKTtcclxuICAgICAgICBwb3BvdmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMub3B0aW9ucy5ib3JkZXJSYWRpdXMgKyAncHgnO1xyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xyXG4gICAgICAgIGlmIChzdGVwLnBsYWNlbWVudCkgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKHN0ZXAucGxhY2VtZW50KTsgLy9hZGQgdXNlciBkZWZpbmUgcGxhY2VtZW50IHRvIGNsYXNzIGZvciBwb3NpdGlvbiBpbiBjc3NcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy53aWR0aCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGVwLndpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RlcC53aWR0aCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSBzdGVwLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gc3RlcC53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcG9wb3ZlciBpbm5lciBjb250YWluZXJcclxuICAgICAgICBjb25zdCBwb3BvdmVySW5uZXIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHBvcG92ZXJJbm5lci5jbGFzc0xpc3QuYWRkKCd3dC1wb3BvdmVyLWlubmVyJyk7XHJcblxyXG4gICAgICAgIC8vdGl0bGVcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnd3QtdGl0bGUnKTtcclxuICAgICAgICBpZiAoc3RlcC50aXRsZSkgcG9wb3ZlcklubmVyLmFwcGVuZCh0aXRsZSk7XHJcbiAgICAgICAgaWYgKHN0ZXAudGl0bGUpIHRpdGxlLmlubmVyVGV4dCA9IHN0ZXAudGl0bGU7XHJcblxyXG4gICAgICAgIC8vY2xvc2UgYnV0dG9uXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93Q2xvc2VCdXR0b24pIHtcclxuICAgICAgICAgICAgY29uc3QgY2xvc2VCdG4gPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCd3dC1jbG9zZScpO1xyXG4gICAgICAgICAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XHJcbiAgICAgICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwb3BvdmVySW5uZXIuYXBwZW5kKGNsb3NlQnRuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb250ZW50XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCd3dC1jb250ZW50Jyk7XHJcbiAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IChzdGVwLmNvbnRlbnQgPyBzdGVwLmNvbnRlbnQgOiAnJyk7XHJcblxyXG4gICAgICAgIC8vYnV0dG9uc1xyXG4gICAgICAgIGNvbnN0IHNob3dCdG5zID0gKHN0ZXAuc2hvd0J0bnMgPT0gbnVsbCB8fCBzdGVwLnNob3dCdG5zID09ICd1bmRlZmluZWQnKSA/IHRydWUgOiBCb29sZWFuKHN0ZXAuc2hvd0J0bnMpO1xyXG5cclxuICAgICAgICBpZiAoc2hvd0J0bnMpIHtcclxuICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGJ0bk5leHQuY2xhc3NMaXN0LmFkZCgnd3QtYnRucycsICd3dC1idG4tbmV4dCcpO1xyXG4gICAgICAgICAgICBidG5OZXh0LmlubmVySFRNTCA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHQgPyBzdGVwLmJ0bk5leHQudGV4dCA6ICh0aGlzLnN0ZXBJbmRleCA9PSB0aGlzLnN0ZXBzLmxlbmd0aCAtIDEgPyAnRG9uZScgOiAnTmV4dCAmIzg1OTQ7JykpO1xyXG4gICAgICAgICAgICBidG5OZXh0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LmJhY2tncm91bmRDb2xvciA/IHN0ZXAuYnRuTmV4dC5iYWNrZ3JvdW5kQ29sb3IgOiAnIzdjZDFmOScpO1xyXG4gICAgICAgICAgICBidG5OZXh0LnN0eWxlLmNvbG9yID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQudGV4dENvbG9yID8gc3RlcC5idG5OZXh0LnRleHRDb2xvciA6ICcjZmZmJyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuTmV4dCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmhpZGVCYWNrQnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG5CYWNrID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIGJ0bkJhY2suY2xhc3NMaXN0LmFkZCgnd3QtYnRucycsICd3dC1idG4tYmFjaycpO1xyXG4gICAgICAgICAgICAgICAgYnRuQmFjay5pbm5lckhUTUwgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0ID8gc3RlcC5idG5CYWNrLnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gMCA/ICdDbG9zZScgOiAnXHQmIzg1OTI7IEJhY2snKSk7XHJcbiAgICAgICAgICAgICAgICBidG5CYWNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLmJhY2tncm91bmRDb2xvciA/IHN0ZXAuYnRuQmFjay5iYWNrZ3JvdW5kQ29sb3IgOiAnI2VmZWZlZjsnKTtcclxuICAgICAgICAgICAgICAgIGJ0bkJhY2suc3R5bGUuY29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0Q29sb3IgPyBzdGVwLmJ0bkJhY2sudGV4dENvbG9yIDogJyM1NTUnKTtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuQmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcG9wb3ZlciBhcnJvd1xyXG4gICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKCd3dC1hcnJvdycpO1xyXG4gICAgICAgIGFycm93LnNldEF0dHJpYnV0ZSgnZGF0YS1wb3BwZXItYXJyb3cnLCAndHJ1ZScpO1xyXG4gICAgICAgIHBvcG92ZXIuYXBwZW5kKGFycm93KTtcclxuXHJcbiAgICAgICAgLy9wb3BvdmVyIGlubmVyIGNvbnRhaW5lclxyXG4gICAgICAgIHBvcG92ZXIuYXBwZW5kKHBvcG92ZXJJbm5lcik7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIHBvcG92ZXIgdG8gYm9keVxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3BvdmVyKTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblBvcG92ZXIoZWxlbWVudCwgcG9wb3ZlciwgYXJyb3csIHN0ZXApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KGVsZW1lbnQsIHN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTm8gZWxlbWVudCBpcyBkZWZpbmVcclxuICAgICAgICAqIE1ha2UgcG9wb3ZlciBmbG9hdGluZyAocG9zaXRpb24gY2VudGVyKVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZCgnd3Qtc2xpZGVzJyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJjZW50ZXJcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLmJvdHRvbSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFycm93LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgb3B0aW9uIHRvIHJlbW92ZSBhcnJvdyBiZWNhdXNlIHBvcHBlciBhcnJvd3MgYXJlIG5vdCBwb3NpdGlvbmluZyB3ZWxsXHJcbiAgICAgICAgLy9UT0RPOiBmaXggcG9wcGVyIGFycm93XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVBcnJvdykge1xyXG4gICAgICAgICAgICBhcnJvdy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vcmVtb3ZlIHBvcG92ZXJcclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHZhciBwb3B1cCA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LXBvcG92ZXInKTtcclxuICAgICAgICB2YXIgbG9hZGVyID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtbG9hZGVyJyk7XHJcblxyXG4gICAgICAgIGlmIChwb3B1cCkgcG9wdXAucmVtb3ZlKCk7XHJcbiAgICAgICAgaWYgKGxvYWRlcikgbG9hZGVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53dC1vdmVybGF5JykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKlt3dC1oaWdobGlnaHRdJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnd3QtaGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRXaW5kb3dPZmZzZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCksXHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE9mZnNldChlbCkge1xyXG4gICAgICAgIHZhciBfeCA9IDA7XHJcbiAgICAgICAgdmFyIF95ID0gMDtcclxuICAgICAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICB3aGlsZSAoZWwgJiYgIWlzTmFOKGVsLm9mZnNldExlZnQpICYmICFpc05hTihlbC5vZmZzZXRUb3ApKSB7XHJcbiAgICAgICAgICAgIF94ICs9IGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICBfeSArPSBlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3kgPSBwYXJzZUludChyZWN0LnkpID4gcGFyc2VJbnQoX3kpID8gcmVjdC55IDogX3k7XHJcbiAgICAgICAgX3ggPSBwYXJzZUludChyZWN0LngpID4gcGFyc2VJbnQoX3gpID8gcmVjdC54IDogX3g7XHJcblxyXG4gICAgICAgIHJldHVybiB7IHRvcDogX3ksIGxlZnQ6IF94IH07XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZXQgY3NzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byBmaXhlZCBpc3N1ZXMgd2l0aCB0cmFuc2Zvcm0gZWxlbWVudHNcclxuICAgIGdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxyXG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBET01NYXRyaXhSZWFkT25seShzdHlsZS50cmFuc2Zvcm0pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZVg6IE1hdGguYWJzKGVsZW1lbnQub2Zmc2V0V2lkdGggKiAobWF0cml4Lm00MSAvIDEwMCkpLFxyXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiBNYXRoLmFicyhlbGVtZW50Lm9mZnNldEhlaWdodCAqIChtYXRyaXgubTQyIC8gMTAwKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZXQgY3NzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byBmaXhlZCBpc3N1ZXMgd2l0aCB0cmFuc2Zvcm0gZWxlbWVudHNcclxuICAgIGdldFRyYW5zbGF0ZTNEKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcclxuICAgICAgICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX0uKykpKD86LCAoLXswLDF9LispKVxcKSkvKTtcclxuXHJcbiAgICAgICAgbGV0IHgsIHksIHo7XHJcbiAgICAgICAgaWYgKCFyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IFg6IDAsIFk6IDAsIFo6IDAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdHNbMV0gPT0gJzNkJykge1xyXG4gICAgICAgICAgICBbeCwgeSwgel0gPSByZXN1bHRzLnNsaWNlKDIsIDUpO1xyXG4gICAgICAgICAgICByZXR1cm4geyBYOiB4LCBZOiB5LCBaOiB6IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHRzLnB1c2goMCk7XHJcbiAgICAgICAgW3gsIHksIHpdID0gcmVzdWx0cy5zbGljZSg1LCA4KTtcclxuICAgICAgICByZXR1cm4geyBYOiB4LCBZOiB5LCBaOiB6IH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6ICh0aGlzLmdldE9mZnNldChlbGVtZW50KS50b3AgKyB0aGlzLmdldFRyYW5zbGF0ZTNEKGVsZW1lbnQpLlkpIC0gKGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVZIDogMCksXHJcbiAgICAgICAgICAgIGxlZnQ6ICh0aGlzLmdldE9mZnNldChlbGVtZW50KS5sZWZ0ICsgdGhpcy5nZXRUcmFuc2xhdGUzRChlbGVtZW50KS5YKSAtIChlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA/IHRoaXMuZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkudHJhbnNsYXRlWCA6IDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcG9zaXRpb24gcG9wb3ZlclxyXG4gICAgcG9zaXRpb25Qb3BvdmVyKGVsZW1lbnQsIHBvcG92ZXIsIGFycm93LCBzdGVwKSB7XHJcbiAgICAgICAgdmFyIHBsYWNlbWVudCA9IHN0ZXAucGxhY2VtZW50IHx8ICdhdXRvJztcclxuICAgICAgICB2YXIgc3RyYXRlZ3kgPSBzdGVwLnN0cmF0ZWd5IHx8ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcclxuICAgICAgICBhcnJvdy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XHJcbiAgICAgICAgdmFyIGVsX3RvcCwgZWxfbGVmdDtcclxuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7XHJcbiAgICAgICAgZWxfbGVmdCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLmxlZnQ7XHJcblxyXG4gICAgICAgIC8vaWYgcGxhY2VtZW50IGlzIG5vdCBkZWZpbmVkIG9yIGF1dG8gdGhlbiBjYWxjdWxhdGUgbG9jYXRpb25cclxuICAgICAgICBpZiAocGxhY2VtZW50ID09ICdhdXRvJyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tc3RhcnQnIHx8IHBsYWNlbWVudCA9PSAnYXV0by1lbmQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycm93ID0gcGxhY2VtZW50LnJlcGxhY2UoJ2F1dG8nLCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgbmV3X2Fycm93ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0b3BcclxuICAgICAgICAgICAgaWYgKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpID4gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDApIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF9sZWZ0ID4gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctZW5kJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICd0b3AnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gdGhlIGxlZnRcclxuICAgICAgICAgICAgaWYgKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHBvcG92ZXIub2Zmc2V0V2lkdGgpID4gdGhpcy53aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX3RvcCA8ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX3RvcCA+ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ2xlZnQnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0aGUgcmlnaHRcclxuICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCBwb3BvdmVyLm9mZnNldFdpZHRoICYmIChlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPCB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfdG9wID4gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAncmlnaHQnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byBib3R0b21cclxuICAgICAgICAgICAgaWYgKGVsX3RvcCA8IChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpIHx8IGVsX3RvcCA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX2xlZnQgPiAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1lbmQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ2JvdHRvbScgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRvIGNsYXNzIGZvciBjc3NcclxuICAgICAgICAgICAgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKHBsYWNlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RvcFxyXG4gICAgICAgIGlmIChwbGFjZW1lbnQgPT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoKGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSAtIChwb3BvdmVyLm9mZnNldFdpZHRoIC8gMikpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3RvcC1zdGFydCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gZWxfbGVmdCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICd0b3AtZW5kJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgLSBwb3BvdmVyLm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2JvdHRvbVxyXG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2JvdHRvbS1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgLSBwb3BvdmVyLm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xlZnRcclxuICAgICAgICBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyAoTWF0aC5hYnMocG9wb3Zlci5vZmZzZXRIZWlnaHQgLSBlbGVtZW50Lm9mZnNldEhlaWdodCkgLyAyKSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQtc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gZWxfdG9wIC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdyaWdodC1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgLSBwb3BvdmVyLm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyAoTWF0aC5hYnMocG9wb3Zlci5vZmZzZXRIZWlnaHQgLSBlbGVtZW50Lm9mZnNldEhlaWdodCkgLyAyKSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdC1zdGFydCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSBlbF90b3AgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQtZW5kJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9ICgoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpIC0gcG9wb3Zlci5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiBwb3NpdGlvbiBpcyBmaXhlZCBzY3JvbGwgdG8gdG9wXHJcbiAgICAgICAgaWYgKHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJuZWFyZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU92ZXJsYXkoZWxlbWVudCwgc3RlcCA9IG51bGwpIHtcclxuICAgICAgICB2YXIgc3RyYXRlZ3kgPSAoc3RlcCAmJiBzdGVwLnN0cmF0ZWd5KSA/IHN0ZXAuc3RyYXRlZ3kgOiAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgICB2YXIgb3ZlcmxheTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5MS5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTEnKTtcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcblxyXG4gICAgICAgIHZhciBvdmVybGF5MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG92ZXJsYXkyLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MicpO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXkzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTMuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXkzJyk7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG5cclxuICAgICAgICB2YXIgb3ZlcmxheTQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5NC5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTQnKTtcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIHRvIGJvZHlcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTEpO1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5Mik7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkzKTtcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTQpO1xyXG5cclxuICAgICAgICAvL2VsZW1lbnQgdG9wICYgbGVmdFxyXG4gICAgICAgIHZhciBlbF90b3AsIGVsX2xlZnQ7XHJcbiAgICAgICAgZWxfdG9wID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkudG9wO1xyXG4gICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0O1xyXG5cclxuICAgICAgICB2YXIgaGlnaGxpZ2h0X29mZnNldCA9IHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQ7XHJcblxyXG4gICAgICAgIC8vb3ZlcmxheXMgdG9wLWxlZnRcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUud2lkdGggPSBlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuaGVpZ2h0ID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLmxlZnQgPSAwO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIHRvcC1yaWdodFxyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUudG9wID0gMDtcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUuaGVpZ2h0ID0gKGVsX3RvcCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcblxyXG4gICAgICAgIC8vb3ZlcmxheXMgYm90dG9tLXJpZ2h0XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcclxuICAgICAgICBvdmVybGF5My5zdHlsZS50b3AgPSAoZWxfdG9wIC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnJpZ2h0ID0gMDtcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5ib3R0b20gPSAwIC0gKHRoaXMuZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSB0aGlzLndpbmRvdy5pbm5lckhlaWdodCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcblxyXG4gICAgICAgIC8vb3ZlcmxheXMgYm90dG9tLWxlZnRcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS53aWR0aCA9IGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUuYm90dG9tID0gMCAtICh0aGlzLmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS5sZWZ0ID0gMDtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sIm5hbWVzIjpbIldlYlRvdXIiLCJvcHRpb25zIiwiY29uc3RydWN0b3IiLCJpbnN0YW5jZSIsIl9vYmplY3RTcHJlYWQiLCJhbmltYXRlIiwib3BhY2l0eSIsIm9mZnNldCIsImJvcmRlclJhZGl1cyIsImFsbG93Q2xvc2UiLCJoaWdobGlnaHQiLCJoaWdobGlnaHRPZmZzZXQiLCJrZXlib2FyZCIsIndpZHRoIiwiekluZGV4IiwicmVtb3ZlQXJyb3ciLCJoaWRlQmFja0J1dHRvbiIsInNob3dDbG9zZUJ1dHRvbiIsIm9uTmV4dCIsIm9uUHJldmlvdXMiLCJzdGVwcyIsInN0ZXBJbmRleCIsImlzUnVubmluZyIsImlzUGF1c2VkIiwid2luZG93IiwiZG9jdW1lbnQiLCJvbkNsaWNrIiwiYmluZCIsIm9uUmVzaXplIiwib25LZXlVcCIsImRvY3VtZW50RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJuZXh0IiwicHJldmlvdXMiLCJzdG9wIiwiZXZlbnQiLCJrZXlDb2RlIiwiY2xlYXIiLCJyZW5kZXIiLCJlbGVtZW50Iiwic3RlcCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVPdmVybGF5Iiwic3RhcnRJbmRleCIsInBvcG92ZXIiLCJsb2FkZXIiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwic3R5bGUiLCJwcmVwZW5kIiwibGVuZ3RoIiwicG9zaXRpb24iLCJzdGVwX2hpZ2hsaWdodCIsInNldEF0dHJpYnV0ZSIsInBsYWNlbWVudCIsInBvcG92ZXJJbm5lciIsInRpdGxlIiwiYXBwZW5kIiwiaW5uZXJUZXh0IiwiY2xvc2VCdG4iLCJpbm5lckhUTUwiLCJjb250ZW50Iiwic2hvd0J0bnMiLCJCb29sZWFuIiwiYnRuTmV4dCIsInRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInRleHRDb2xvciIsImJ0bkJhY2siLCJhcnJvdyIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInBvc2l0aW9uUG9wb3ZlciIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJibG9jayIsImlubGluZSIsIm92ZXJsYXkiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJyZW1vdmUiLCJwb3B1cCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbm5lcldpZHRoIiwiY2xpZW50V2lkdGgiLCJlbCIsIl94IiwiX3kiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXNOYU4iLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsIm9mZnNldFBhcmVudCIsInBhcnNlSW50IiwieSIsIngiLCJnZXRDb21wdXRlZFN0eWxlIiwibWF0cml4IiwiRE9NTWF0cml4UmVhZE9ubHkiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2xhdGVYIiwiTWF0aCIsImFicyIsIm9mZnNldFdpZHRoIiwibTQxIiwidHJhbnNsYXRlWSIsIm9mZnNldEhlaWdodCIsIm00MiIsImdldFByb3BlcnR5VmFsdWUiLCJyZXN1bHRzIiwibWF0Y2giLCJ6IiwiWCIsIlkiLCJaIiwic2xpY2UiLCJwdXNoIiwiZ2V0T2Zmc2V0IiwiZ2V0VHJhbnNsYXRlM0QiLCJnZXRUcmFuc2xhdGVYWSIsInN0cmF0ZWd5IiwiZWxfdG9wIiwiZWxfbGVmdCIsImdldEVsZW1lbnRQb3NpdGlvbiIsInJlcGxhY2UiLCJ0cmltIiwibmV3X2Fycm93Iiwic2Nyb2xsVG8iLCJvdmVybGF5MSIsIm92ZXJsYXkyIiwib3ZlcmxheTMiLCJvdmVybGF5NCIsImhpZ2hsaWdodF9vZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBcUJBLE9BQU8sR0FBQSxZQUFBO0lBQ3hCLFNBQTBCLE9BQUEsR0FBQTtNQUFBLElBQWRDLE9BQU8sR0FBRyxTQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQUFFLENBQUE7RUFBQSxJQUFBLGVBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7RUFDcEIsSUFBQSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUNDLFdBQVcsQ0FBQ0MsUUFBUSxFQUFFO0VBQzdCLE1BQUEsT0FBTyxJQUFJLENBQUNELFdBQVcsQ0FBQ0MsUUFBUSxDQUFBO0VBQ3BDLEtBQUE7RUFFQSxJQUFBLElBQUksQ0FBQ0QsV0FBVyxDQUFDQyxRQUFRLEdBQUcsSUFBSSxDQUFBO0VBRWhDLElBQUEsSUFBSSxDQUFDRixPQUFPLEdBQUFHLGNBQUEsQ0FBQTtFQUNSQyxNQUFBQSxPQUFPLEVBQUUsSUFBSTtFQUNiQyxNQUFBQSxPQUFPLEVBQUUsR0FBRztFQUNaQyxNQUFBQSxNQUFNLEVBQUUsRUFBRTtFQUNWQyxNQUFBQSxZQUFZLEVBQUUsQ0FBQztFQUNmQyxNQUFBQSxVQUFVLEVBQUUsSUFBSTtFQUNo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
