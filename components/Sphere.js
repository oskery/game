import { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import { useController } from '../hooks/useController'
import { Vector3 } from 'three'
import { useStore } from '../hooks/useStore'

import { gql, useSubscription } from '@apollo/client'

const QUERY = gql`
  mutation MyQuery {
    user {
      uid
      pos
    }
  }
`

const SPEED = 16

export default function Sphere(props) {
  const uid = useStore((state) => state.uid)
  const { camera } = useThree()
  const { forward, backward, left, right, jump } = useController()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    ...props
  }))
  const velocity = useRef([0, 0, 0])
  const lookAt = new Vector3()

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [api.velocity])

  useFrame(() => {
    if (props.uid !== uid) return
    // copy sphere position to lookAt vector
    ref.current.getWorldPosition(lookAt)

    const direction = new Vector3()

    const sideVector = new Vector3(Number(right) - Number(left), 0, 0)
    const frontVector = new Vector3(0, 0, Number(forward) - Number(backward))

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(ref.current.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    camera.position.set(lookAt.x, 10, lookAt.z - 10)

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05)
      api.velocity.set(velocity.current[0], 20, velocity.current[2])
  })

  return (
    <>
      <mesh castShadow ref={ref}>
        <meshStandardMaterial />
        <sphereBufferGeometry attach="geometry" />
      </mesh>
    </>
  )
}
