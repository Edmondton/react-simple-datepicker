import React, { Component } from 'react';
import Day from './Day';
import {
  daysOfMonth,
  weekEnum,
  isDateFromNextMonth,
  isDateFromPrevMonth
} from './utils/';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class Calendar extends Component {
  constructor (props) {
    super(props);

    moment.locale(props.locale);

    this.state = {
      displayedMonth: props.date.clone().startOf('month')
    };
  }

  renderWeeks () {
    const _daysOfMonth = daysOfMonth(this.state.displayedMonth);
    const _weekEnum = weekEnum(_daysOfMonth);

    return _weekEnum.map((week, key) => {
      return (
        <tr key={key}>
          {this.renderDay(_daysOfMonth, week)}
        </tr>
      );
    });
  }

  renderDay (daysOfMonth, week) {
    const days = [0, 1, 2, 3, 4, 5, 6];
    const { minDate, maxDate } = this.props;

    return days.map((day, key) => {
      let date = daysOfMonth[week * 7 + day];
      let disabled;

      if (minDate && maxDate) {
        disabled = date.isBefore(minDate, 'day') || date.isAfter(maxDate, 'day');
      } else if (minDate) {
        disabled = date.isBefore(minDate, 'day');
      } else if (maxDate) {
        disabled = date.isAfter(maxDate, 'day');
      }

      const dayNextMonth = isDateFromNextMonth(date, this.state.displayedMonth);
      const dayPrevMonth = isDateFromPrevMonth(date, this.state.displayedMonth);

      return (
        <Day key={key}
             day={date}
             selectDay={this.selectDay.bind(this, date)}
             disabled={disabled}
             dayPrevMonth={dayPrevMonth}
             dayNextMonth={dayNextMonth}
             active={this.props.date}
             dayClassName={this.props.dayClassName}
             dayActiveClassName={this.props.dayActiveClassName}
             dayDisabledClassName={this.props.dayDisabledClassName}
             dayFromOtherMonthClassName={this.props.dayFromOtherMonthClassName} />
      );
    });
  }

  renderNameOfDays () {
    const nameOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <tr className='calendar__nameofdays'>
        {
          nameOfDays.map((day, i) => <td key={i}>{ day }</td>)
        }
      </tr>
    );
  }

  moveDisplayedMonth (delta) {
    const dm = this.state.displayedMonth;
    this.setState({
      displayedMonth: dm.clone().add(delta, 'months')
    });
  }

  selectDay (date) {
    const { dateFormat } = this.props;
    const formattedDate = dateFormat ? date.format(dateFormat) : null;
    this.props.selectDay(date, formattedDate);
  }

  render () {
    const { calendarClassName, monthClassName, prevMonthClassName, nextMonthClassName } = this.props;

    return (
      <table className={calendarClassName} cellPadding='0' cellSpacing='0'>
        <thead>
          <tr>
            <td className={prevMonthClassName}
                onClick={this.moveDisplayedMonth.bind(this, -1)}>
            </td>
            <td className={monthClassName} colSpan='5'>
              {this.state.displayedMonth.format('MMMM YYYY')}
            </td>
            <td className={nextMonthClassName}
                onClick={this.moveDisplayedMonth.bind(this, 1)}>
            </td>
          </tr>
        </thead>
        <tbody>
          { this.renderNameOfDays() }
          { this.renderWeeks() }
        </tbody>
      </table>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date)
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date)
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date)
  ]),
  calendarClassName: PropTypes.string,
  selectDay: PropTypes.func,
  monthClassName: PropTypes.string,
  prevMonthClassName: PropTypes.string,
  nextMonthClassName: PropTypes.string,
  dayClassName: PropTypes.string,
  dayActiveClassName: PropTypes.string,
  dayDisabledClassName: PropTypes.string,
  dayFromOtherMonthClassName: PropTypes.string,
  locale: PropTypes.string,
  dateFormat: PropTypes.string
};

Calendar.defaultProps = {
  calendarClassName: 'calendar',
  prevMonthClassName: 'calendar__prevMonth',
  nextMonthClassName: 'calendar__nextMonth',
  monthClassName: 'calendar__month',
  locale: 'en',
  dateFormat: false
};
