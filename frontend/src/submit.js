
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);

  const handleSubmit = async () => {
    const res = await fetch("https://vectorshift-node-toolbar-assesment.onrender.com/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges })
    });

    const data = await res.json();

    alert(
      `Pipeline Analysis\n\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG: ${data.is_dag}`
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button 
      onClick={handleSubmit}
       style={{
    padding: '10px 20px',
    background: '#598af5ff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    cursor: 'pointer'
      }}
      >Submit</button>
    </div>
  );
};



//-----------------------------------------

// import { useStore } from "./store";

// export const SubmitButton = () => {
//   const { nodes, edges } = useStore();

//   const submit = async () => {
//     const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ nodes, edges })
//     });

//     const data = await res.json();
//     alert(
//       `Nodes: ${data.num_nodes}
// Edges: ${data.num_edges}
// DAG: ${data.is_dag}`
//     );
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <button onClick={submit}>Submit</button>
//     </div>
//   );
// };




//----------------------------------

// // submit.js

// export const SubmitButton = () => {

//     return (
//         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//             <button type="submit">Submit</button>
//         </div>
//     );
// }
