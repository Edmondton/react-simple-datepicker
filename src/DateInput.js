import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class DateInput extends Component {
  render () {
    const { inputValue, inputOnClick, inputClassName } = this.props;

    return <input type='text'
                  ref='dateInput'
                  className={inputClassName}
                  value={inputValue.format('YYYY-MM-DD')}
                  onClick={inputOnClick}
                  readOnly />;
  }
}

DateInput.propTypes = {
  inputValue: PropTypes.instanceOf(moment),
  inputOnClick: PropTypes.func,
  inputClassName: PropTypes.string
};

DateInput.defaultProps = {
  inputClassName: 'datepicker__input'
};
