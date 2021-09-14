import { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import { useController } from '../hooks/useController'
import { Vector3 } from 'three'
import { PointerLockControls } from '@react-three/drei'

const SPEED = 6

export default function Player(props) {
  const { camera } = useThree()
  const { forward, backward, left, right, jump } = useController()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
    ...props
  }))
  const velocity = useRef([0, 0, 0])

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [api.velocity])

  useFrame(() => {
    ref.current.getWorldPosition(camera.position)
    const direction = new Vector3()

    const sideVector = new Vector3(Number(left) - Number(right), 0, 0)
    const frontVector = new Vector3(0, 0, Number(backward) - Number(forward))

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05)
      api.velocity.set(velocity.current[0], 10, velocity.current[2])
  })

  return (
    <>
      <PointerLockControls />
      <mesh ref={ref} />
    </>
  )
}
