import './styles.css'
import moment from 'moment'
import ScheduleSelector from 'react-schedule-selector'
import { useState, useEffect, useContext } from 'react'
import TimeContext from '../../contexts/contexts'

const Schedule = () => {
    const sheduleDate = '2021-07-15'
    const endTime = '03:00'
    const startTime = '01:00'

    const end = moment
        .utc(sheduleDate)
        .hours(endTime.split(':')[0])
        .minute(endTime.split(':')[1])
        .format('ddd MMM DD YYYY hh:mm')
    const start = moment
        .utc(sheduleDate)
        .hours(startTime.split(':')[0])
        .minutes(startTime.split(':')[1])
        .format('ddd MMM DD YYYY hh:mm')

    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        setSchedule([start, end])
    }, [])

    const handleChange = (newSchedule) => {
        console.log(newSchedule)
        setSchedule(newSchedule)
    }

    return (
        <ScheduleSelector
            selection={schedule}
            numDays={1}
            minTime={0}
            maxTime={24}
            startDate={new Date()}
            dateFormat='ddd'
            onChange={handleChange}
            rowGap='0px'
        />
    )
}

export default Schedule
