var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Pomodoro = function (_React$Component) {_inherits(Pomodoro, _React$Component);
  function Pomodoro(props) {_classCallCheck(this, Pomodoro);var _this = _possibleConstructorReturn(this, (Pomodoro.__proto__ || Object.getPrototypeOf(Pomodoro)).call(this,
    props));_this.












    reset = function () {
      _this.setState({
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25 * 60,
        currTime: 's',
        start: false });

      var audio = document.querySelector('#beep');

      audio.pause();
      audio.currentTime = 0;
      clearInterval(_this.state.intervalID);
    };_this.

    handleController = function (time, action) {
      if (_this.state.start) return;
      timeLength =
      time === 'break' ? _this.state.breakLength : _this.state.sessionLength;
      if (action === '-') {
        if (timeLength <= 1) return;
        timeLength--;
      } else if (action === '+') {
        if (timeLength >= 60) return;
        timeLength++;
      }
      if (time === 'break') {
        _this.setState({ breakLength: timeLength });
        if (_this.state.currTime === 'b') {
          _this.setState({ timeLeft: timeLength * 60 });
        }
      } else if (time === 'session') {
        _this.setState({ sessionLength: timeLength });
        if (_this.state.currTime === 's') {
          _this.setState({ timeLeft: timeLength * 60 });
        }
      }
    };_this.

    startStop = function () {
      if (_this.state.start) {
        clearInterval(_this.state.intervalID);
        _this.setState({ start: false });
      } else {
        _this.setState({ start: true });
        _this.timerStart();
      }
    };_this.
























    timerSwitch = function () {
      var audio = document.querySelector('#beep');
      audio.volume = 0.1;
      audio.currentTime = 0;
      audio.play();
      var nextTime = _this.state.currTime === 's' ? 'b' : 's';
      var timeLeft =
      (nextTime === 's' ? _this.state.sessionLength : _this.state.breakLength) *
      60 +
      1;
      _this.setState({ currTime: nextTime, timeLeft: timeLeft });
      _this.timerStart();
    };_this.state = { breakLength: 5, sessionLength: 25, timeLeft: 25 * 60, start: false, currTime: 's', intervalID: '' };_this.timerStart = _this.timerStart.bind(_this);_this.tick = _this.tick.bind(_this);return _this;}_createClass(Pomodoro, [{ key: 'timerStart', value: function timerStart() {this.setState({ intervalID: setInterval(this.tick, 1000) });} }, { key: 'tick', value: function tick() {var minutes = Math.floor(this.state.timeLeft / 60);var seconds = this.state.timeLeft % 60;if (minutes <= 0 && seconds <= 0) {clearInterval(this.state.intervalID);this.timerSwitch();}this.setState({ timeLeft: this.state.timeLeft - 1 });} }, { key: 'timeLeftToString', value: function timeLeftToString() {var minutes = Math.floor(this.state.timeLeft / 60);var seconds = this.state.timeLeft % 60;minutes = minutes < 10 ? '0' + minutes : minutes;seconds = seconds < 10 ? '0' + seconds : seconds;return minutes + ':' + seconds;} }, { key: 'render', value: function render()
    {var _this2 = this;
      return (
        React.createElement('div', { 'class': 'pomodoro-clock' },
          React.createElement('div', { 'class': 'break' },
            React.createElement('label', { 'class': 'length-label', id: 'break-label' }, 'Break Length'),


            React.createElement('button', {
                'class': 'controller',
                id: 'break-increment',
                onClick: function onClick() {return _this2.handleController('break', '+');} }, '+'),



            React.createElement('label', { 'class': 'length-time', id: 'break-length' },
              this.state.breakLength),

            React.createElement('button', {
                'class': 'controller',
                id: 'break-decrement',
                onClick: function onClick() {return _this2.handleController('break', '-');} }, '-')),




          React.createElement('div', { 'class': 'session' },
            React.createElement('label', { 'class': 'length-label', id: 'session-label' }, 'Session Length'),


            React.createElement('button', {
                'class': 'controller',
                id: 'session-increment',
                onClick: function onClick() {return _this2.handleController('session', '+');} }, '+'),



            React.createElement('label', { 'class': 'length-time', id: 'session-length' },
              this.state.sessionLength),

            React.createElement('button', {
                'class': 'controller',
                id: 'session-decrement',
                onClick: function onClick() {return _this2.handleController('session', '-');} }, '-')),




          React.createElement('div', { 'class': 'timer' },
            React.createElement('label', { id: 'timer-label' }, this.state.currTime === 's' ? "Session" : "Break"),
            React.createElement('label', { id: 'time-left' }, this.timeLeftToString()),
            React.createElement('div', null,
              React.createElement('audio', { id: 'beep', src: 'https://goo.gl/65cBl1' }),
              React.createElement('button', { id: 'start_stop', onClick: this.startStop }, 'Start/Stop'),


              React.createElement('button', { id: 'reset', onClick: this.reset }, 'reset')))));






    } }]);return Pomodoro;}(React.Component);


ReactDOM.render(React.createElement(Pomodoro, null), document.getElementById('pomodoro'));