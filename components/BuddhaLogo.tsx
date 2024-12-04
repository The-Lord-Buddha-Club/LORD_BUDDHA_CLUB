"use client"

import React, { useRef, useEffect } from 'react'
import { GroupProps } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

interface GLTFResult extends GLTF {
  scene: THREE.Group
  nodes: {
    mesh_0 : THREE.Mesh
  }
  materials: {
    'mat_0-buddha_head' : THREE.MeshStandardMaterial
  }
}

interface BuddhaLogoProps extends GroupProps {
  scale?: [number, number, number]
}

const BuddhaLogo: React.FC<BuddhaLogoProps> = ({
  scale, // Default scale
  ...props
}) => {
  const { scene } = useGLTF('/buddha.glb') as GLTFResult
  const meshRef = useRef<THREE.Group>(null!)

  // Check if scene is loaded
  if (!scene) {
    console.warn('GLTF scene not loaded')
    return null
  }

  // Set initial rotation to front view
  useEffect(() => {
    if (meshRef.current) {
      // Ensure rotation values are numbers
      meshRef.current.rotation.set(0, 0, 0)
    }
  }, [])

  return (
    <group
      ref={meshRef}
      scale={scale}
      {...props}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/buddha.glb')

export default BuddhaLogo