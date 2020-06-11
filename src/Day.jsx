import React from 'react';
import classNames from 'classnames/bind';
import styles from './Day.module.scss';

export default function Day(props) {
    const cx = classNames.bind(styles);
    const dayClassNames = cx([
        'day',
        { isAvailable: props.isAvailable },
        { isSelected: props.isSelected },
        { isToday: props.isToday },
        { isWeekString: props.isWeekString },
        {isBooked: props.isBooked}
    ]);
    return (
        <div className={dayClassNames} onClick={props.onClick} >
            {props.children}
        </div>
    )
}