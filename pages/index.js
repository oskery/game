import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls, PerspectiveCamera } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground, Sphere, Cube } from '../components/'
import { useStore } from '../hooks/useStore'
import { gql } from '@apollo/client'

import client from '../apollo-client'
const QUERY = gql`
  query MyQuery {
    user {
      id
      pos
    }
  }
`

export default function Game({ user }) {
  console.log(user)
  const jumps = useStore((state) => state.jumps)
  return (
    <>
      <div className="scoreboard">Jumps: {jumps}</div>
      <Canvas shadows colorManagement camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={2.8} position={[100, 100, 100]} />
        <PointerLockControls />
        <PerspectiveCamera
          makeDefault
          fov={75}
          rotation={[0.5, Math.PI, 0]}
          position={[0, 40, -50]}
        />
        <Physics gravity={[0, -106, 0]}>
          {false && <Cube position={[0, 1, -10]} />}
          <Ground />
          <Sphere />
        </Physics>
        <PointerLockControls />
      </Canvas>
    </>
  )
}

export async function getServerSideProps(params) {
  const {
    data: { user }
  } = await client.query({
    query: QUERY
  })

  return {
    props: {
      user
    }
  }
}
