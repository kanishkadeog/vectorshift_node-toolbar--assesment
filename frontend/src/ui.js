// frontend/src/ui.js
import { useRef, useCallback, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from "./nodes/MathNode";
import { MergeNode } from "./nodes/MergeNode";
import { DelayNode } from "./nodes/DelayNode";
import { LoggerNode } from "./nodes/LoggerNode";



const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  merge: MergeNode,
  delay: DelayNode,
  logger: LoggerNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // ✅ INDIVIDUAL SELECTORS (NO OBJECT SELECTOR)
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const addNode = useStore((s) => s.addNode);
  const onNodesChange = useStore((s) => s.onNodesChange);
  const onEdgesChange = useStore((s) => s.onEdgesChange);
  const onConnect = useStore((s) => s.onConnect);
  const generateNodeID = useStore((s) => s.generateNodeID);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData('application/reactflow');

      if (!data) return;

      const { nodeType } = JSON.parse(data);
      if (!nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const id = generateNodeID(nodeType);

      addNode({
        id,
        type: nodeType,
        position,
        data: { id, nodeType },
      });
    },
    [reactFlowInstance, addNode, generateNodeID]
  );

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '40vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        fitView
      >
        <Background gap={20} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};


