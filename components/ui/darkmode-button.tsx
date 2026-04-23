"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // 🚨 Quan trọng: tránh render khi chưa mount
  if (!mounted) return null

  return theme === "light" ? (
    <Button className={'relative z-100 rounded-xl py-6 bg-white'} variant="outline" size="lg" onClick={() => setTheme("dark")}>
      <Sun className="h-[1.2rem] w-[1.2rem] size-4" />
    </Button>
  ) : (
    <Button className={'relative z-100 rounded-xl py-6'} variant="outline" size="lg" onClick={() => setTheme("light")}>
      <Moon className="h-[1.2rem] w-[1.2rem] size-4" />
    </Button>
  )
}