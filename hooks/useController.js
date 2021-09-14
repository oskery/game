import { useState, useEffect } from 'react'

function moveByKey(key) {
  switch (key) {
    case 'ArrowUp':
    case 'KeyW':
      return 'forward'
    case 'ArrowDown':
    case 'KeyS':
      return 'backward'
    case 'ArrowLeft':
    case 'KeyA':
      return 'left'
    case 'ArrowRight':
    case 'KeyD':
      return 'right'
    case 'Space':
      return 'jump'
    default:
      return
  }
}

export const useController = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      let code = moveByKey(e.code)
      if (code)
        setMovement((state) => ({
          ...state,
          [code]: true
        }))
    }
    const handleKeyUp = (e) => {
      let code = moveByKey(e.code)
      if (code)
        setMovement((state) => ({
          ...state,
          [code]: false
        }))
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    movement.forward && console.log('går framåt')
  }, [movement])

  return movement
}
