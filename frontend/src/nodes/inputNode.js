// frontend/src/nodes/inputNode.js
import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);

  return (
    <BaseNode title="Input" outputs={["value"]}>
      <input
        placeholder="input name"
        value={data.name || ""}
        onChange={(e) => update(id, "name", e.target.value)}
      />
    </BaseNode>
  );
};


