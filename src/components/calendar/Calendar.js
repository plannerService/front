import React, { useState, useContext } from 'react'
import { Icon } from '@iconify/react'
import { format, addMonths, subMonths } from 'date-fns'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, isSameDay, addDays } from 'date-fns'
import './Calendar.scss'
import DateContext from '../../contexts/contexts'

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className='header row'>
            <div className='col col-start'>
                <span className='text'>
                    <span className='text month'>
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className='col col-end'>
                <Icon icon='bi:arrow-left-circle-fill' onClick={prevMonth} />
                <Icon icon='bi:arrow-right-circle-fill' onClick={nextMonth} />
            </div>
        </div>
    )
}

const RenderDays = () => {
    const days = []
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat']

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className='col' key={i}>
                {date[i]}
            </div>
        )
    }

    return <div className='days row'>{days}</div>
}

const RenderCells = ({ currentMonth, selectedDate, onDateClick, props }) => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd')
            const cloneDay = day
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => {
                        onDateClick(cloneDay)
                    }}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                    <div>
                        {props.props ? (
                            props.props.map((contact, index) => {
                                if (
                                    isSameDay(
                                        cloneDay,
                                        new Date(contact.planDate)
                                    )
                                ) {
                                    return <p key={index}>{contact.planName}</p>
                                } else return null
                            })
                        ) : (
                            <p></p>
                        )}

                        {/* <p>
                            {isSameDay(day, new Date(props.props[1]?.planDate))
                                ? props.props[1]?.planName
                                : 'no'}
                        </p> */}
                    </div>
                </div>
            )
            day = addDays(day, 1)
        }
        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        )
        days = []
    }
    return <div className='body'>{rows}</div>
}

const MainPage = (props) => {
    const { state, actions } = useContext(DateContext)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(state.selectedDate)
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }
    const onDateClick = (day) => {
        actions.setSelectedDate(day)
        setSelectedDate(day)
    }
    return (
        <div className='calendar'>
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
                props={props}
            />
        </div>
    )
}

// https://sennieworld.tistory.com/61 참고
export default MainPage
