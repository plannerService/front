import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/calendar/Calendar'
import DateContext from './../../contexts/contexts'

const MainPage = () => {
    const [userName, setUserName] = useState('')
    const [plans, setPlans] = useState([])
    const { state } = useContext(DateContext)
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const response = await fetch(`/`, {
            // credentials 옵션 지정 안하면 프론트에서 접속해도 로그인 실패
            // credentials : 자격 증명을 포함하여 요청하게 해주는 옵션
            credentials: 'include',
        })
        const res = await response.json()
        setUserName(res.name)
        setPlans(res.plans)
    }

    const handleClick = async (e) => {
        const response = await fetch(
            `/login`,

            {
                credentials: 'include',
            }
        )
        const res = await response.json()
        if (res.success) {
            window.location.reload()
        }
    }

    return (
        <>
            <div>
                {userName ? (
                    <div>
                        <Link to={'/group'}>그룹원 확인</Link>
                        <p>{userName}</p>
                        <button onClick={handleClick}>로그아웃</button>
                        <button>
                            <Link to={'/deleteId'}>회원탈퇴</Link>
                        </button>
                    </div>
                ) : (
                    <div>
                        <Link to={'/login'}>로그인</Link>
                        <a href='!#'> / </a>
                        <Link to={'/signup'}>회원 fds 가입</Link>
                    </div>
                )}
            </div>
            <Calendar props={plans}></Calendar>

            {userName ? (
                <button>
                    <Link to={'/planning'} state={{ date: state.selectedDate }}>
                        {' '}
                        일정추가
                    </Link>
                </button>
            ) : (
                <p></p>
            )}
        </>
    )
}
// const getUser = async (e) => {

// }
export default MainPage
