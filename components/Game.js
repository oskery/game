import { Canvas } from '@react-three/fiber'
import { Sky, PerspectiveCamera } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground, Sphere, Cube } from '../components/'
import { useStore } from '../hooks/useStore'

import { gql, useSubscription, useMutation } from '@apollo/client'
import { useEffect } from 'react'

const MOVE_POS = gql`
  mutation Move($uid: String!, $pos: jsonb!) {
    update_user(where: { uid: { _eq: $uid } }, _set: { pos: $pos }) {
      affected_rows
    }
  }
`

const SUBSCRIPTION = gql`
  subscription {
    user {
      uid
      pos
    }
  }
`

export default function Game() {
  const jumps = useStore((state) => state.jumps)
  const pos = useStore((state) => state.pos)
  const uid = useStore((state) => state.uid)
  const [move, { data: data2, loading: loading2, error: error2 }] =
    useMutation(MOVE_POS)

  const { data, loading, error } = useSubscription(SUBSCRIPTION)

  useEffect(() => {
    move({ variables: { uid, pos } })
  }, [pos])
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
        {!loading && (
          <Physics gravity={[0, -106, 0]}>
            <Ground />
            {data.user.map(({ uid, pos }) => (
              <Sphere key={pos} position={pos} uid={uid} />
            ))}
          </Physics>
        )}
      </Canvas>
    </>
  )
}
