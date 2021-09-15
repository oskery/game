import { usePlane } from '@react-three/cannon'
import { useNormalTexture } from '@react-three/drei'
import { useEffect } from 'react'

export default function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

  const [normalMap] = useNormalTexture(32, {
    offset: [0, 0],
    repeat: [100, 100],
    anisotropy: 8
  })

  useEffect(() => {}, [])

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[25, 25]} />
      <meshStandardMaterial
        attach="material"
        normalMap={normalMap}
        color="#dadb84"
      />
    </mesh>
  )
}
