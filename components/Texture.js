import { useTexture } from "@react-three/drei";

export default function Texture({ type }) {
  const texture = useTexture("../images/grass.jpeg");

  return texture;
}
