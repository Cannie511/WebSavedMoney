'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const Background = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])
  if (!mounted) return null
  return (
    theme === "light" ? (
        <div
            className="absolute w-full h-screen inset-0 -z-10 "
            style={{
            background: `
            radial-gradient(ellipse 80% 60% at 60% 20%, rgba(175, 109, 255, 0.50), transparent 65%),
                radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.45), transparent 65%),
                radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.43), transparent 62%),
                radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.48), transparent 68%),
                linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
                
            `,
            }}
        />
    ):(
         <div
        className="absolute inset-0 -z-10"
        style={{
            backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
            `,
        }}
        />
    )    
  )
}

export default Background