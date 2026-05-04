"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html, QuadraticBezierLine } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Group } from "three";

function Node({
  id,
  position,
  label,
  color = "#3b82f6",
  size = 1,
  description,
}: {
  id: string;
  position: [number, number, number];
  label: string;
  color?: string;
  size?: number;
  description: string;
}) {
  const groupRef = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);

  const bobOffset = useMemo(() => {
    return id
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 6;
  }, [id]);

  useEffect(() => {
    let animationFrame = 0;
    const animate = () => {
      if (groupRef.current) {
        const time = performance.now() * 0.001;
        groupRef.current.position.y = position[1] + Math.sin(time * 1.3 + bobOffset) * 0.1;
        groupRef.current.rotation.y = Math.sin(time * 0.55 + bobOffset) * 0.08;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };
    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [bobOffset, position]);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#93c5fd" : color}
          emissive={color}
          emissiveIntensity={hovered ? 0.35 : 0.12}
          roughness={0.28}
          metalness={0.45}
        />
      </mesh>
      <Html
        position={[0, size + 0.65, 0]}
        center
        distanceFactor={10}
        transform
        style={{ pointerEvents: "none" }}
      >
        <div
          className={[
            "rounded-md border px-2 py-1 text-center shadow-md backdrop-blur-sm transition-colors",
            hovered
              ? "border-sky-300/80 bg-slate-900/95"
              : "border-slate-600/70 bg-slate-900/80",
          ].join(" ")}
        >
          <p className="text-[10px] font-semibold leading-tight text-slate-100 md:text-xs">{label}</p>
          <p className="mt-0.5 text-[9px] leading-tight text-slate-300 md:text-[10px]">{description}</p>
        </div>
      </Html>
    </group>
  );
}

function Edge({
  start,
  end,
  label,
  lift = 0.8,
}: {
  start: [number, number, number];
  end: [number, number, number];
  label: string;
  lift?: number;
}) {
  const mid: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + lift,
    (start[2] + end[2]) / 2,
  ];

  return (
    <group>
      <QuadraticBezierLine start={start} end={end} mid={mid} color="#475569" lineWidth={2.1} />
      <Text
        position={[mid[0], mid[1] + 0.25, mid[2]]}
        fontSize={0.22}
        color="#cbd5e1"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

type WorkflowNode = {
  id: string;
  label: string;
  description: string;
  color: string;
  size: number;
  position: [number, number, number];
};

type WorkflowEdge = {
  from: string;
  to: string;
  label: string;
  lift?: number;
};

const NODES: WorkflowNode[] = [
  {
    id: "query",
    label: "User Query",
    description: "Question intent",
    color: "#7c3aed",
    size: 0.78,
    position: [-8.2, 2.3, -0.8],
  },
  {
    id: "doc",
    label: "Document Upload",
    description: "Raw source files",
    color: "#6d28d9",
    size: 0.9,
    position: [-8.2, -1.1, 0.9],
  },
  {
    id: "chunking",
    label: "Text Chunking",
    description: "Segment content",
    color: "#1d4ed8",
    size: 0.8,
    position: [-4.2, 2.5, 0.8],
  },
  {
    id: "embedding",
    label: "Embedding Model",
    description: "Vector encoding",
    color: "#2563eb",
    size: 0.9,
    position: [-4.2, 0, -1.1],
  },
  {
    id: "store",
    label: "Vector Store",
    description: "Qdrant index",
    color: "#0f172a",
    size: 1.03,
    position: [-4.2, -2.5, 0.5],
  },
  {
    id: "search",
    label: "Similarity Search",
    description: "Top semantic hits",
    color: "#047857",
    size: 0.9,
    position: [0, 2.5, -0.6],
  },
  {
    id: "context",
    label: "Context Assembly",
    description: "Build prompt context",
    color: "#059669",
    size: 0.92,
    position: [0, 0, 1.15],
  },
  {
    id: "rerank",
    label: "Reranking",
    description: "Relevance filtering",
    color: "#065f46",
    size: 0.85,
    position: [0, -2.5, -1],
  },
  {
    id: "llm",
    label: "LLM (Gemma)",
    description: "Reason + compose",
    color: "#b45309",
    size: 1.2,
    position: [4.2, 1.2, 0.65],
  },
  {
    id: "citations",
    label: "Citation Engine",
    description: "Attach evidence",
    color: "#92400e",
    size: 0.95,
    position: [4.2, -1.8, -0.85],
  },
  {
    id: "answer",
    label: "Grounded Answer",
    description: "Final response",
    color: "#b91c1c",
    size: 1.1,
    position: [8.3, -0.2, 0],
  },
];

const EDGES: WorkflowEdge[] = [
  { from: "query", to: "chunking", label: "Query", lift: 0.62 },
  { from: "doc", to: "store", label: "Docs", lift: -0.1 },
  { from: "chunking", to: "search", label: "Chunks", lift: 0.72 },
  { from: "embedding", to: "context", label: "Vectors", lift: 0.56 },
  { from: "store", to: "rerank", label: "Index", lift: 0.3 },
  { from: "search", to: "llm", label: "Top-K", lift: 0.95 },
  { from: "context", to: "llm", label: "Context", lift: 0.8 },
  { from: "rerank", to: "citations", label: "Relevance", lift: 0.58 },
  { from: "llm", to: "answer", label: "Answer", lift: 0.8 },
  { from: "citations", to: "answer", label: "Sources", lift: 0.55 },
];

function WorkflowScene({ isMobile }: { isMobile: boolean }) {
  const nodeMap = useMemo(() => {
    const map = new Map<string, WorkflowNode>();
    NODES.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[12, 9, 9]} intensity={1.05} />
      <pointLight position={[-8, -7, -6]} intensity={0.42} />
      <spotLight position={[0, 14, 5]} angle={0.33} intensity={0.45} penumbra={0.7} color="#93c5fd" />

      {NODES.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          position={node.position}
          label={node.label}
          description={node.description}
          color={node.color}
          size={node.size}
        />
      ))}

      {EDGES.map((edge) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) {
          return null;
        }
        return (
          <Edge
            key={`${edge.from}-${edge.to}`}
            start={from.position}
            end={to.position}
            label={edge.label}
            lift={edge.lift}
          />
        );
      })}

      <OrbitControls
        enableZoom
        enablePan={false}
        enableRotate
        minDistance={10}
        maxDistance={21}
        minPolarAngle={Math.PI / 3.3}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={isMobile ? 0.4 : 0.7}
      />
    </>
  );
}

export function RagWorkflow3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const legend = [
    { label: "Input", color: "bg-violet-500", text: "Query + document intake" },
    { label: "Processing", color: "bg-blue-500", text: "Chunking and vectorization" },
    { label: "Retrieval", color: "bg-emerald-500", text: "Search, context, rerank" },
    { label: "Generation", color: "bg-amber-600", text: "LLM + citations" },
    { label: "Output", color: "bg-red-600", text: "Grounded answer" },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-[#071126] p-3 md:p-4">
      <div className="h-[420px] w-full overflow-hidden rounded-xl border border-slate-800 bg-[#081531] md:h-[560px]">
        <Canvas camera={{ position: isMobile ? [0, 3.8, 16] : [0, 4.6, 13.8], fov: isMobile ? 50 : 46 }}>
          <WorkflowScene isMobile={isMobile} />
        </Canvas>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 text-slate-200 sm:grid-cols-2 lg:grid-cols-5">
        {legend.map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-700/80 bg-slate-900/70 px-2 py-2">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <p className="text-xs font-semibold">{item.label}</p>
            </div>
            <p className="mt-1 text-[11px] leading-tight text-slate-400">{item.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-400 md:text-xs">
        Tip: drag to rotate and scroll to zoom for different perspectives of the workflow.
      </p>
    </div>
  );
}
