// import React from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
// } from "reactflow";
// import "reactflow/dist/style.css";

// import { useStore } from "./store";
// import { InputNode } from "./nodes/inputNode";
// import { OutputNode } from "./nodes/outputNode";
// import { LLMNode } from "./nodes/llmNode";
// import { TextNode } from "./nodes/textNode";
// import { MathNode } from "./nodes/MathNode";
// import { MergeNode } from "./nodes/MergeNode";
// import { DelayNode } from "./nodes/DelayNode";
// import { LoggerNode } from "./nodes/LoggerNode";

// const nodeTypes = {
// customInput: InputNode,
// customOutput: OutputNode,
//   llm: LLMNode,
//   text: TextNode,
//   math: MathNode,
//   merge: MergeNode,
//   delay: DelayNode,
//   logger: LoggerNode,
// };

// export default function PipelineUI() {
//   const nodes = useStore((s) => s.nodes);
//   const edges = useStore((s) => s.edges);
//   const onNodesChange = useStore((s) => s.onNodesChange);
//   const onEdgesChange = useStore((s) => s.onEdgesChange);
//   const onConnect = useStore((s) => s.onConnect);

//   return (
//     <div style={{ height: "100vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// }
