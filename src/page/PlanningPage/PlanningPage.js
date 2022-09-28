import axios from 'axios'
import React, { useState, useContext } from 'react'
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom'
import Schedule from '../../components/Schedule/Schedule'
import TimeContext from '../../contexts/contexts'

const PlanningPage = () => {
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [planName, setPlanName] = useState('')
    const { state } = useContext(TimeContext)

    const location = useLocation()
    const dateObject = location.state?.date
    const year = format(dateObject, 'yyyy')
    const month = format(dateObject, 'M')
    const day = format(dateObject, 'dd')
    const handleStartChange = (e) => {
        e.preventDefault()
        setStart(e.target.value)
    }
    const handleEndChange = (e) => {
        e.preventDefault()
        setEnd(e.target.value)
    }
    const handleNameChange = (e) => {
        e.preventDefault()
        setPlanName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const planDate = dateObject.toString()
        const res = await axios.post(
            `/addPlans`,
            {
                startTime: start,
                endTime: end,
                planName: planName,
                planDate: planDate,
            },
            {
                withCredentials: true,
            }
        )
        if (res.sucess) {
        }
    }

    return (
        <>
            <header>
                <h1>
                    {year}년 {month} 월{day}일
                </h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        onChange={handleStartChange}
                        value={start}
                        placeholder='시작 시간'
                    ></input>
                </div>
                <div>
                    <input
                        onChange={handleEndChange}
                        value={end}
                        placeholder='종료 시간'
                    ></input>
                </div>
                <div>
                    <input
                        onChange={handleNameChange}
                        value={planName}
                        placeholder='계획 이름'
                    ></input>
                </div>
                <button type='submit'>제출</button>
            </form>
            <div style={{ width: '50%' }}>
                <Schedule></Schedule>
            </div>
        </>
    )
}

export default PlanningPage
