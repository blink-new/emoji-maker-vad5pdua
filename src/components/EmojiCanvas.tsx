
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { EmojiMesh } from './EmojiMesh'
import { EmojiFeatures } from '../types/emoji'

interface EmojiCanvasProps {
  features: EmojiFeatures
}

export function EmojiCanvas({ features }: EmojiCanvasProps) {
  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <Stage environment="city" intensity={0.5}>
          <EmojiMesh features={features} />
        </Stage>
        <OrbitControls 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}