// frontend/src/nodes/llmNode.js
import { BaseNode } from "./BaseNode";

export const LLMNode = () => (
  <BaseNode
    title="LLM"
    inputs={["system", "prompt"]}
    outputs={["response"]}
  >
    <p>Large Language Model</p>
  </BaseNode>
);

