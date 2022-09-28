import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleClick = async (e) => {
        // window.location.href = process.env.REACT_APP_GOOGLE_AUTH_URL
        const a = await axios.get('/login/google')
        console.log(a)
    }

    return (
        <>
            <h1>Login</h1>
            <form
                action={`${process.env.REACT_APP_WEBSITE_BACK}/login`}
                method='post'
            >
                <StyledInput
                    type='email'
                    placeholder='email'
                    name='email'
                    value={email}
                    onChange={handleChangeEmail}
                ></StyledInput>
                <StyledInput
                    type='password'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={handleChangePassword}
                ></StyledInput>
                <button type='submit'>로그인</button>
            </form>
            <button onClick={handleClick}>구글 로그인</button>
        </>
    )
}

const StyledInput = styled.input`
    display: block;
    width: 200px;
    height: 20px;
    margin-bottom: 10px;
`
export default LoginPage
