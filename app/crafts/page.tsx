"use client";
 
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Float,
  Lightformer,
  Text,
  Html,
  ContactShadows,
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";
 
export default function CarftPage() {
  return (
    <div>
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 50 }}>
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        />
        <ContactShadows
          scale={100}
          position={[0, -7.5, 0]}
          blur={1}
          far={100}
          opacity={0.85}
        />
        {/* <color attach="background" args={["#e0e0e0"]} /> */}
        <Environment preset="city">
          <Lightformer
            intensity={8}
            position={[10, 5, 0]}
            scale={[10, 50, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <EffectComposer disableNormalPass>
          <N8AO aoRadius={1} intensity={2} />
          <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
          <TiltShift2 blur={0.2} />
        </EffectComposer>
        <mesh receiveShadow castShadow>
          <torusGeometry args={[4, 1.2, 128, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
          />
        </mesh>
      </Canvas>
    </div>
  );
}