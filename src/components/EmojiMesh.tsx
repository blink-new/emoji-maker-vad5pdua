
import { useRef, useMemo } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { EmojiFeatures } from '../types/emoji'

interface EmojiMeshProps {
  features: EmojiFeatures
}

export function EmojiMesh({ features }: EmojiMeshProps) {
  const meshRef = useRef<Mesh>(null)
  
  const eyeGeometry = useMemo(() => {
    switch (features.eyeStyle) {
      case 'star':
        return <sphereGeometry args={[0.2, 32, 32]} />
      case 'heart':
        return <sphereGeometry args={[0.15, 32, 32]} />
      default:
        return <sphereGeometry args={[0.1, 32, 32]} />
    }
  }, [features.eyeStyle])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    if (features.bouncing) {
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <group>
      {/* Base sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={features.color} 
          metalness={features.metallic ? 0.8 : 0}
          roughness={features.metallic ? 0.2 : 0.8}
        />
      </mesh>

      {/* Eyes */}
      <group position-y={0.2}>
        {/* Left eye */}
        <mesh position={[-0.3, 0, 0.85]}>
          {eyeGeometry}
          <meshStandardMaterial color="black" />
        </mesh>
        {/* Right eye */}
        <mesh position={[0.3, 0, 0.85]}>
          {eyeGeometry}
          <meshStandardMaterial color="black" />
        </mesh>
      </group>

      {/* Mouth */}
      <mesh position={[0, -0.1, 0.85]} rotation-x={features.mouthStyle === 'sad' ? Math.PI : 0}>
        <torusGeometry args={[0.3, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Accessories */}
      {features.accessories.map((accessory, index) => (
        <group key={index} position-y={0.8}>
          {accessory === 'hat' && (
            <mesh rotation-x={-0.5}>
              <coneGeometry args={[0.5, 0.5, 32]} />
              <meshStandardMaterial color={features.accessoryColor} />
            </mesh>
          )}
          {accessory === 'glasses' && (
            <group position-z={0.9}>
              <mesh position={[-0.3, 0, 0]}>
                <torusGeometry args={[0.15, 0.02, 16, 32]} />
                <meshStandardMaterial color={features.accessoryColor} />
              </mesh>
              <mesh position={[0.3, 0, 0]}>
                <torusGeometry args={[0.15, 0.02, 16, 32]} />
                <meshStandardMaterial color={features.accessoryColor} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.02, 0.02]} />
                <meshStandardMaterial color={features.accessoryColor} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  )
}