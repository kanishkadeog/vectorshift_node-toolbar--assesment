// frontend/src/nodes/BaseNode.js
import { Handle, Position } from "reactflow";

/**
 * BaseNode
 * Central abstraction for all nodes.
 * Handles layout, styling, and handles.
 */
export const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div style={{
      minWidth: 220,
  padding: 12,
  border: "1px solid #1C2536",
  borderRadius: 8,
  background: "#1F2937",
  color: "#fff",
  fontFamily: "Inter, sans-serif",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}>
  <div style={{ fontWeight: "bold", marginBottom: 8, fontSize: 14 }}>
        {title}
      </div>

      {inputs.map((id, i) => (
        <Handle
          key={id}
          type="target"
          position={Position.Left}
          id={id}
          style={{ top: 40 + i * 20 }}
        />
      ))}

      {children}

      {outputs.map((id, i) => (
        <Handle
          key={id}
          type="source"
          position={Position.Right}
          id={id}
          style={{ top: 40 + i * 20 }}
        />
      ))}
    </div>
  );
};
