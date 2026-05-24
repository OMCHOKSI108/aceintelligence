"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Group, Vector3 } from "three";

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
}: {
  start: [number, number, number];
  end: [number, number, number];
  label: string;
}) {
  const points = useMemo(() => {
    const mid: [number, number, number] = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.8,
      (start[2] + end[2]) / 2,
    ];
    return [
      new Vector3(...start),
      new Vector3(...mid),
      new Vector3(...end),
    ];
  }, [start, end]);

  const mid: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + 0.8,
    (start[2] + end[2]) / 2,
  ];

  return (
    <group>
      <Line points={points} color="#475569" lineWidth={2} />
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
};

const NODES: WorkflowNode[] = [
  { id: "query", label: "User Query", description: "Question intent", color: "#7c3aed", size: 0.78, position: [-8.2, 2.3, -0.8] },
  { id: "doc", label: "Document Upload", description: "Raw source files", color: "#6d28d9", size: 0.9, position: [-8.2, -1.1, 0.9] },
  { id: "chunking", label: "Text Chunking", description: "Segment content", color: "#1d4ed8", size: 0.8, position: [-4.2, 2.5, 0.8] },
  { id: "embedding", label: "Embedding Model", description: "Vector encoding", color: "#2563eb", size: 0.9, position: [-4.2, 0, -1.1] },
  { id: "store", label: "Vector Store", description: "Qdrant index", color: "#0f172a", size: 1.03, position: [-4.2, -2.5, 0.5] },
  { id: "search", label: "Similarity Search", description: "Top semantic hits", color: "#047857", size: 0.9, position: [0, 2.5, -0.6] },
  { id: "context", label: "Context Assembly", description: "Build prompt context", color: "#059669", size: 0.92, position: [0, 0, 1.15] },
  { id: "rerank", label: "Reranking", description: "Relevance filtering", color: "#065f46", size: 0.85, position: [0, -2.5, -1] },
  { id: "llm", label: "LLM (Gemma)", description: "Reason + compose", color: "#b45309", size: 1.2, position: [4.2, 1.2, 0.65] },
  { id: "citations", label: "Citation Engine", description: "Attach evidence", color: "#92400e", size: 0.95, position: [4.2, -1.8, -0.85] },
  { id: "answer", label: "Grounded Answer", description: "Final response", color: "#b91c1c", size: 1.1, position: [8.3, -0.2, 0] },
];

const EDGES: WorkflowEdge[] = [
  { from: "query", to: "chunking", label: "Query" },
  { from: "doc", to: "store", label: "Docs" },
  { from: "chunking", to: "search", label: "Chunks" },
  { from: "embedding", to: "context", label: "Vectors" },
  { from: "store", to: "rerank", label: "Index" },
  { from: "search", to: "llm", label: "Top-K" },
  { from: "context", to: "llm", label: "Context" },
  { from: "rerank", to: "citations", label: "Relevance" },
  { from: "llm", to: "answer", label: "Answer" },
  { from: "citations", to: "answer", label: "Sources" },
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

      {NODES.map((node) => (
        <Node key={node.id} {...node} />
      ))}

      {EDGES.map((edge) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        return <Edge key={`${edge.from}-${edge.to}`} start={from.position} end={to.position} label={edge.label} />;
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

function FallbackVisual() {
  const stages = [
    { label: "Intake", color: "bg-violet-500", items: ["Query", "Document Upload"] },
    { label: "Processing", color: "bg-blue-500", items: ["Chunking", "Embeddings"] },
    { label: "Storage", color: "bg-slate-500", items: ["Vector Store"] },
    { label: "Retrieval", color: "bg-emerald-500", items: ["Search", "Context", "Rerank"] },
    { label: "Generation", color: "bg-amber-600", items: ["LLM", "Citations"] },
    { label: "Output", color: "bg-red-600", items: ["Answer"] },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {stages.map((stage, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-full rounded-lg ${stage.color} p-2 text-center`}>
                <span className="text-xs font-semibold text-white">{stage.label}</span>
              </div>
              <div className="mt-1 space-y-1 w-full">
                {stage.items.map((item, j) => (
                  <div key={j} className="rounded bg-slate-800 px-2 py-1 text-center">
                    <span className="text-[10px] text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              {i < stages.length - 1 && (
                <div className="hidden md:block text-slate-600 mt-1 text-xs">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RagWorkflow3D() {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const legend = [
    { label: "Intake", color: "bg-violet-500", text: "Request + context capture" },
    { label: "Policy", color: "bg-blue-500", text: "Approvals and controls" },
    { label: "Execution", color: "bg-emerald-500", text: "Actions, retries, handoffs" },
    { label: "Oversight", color: "bg-amber-600", text: "Human review + audit" },
    { label: "Outcome", color: "bg-red-600", text: "Trusted completion" },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-[#071126] p-3 md:p-4">
      <div className="h-[420px] w-full overflow-hidden rounded-xl border border-slate-800 bg-[#081531] md:h-[560px]">
        {!mounted ? (
          <FallbackVisual />
        ) : hasError ? (
          <FallbackVisual />
        ) : (
          <Suspense fallback={<FallbackVisual />}>
            <Canvas
              camera={{ position: [0, 4.6, 13.8], fov: 46 }}
              onCreated={() => {}}
              onError={() => setHasError(true)}
            >
              <WorkflowScene isMobile={false} />
            </Canvas>
          </Suspense>
        )}
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
