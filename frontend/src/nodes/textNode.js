// frontend/src/nodes/textNode.js
import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from "../store";


export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [vars, setVars] = useState([]);
  const update = useStore(s => s.updateNodeField);

  useEffect(() => {
    const matches = [...text.matchAll(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g)];
    setVars(matches.map(m => m[1]));
  }, [text]);

  useEffect(() => {
    update(id, "text", text);
  }, [text, id]);

  return (
    <div
      style={{
        minWidth: 200,
        minHeight: 80,
        padding: 10,
        border: '1px solid black'
      }}
    >
      <strong>Text</strong>

      {vars.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: 40 + i * 20 }}
        />
      ))}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: '100%',
    height: 'auto',
    minHeight: 40,
    overflow: 'hidden',
    resize: 'none',
        }}
        onInput={(e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};


