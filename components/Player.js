import { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import { useController } from '../hooks/useController'
import { Vector3 } from 'three'
import { PerspectiveCamera } from '@react-three/drei'

const SPEED = 6

export default function Player(props) {
  const camera = useRef()
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useController()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    ...props
  }))

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [api.velocity])

  useFrame(() => {
    camera.current.position.copy(ref.current.position)
    const direction = new Vector3()

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2])
    }
  })
  return (
    <>
      <PerspectiveCamera ref={camera} makeDefault position={[0, 33, 10]}>
        <mesh ref={ref} />
      </PerspectiveCamera>
    </>
  )
}
