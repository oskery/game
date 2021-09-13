import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Physics, useSphere, useBox } from '@react-three/cannon'
import { Cube, Ground, Player } from '../components/'

import { useController } from '../hooks/useController'

export default function Game(props) {
  const camera = useRef()

  return (
    <Canvas shadows colorManagement camera={[0, 1, 0]}>
      <Sky sunPosition={[100, 0, 100]} />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} />
        <Cube position={[0, 1, 0]} type="log" />
        <Player position={[0, 3, 10]} />
        {false && (
          <PerspectiveCamera ref={camera} makeDefault position={[0, 33, 10]}>
            <mesh />
          </PerspectiveCamera>
        )}
        <OrbitControls camera={camera.current} />
      </Physics>
    </Canvas>
  )
}
