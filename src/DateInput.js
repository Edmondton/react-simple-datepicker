import React from 'react';

export default class DateInput extends React.Component {
  render () {
    const { inputValue, inputOnClick } = this.props;

    return (
      <div>
        <input type='text'
               ref='dateInput'
               className='dateInput'
               value={inputValue.format('YYYY-MM-DD')}
               onClick={inputOnClick} />
      </div>
    );
  }
}
