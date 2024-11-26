import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UserSignUpPage } from './pages/UserSignupPages/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserSignUpPage />  
  </StrictMode>,
)
