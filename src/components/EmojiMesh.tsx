
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { EmojiFeatures } from '../types/emoji'
import * as THREE from 'three'

interface EmojiMeshProps {
  features: EmojiFeatures
}

export function EmojiMesh({ features }: EmojiMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  // Create star shape
  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    const points = 5
    const outerRadius = 1
    const innerRadius = 0.5
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i / (points * 2)) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      if (i === 0) {
        shape.moveTo(x, y)
      } else {
        shape.lineTo(x, y)
      }
    }
    shape.closePath()

    const extrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: false
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  // Create heart shape
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    
    shape.moveTo(0, 0)
    shape.bezierCurveTo(-0.5, 0.5, -1, 0.8, 0, 1.5)
    shape.bezierCurveTo(1, 0.8, 0.5, 0.5, 0, 0)
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: false
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  useFrame((state) => {
    if (groupRef.current && features.bouncing) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  const getEyeGeometry = (style: EmojiFeatures['eyeStyle']) => {
    switch (style) {
      case 'star':
        return (
          <mesh position={[0, 0, 0.5]} scale={0.15} rotation={[0, 0, Math.PI / 2]}>
            <primitive object={starGeometry} />
            <meshStandardMaterial color="black" />
          </mesh>
        )
      case 'heart':
        return (
          <mesh position={[0, 0, 0.5]} scale={0.15} rotation={[0, 0, Math.PI]}>
            <primitive object={heartGeometry} />
            <meshStandardMaterial color="black" />
          </mesh>
        )
      case 'wink':
        return (
          <group position={[0, 0, 0.5]}>
            <mesh scale={0.1}>
              <ringGeometry args={[0.3, 0.5, 32]} />
              <meshStandardMaterial color="black" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, 0.01]} scale={0.05}>
              <circleGeometry args={[1, 32]} />
              <meshStandardMaterial color="black" />
            </mesh>
          </group>
        )
      case 'closed':
        return (
          <mesh position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 8]} scale={[0.2, 0.05, 1]}>
            <boxGeometry />
            <meshStandardMaterial color="black" />
          </mesh>
        )
      case 'surprised':
        return (
          <group position={[0, 0, 0.5]}>
            <mesh scale={0.15}>
              <ringGeometry args={[0.3, 0.5, 32]} />
              <meshStandardMaterial color="black" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, 0.01]} scale={0.1}>
              <circleGeometry args={[1, 32]} />
              <meshStandardMaterial color="black" />
            </mesh>
          </group>
        )
      default: // normal
        return (
          <mesh position={[0, 0, 0.5]} scale={0.1}>
            <circleGeometry args={[1, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        )
    }
  }

  return (
    <group ref={groupRef}>
      {/* Main emoji sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={features.color}
          metalness={features.metallic ? 0.8 : 0}
          roughness={features.metallic ? 0.2 : 0.4}
        />
      </mesh>

      {/* Left eye */}
      <group position={[-0.3, 0.2, 0]}>
        {getEyeGeometry(features.eyeStyle)}
      </group>

      {/* Right eye */}
      <group position={[0.3, 0.2, 0]}>
        {features.eyeStyle === 'wink' ? getEyeGeometry('closed') : getEyeGeometry(features.eyeStyle)}
      </group>

      {/* Mouth */}
      <group position={[0, -0.1, 0]}>
        {features.mouthStyle === 'happy' ? (
          <mesh position={[0, 0, 0.5]} scale={[0.5, 0.5, 0.1]} rotation={[0, 0, Math.PI]}>
            <circleGeometry args={[0.5, 32, 0, Math.PI]} />
            <meshStandardMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        ) : (
          <mesh position={[0, -0.2, 0.5]} scale={[0.5, 0.5, 0.1]}>
            <circleGeometry args={[0.5, 32, 0, Math.PI]} />
            <meshStandardMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>

      {/* Accessories */}
      {features.accessories.includes('hat') && (
        <group position={[0, 1.1, 0]}>
          <mesh rotation={[0.2, 0, 0]}>
            <coneGeometry args={[0.7, 1, 32]} />
            <meshStandardMaterial color={features.accessoryColor} />
          </mesh>
        </group>
      )}

      {features.accessories.includes('glasses') && (
        <group position={[0, 0.2, 0.6]}>
          {/* Left lens */}
          <mesh position={[-0.3, 0, 0]}>
            <ringGeometry args={[0.15, 0.2, 32]} />
            <meshStandardMaterial color={features.accessoryColor} side={THREE.DoubleSide} />
          </mesh>
          {/* Right lens */}
          <mesh position={[0.3, 0, 0]}>
            <ringGeometry args={[0.15, 0.2, 32]} />
            <meshStandardMaterial color={features.accessoryColor} side={THREE.DoubleSide} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0, 0]} scale={[0.6, 0.05, 0.05]}>
            <boxGeometry />
            <meshStandardMaterial color={features.accessoryColor} />
          </mesh>
        </group>
      )}
    </group>
  )
}