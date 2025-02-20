import './colorpicker.styl';

import React, { Component } from 'react';

// TODO: move this to defaults file
const defaultColor = '#ff0000';

class Colorpicker extends Component {
  constructor (...args) {
    super(...args);
    this.pattern = /^#([a-f0-9]{3}){1,2}$/i;
    this.state = {
      currentColor: defaultColor,
      borderColor: defaultColor
    };
  }

  getInputColor (ev) {
    return ev.target.value.match(this.pattern) ? ev.target.value : defaultColor;
  }

  onChange (ev) {
    const value = this.getInputColor(ev);
    this.setState({
      borderColor: value,
      currentColor: ev.target.value
    });
  }

  onBlur (ev) {
    const value = this.getInputColor(ev);
    this.setState({
      borderColor: value,
      currentColor: value
    });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      borderColor: nextProps.tempColor,
      currentColor: nextProps.tempColor
    });
  }

  getUserColorsList () {
    return this.props.userColors.map(colorObj => colorObj.color);
  }

  onClick () {
    if (!this.state.currentColor.match(this.pattern)) return;
    if (this.getUserColorsList().includes(this.state.currentColor)) return;

    this.props.addColor(this.state.currentColor);
  }

  render () {
    return (
      <div className="colorpicker">
        <div className="colorbar__label"><strong>Add Custom Color</strong></div>
        <input
          type="text"
          ref={inp => this._input = inp}
          value={this.state.currentColor}
          style={{borderColor: this.state.borderColor}}
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)} />
        <input 
          type="color"
          ref={inp => this._input = inp}
          value={this.state.currentColor}
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)} />
        <p></p>
        <div
          className="colorpicker__add"
          onClick={this.onClick.bind(this)}>
          <svg className="colorpicker__add-icon" viewBox="0 0 24 24" width="20" height="45">
            <use xlinkHref="#plus"></use>
          </svg>
        </div>
      </div>
    );
  }
}

export default Colorpicker;

