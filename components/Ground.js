import { usePlane } from "@react-three/cannon";
import { useTexture, useNormalTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

export default function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  const texture = useTexture("../images/grass.jpeg");
  texture.repeat.set(100, 100);

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" color="green" />
    </mesh>
  );
}
