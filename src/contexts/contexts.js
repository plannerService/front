import { createContext, useState } from 'react'

const DateContext = createContext({
    state: { selectedDate: '', startTime: '', endTime: '' },
    actions: {
        setSelectedDate: () => {},
        setStartTime: () => {},
        setEndTime: () => {},
    },
})

const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const value = {
        state: { selectedDate, startTime, endTime },
        actions: { setSelectedDate, setStartTime, setEndTime },
    }
    return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}
const { DateConsumer } = DateContext

export { DateProvider, DateConsumer }
export default DateContext
