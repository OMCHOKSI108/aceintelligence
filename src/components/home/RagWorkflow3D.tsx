"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import type { Group } from "three";

function Node({
  position,
  label,
  color = "#3b82f6",
  size = 1,
}: {
  position: [number, number, number];
  label: string;
  color?: string;
  size?: number;
}) {
  const meshRef = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#60a5fa" : color}
          emissive={hovered ? "#1e40af" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {hovered && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function Edge({
  start,
  end,
  label,
}: {
  start: [number, number, number];
  end: [number, number, number];
  label?: string;
}) {
  const points = [
    start,
    [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 0.5, (start[2] + end[2]) / 2],
    end,
  ] as [number, number, number][];

  return (
    <group>
      <Line points={points} color="#64748b" lineWidth={2} />
      {label && (
        <Text
          position={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 1, (start[2] + end[2]) / 2]}
          fontSize={0.3}
          color="#94a3b8"
          anchorX="center"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

export function RagWorkflow3D() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
      <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Input Layer */}
        <Node position={[-4, 2, 0]} label="User Query" color="#8b5cf6" />
        <Node position={[-4, -1, 0]} label="Document Upload" color="#8b5cf6" />

        {/* Processing Layer */}
        <Node position={[-1, 2, 0]} label="Text Chunking" color="#3b82f6" />
        <Node position={[-1, 0, 0]} label="Embedding Model" color="#3b82f6" />
        <Node position={[-1, -2, 0]} label="Vector Store (Qdrant)" color="#1d4ed8" size={1.2} />

        {/* Retrieval Layer */}
        <Node position={[2, 2, 0]} label="Similarity Search" color="#10b981" />
        <Node position={[2, 0, 0]} label="Context Assembly" color="#10b981" />
        <Node position={[2, -2, 0]} label="Reranking" color="#059669" />

        {/* Generation Layer */}
        <Node position={[5, 1, 0]} label="LLM (Gemma)" color="#f59e0b" size={1.3} />
        <Node position={[5, -1.5, 0]} label="Citation Engine" color="#d97706" />

        {/* Output Layer */}
        <Node position={[8, 0, 0]} label="Grounded Answer" color="#ef4444" size={1.2} />

        {/* Edges - Input to Processing */}
        <Edge start={[-3, 2, 0]} end={[-1.5, 2, 0]} label="Query" />
        <Edge start={[-3, -1, 0]} end={[-1.5, -2, 0]} label="Doc" />

        {/* Edges - Processing to Retrieval */}
        <Edge start={[-0.5, 2, 0]} end={[1.5, 2, 0]} label="Chunks" />
        <Edge start={[-0.5, 0, 0]} end={[1.5, 0, 0]} label="Vectors" />
        <Edge start={[-0.5, -2, 0]} end={[1.5, -2, 0]} label="Store" />

        {/* Edges - Retrieval to Generation */}
        <Edge start={[2.5, 2, 0]} end={[4.5, 1, 0]} label="Top-K" />
        <Edge start={[2.5, 0, 0]} end={[4.5, 1, 0]} label="Context" />
        <Edge start={[2.5, -2, 0]} end={[4.5, -1.5, 0]} label="Relevance" />

        {/* Edges - Generation to Output */}
        <Edge start={[5.5, 1, 0]} end={[7.5, 0, 0]} label="Answer" />
        <Edge start={[5.5, -1.5, 0]} end={[7.5, 0, 0]} label="Sources" />

        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    </div>
  );
}
