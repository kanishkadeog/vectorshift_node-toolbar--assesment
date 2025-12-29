// frontend/src/nodes/MergeNode.js
import { BaseNode } from "./BaseNode";
export const MergeNode = () => (
  <BaseNode title="Merge" inputs={["x", "y"]} outputs={["out"]} />
);
