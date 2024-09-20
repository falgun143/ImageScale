"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Appbar from './components/Appbar'

export const Provider = ({children}:{children:React.ReactNode}) => {
  return (
  <SessionProvider>
    <Appbar>
    {children}
    </Appbar>
  </SessionProvider>
  )
}
