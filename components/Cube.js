import { useBox } from '@react-three/cannon'
import { useTexture } from '@react-three/drei'

export default function Cube({ position, type, ...props }) {
  const texture = useTexture(`../images/log.jpeg`)

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    ...props
  }))

  return (
    <mesh castShadow ref={ref}>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray="material"
          map={texture}
          key={index}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}
