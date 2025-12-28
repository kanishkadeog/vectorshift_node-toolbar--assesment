
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



//------------------------------------------


// import { BaseNode } from "./BaseNode";
// import { useStore } from "../store";

// /**
//  * Extract {{variables}} from text
//  */
// const extractVars = (text) => {
//   const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
//   return [...text.matchAll(regex)].map(m => m[1]);
// };

// export const TextNode = ({ id, data }) => {
//   const update = useStore(s => s.updateNodeField);
//   const text = data.text || "";

//   const vars = extractVars(text);

//   return (
//     <BaseNode title="Text" inputs={vars} outputs={["output"]}>
//       <textarea
//         value={text}
//         onChange={(e) => update(id, "text", e.target.value)}
//         style={{
//           width: "100%",
//           minHeight: 40 + text.length,
//           resize: "none"
//         }}
//       />
//     </BaseNode>
//   );
// };



//----------------------------------

// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input 
//             type="text" 
//             value={currText} 
//             onChange={handleTextChange} 
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }
