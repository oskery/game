import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls, PerspectiveCamera } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground, Sphere, Cube } from '../components/'
import { useStore } from '../hooks/useStore'

import { gql, useSubscription } from '@apollo/client'

const QUERY = gql`
  subscription MyQuery {
    user {
      uid
      pos
    }
  }
`

export default function Game() {
  const jumps = useStore((state) => state.jumps)

  const { data, loading, error } = useSubscription(QUERY)

  if (error) {
    console.log(error)
    return <h2>Error!</h2>
  }

  return (
    <>
      <div className="scoreboard">
        <h1>Jumps: {jumps}</h1>
      </div>
      <Canvas shadows colorManagement camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={2.8} position={[100, 100, 100]} />
        <PerspectiveCamera
          makeDefault
          fov={75}
          rotation={[0.5, Math.PI, 0]}
          position={[0, 40, -50]}
        />
        <Physics gravity={[0, -106, 0]}>
          <Ground />
          {!loading &&
            data.user.map(({ uid, pos }) => (
              <Sphere key={uid} position={pos} uid={uid} />
            ))}
        </Physics>
      </Canvas>
    </>
  )
}
