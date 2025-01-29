// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Login({ setIsAuth }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    try {
      const response = await api.post('/login', { email, password })
      console.log('Авторизация успешна:', response.data)

      // Ставим isAuth в true
      setIsAuth(true)

      // Перебрасываем на /protected1
      navigate('/protected1')
    } catch (error) {
      console.error('Ошибка при логине:', error)
      setErrorMessage(error.response?.data || 'Неизвестная ошибка')
    }
  }

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default Login
