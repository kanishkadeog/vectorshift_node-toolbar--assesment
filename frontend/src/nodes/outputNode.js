// frontend/src/nodes/outputNode.js
import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const OutputNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);

  return (
    <BaseNode title="Output" inputs={["value"]}>
      <input
        placeholder="output name"
        value={data.name || ""}
        onChange={(e) => update(id, "name", e.target.value)}
      />
    </BaseNode>
  );
};


