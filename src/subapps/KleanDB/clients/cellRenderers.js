import React from 'react';
import moment from 'moment';

export class DateWithInfo extends React.Component {

  render() {

    if (this.props.value) {
      const then = moment(this.props.value);

      const formatted = then.format('MMM DD YY')
      const fromNow = then.fromNow();

      return (
        <span style={{color: this.props.color}}><a title={fromNow}>{formatted}</a></span>
      );

    } else {
      return (<span> -- </span>);
    }

  }

}

export const NextPickup = ({value, context}) => (
  <DateWithInfo value={value} color={context.now.isAfter(moment(value)) ? "#e63d10" : "#000000"} />
);

export const EstGal = ({value, data}) => {
  if (value) {
    const percentage = Math.round(value * 100);

    let estimate;
    if (isNaN(data.containerSize)) {
      estimate = '--';
    } else {
      estimate = Math.round(value * data.containerSize);
    }

    let color;
    var fontWeight = "normal";
    if (percentage < 50) {
      color = "#24a80e";
    } else if (percentage < 75) {
      color = "#e3af12";
    } else if (percentage < 90) {
      color = "#ff6300";
    } else {
      color = "#d10000";
      fontWeight = "bold";
    }

    const text = (
      <div>
        <div style={{color: color, fontWeight: fontWeight, float: 'left'}}>{percentage}%</div>
        <div style={{float: 'right'}}>{estimate}</div>
      </div>
    );

    const barStyle = {
      clear: 'both',
      width: `${Math.min(percentage, 100)}%`,
      height: 3,
      backgroundColor: color
    };


    return (
      <div style={{width: '100%'}}>
        {text}
        <div style={barStyle}></div>
      </div>
    );
  } else {
    return <span></span>;
  }
};
