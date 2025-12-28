import { BaseNode } from "./BaseNode";
export const MathNode = () => (
  <BaseNode title="Math" inputs={["a", "b"]} outputs={["result"]}>
    <p>Addition</p>
    <p>Subtraction</p>
    <p>Multiplication</p>
    <p>Division</p>
  </BaseNode>
);
