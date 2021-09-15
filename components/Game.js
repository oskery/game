import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls, PerspectiveCamera } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground, Sphere, Cube } from '../components/'
import { useStore } from '../hooks/useStore'

import { gql, useSubscription } from '@apollo/client'

import client from '../apollo-client'
const QUERY = gql`
  subscription MyQuery {
    user {
      id
      pos
    }
  }
`

export default function Game() {
  const jumps = useStore((state) => state.jumps)

  const { data, loading, error } = useSubscription(QUERY)
  if (loading) {
    return <h2>Loading</h2>
  }
  if (error) {
    console.log(error)
    return <h2>Error!</h2>
  }

  return (
    <>
      <div className="scoreboard">Jumps: {jumps}</div>
      <Canvas shadows colorManagement camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={2.8} position={[100, 100, 100]} />
        {false && <PointerLockControls />}
        <PerspectiveCamera
          makeDefault
          fov={75}
          rotation={[0.5, Math.PI, 0]}
          position={[0, 40, -50]}
        />
        <Physics gravity={[0, -106, 0]}>
          {false && <Cube position={[0, 1, -10]} />}
          <Ground />
          {data.user.map(({ id, pos }) => (
            <Sphere key={id} position={pos} />
          ))}
        </Physics>
      </Canvas>
    </>
  )
}

export async function getServerSideProps(params) {
  const {
    data: { user }
  } = await client.subscribe({
    query: QUERY
  })

  return {
    props: {
      user
    }
  }
}
