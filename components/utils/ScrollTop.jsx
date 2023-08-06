'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ScrollTop = (props) => {
  const path = usePathname()

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, smooth: true })
  }, [path])

  return null
}

export default ScrollTop