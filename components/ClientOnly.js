// components/ClientOnly.js

import { useEffect, useState } from 'react'

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <div style={{ width: '100%' }} {...delegated}>
      {children}
    </div>
  )
}
