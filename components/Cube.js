import { useBox } from '@react-three/cannon'
import { useMatcapTexture } from '@react-three/drei'

export default function Cube({ position, type, ...props }) {
  const [matcap] = useMatcapTexture(
    495, // 220, 384, 427, 443, 474, 495 index of the matcap texture https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
    128 // size of the texture ( 64, 128, 256, 512, 1024 )
  )

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    ...props
  }))

  return (
    <mesh castShadow ref={ref}>
      {[...Array(6)].map((_, index) => (
        <meshMatcapMaterial
          attachArray="material"
          matcap={matcap}
          key={index}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}
