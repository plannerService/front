import axios from 'axios'
import React, { useState } from 'react'

const DeleteId = () => {
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(
            `${process.env.REACT_APP_WEBSITE_BACK}/deleteId`,
            {
                password: password,
            },
            {
                withCredentials: true,
            }
        )
    }
    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setPassword(value)
    }

    return (
        <>
            <h1>Delete Id</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='비밀번호 입력'
                    value={password}
                    onChange={handleChange}
                ></input>
                <button type='submit'>삭제</button>
            </form>
        </>
    )
}
export default DeleteId
