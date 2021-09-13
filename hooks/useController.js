import { useState, useEffect } from 'react'

function actionByKey(key) {
  const keys = {
    ArrowUp: 'moveForward',
    ArrowDown: 'moveBackward',
    ArrowLeft: 'moveLeft',
    ArrowRight: 'moveRight',
    Space: 'jump'
  }
  return keys[key]
}

export const useController = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false
  })

  const handleKeyDown = (e) => {
    let code = actionByKey(e.code)
    if (code) {
      setMovement((state) => ({
        ...state,
        [code]: true
      }))
    }
  }

  const handleKeyUp = (e) => {
    let code = actionByKey(e.code)
    if (code) {
      setMovement((state) => ({
        ...state,
        [code]: false
      }))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return movement
}
