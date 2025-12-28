
// store.js
import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  // --------------------
  // STATE
  // --------------------
  nodes: [],
  edges: [],
  nodeIDs: {},

  // --------------------
  // ACTIONS
  // --------------------
  generateNodeID: (type) => {
    const ids = { ...get().nodeIDs };
    ids[type] = (ids[type] || 0) + 1;
    set({ nodeIDs: ids });
    return `${type}-${ids[type]}`;
  },

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

    updateNodeField: (id, field, value) =>
  set(state => ({
    nodes: state.nodes.map(node =>
      node.id === id
        ? { ...node, data: { ...node.data, [field]: value } }
        : node
    )
  })),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        state.edges
      ),
    })),
}));

if (typeof window !== "undefined") {
  window.__STORE__ = useStore;
}

//----------


// // import create from "zustand";
// import { create } from "zustand";
// import { applyNodeChanges, applyEdgeChanges } from "reactflow";

// /**
//  * Global Zustand store
//  * IMPORTANT: Never update state inside render
//  */
// export const useStore = create((set, get) => ({
//   nodes: [],
//   edges: [],

//   setNodes: (nodes) => set({ nodes }),
//   setEdges: (edges) => set({ edges }),

//   onNodesChange: (changes) =>
//     set({
//       nodes: applyNodeChanges(changes, get().nodes),
//     }),

//   onEdgesChange: (changes) =>
//     set({
//       edges: applyEdgeChanges(changes, get().edges),
//     }),

//   onConnect: (connection) =>
//     set({
//       edges: [...get().edges, connection],
//     }),

//   updateNodeField: (id, field, value) =>
//     set({
//       nodes: get().nodes.map((n) =>
//         n.id === id
//           ? { ...n, data: { ...n.data, [field]: value } }
//           : n
//       ),
//     }),
// }));



//------------------------------------------

// // store.js

// import { create } from "zustand";
// import {
//     addEdge,
//     applyNodeChanges,
//     applyEdgeChanges,
//     MarkerType,
//   } from 'reactflow';

// export const useStore = create((set, get) => ({
//     nodes: [],
//     edges: [],
//     getNodeID: (type) => {
//         const newIDs = {...get().nodeIDs};
//         if (newIDs[type] === undefined) {
//             newIDs[type] = 0;
//         }
//         newIDs[type] += 1;
//         set({nodeIDs: newIDs});
//         return `${type}-${newIDs[type]}`;
//     },
//     addNode: (node) => {
//         set({
//             nodes: [...get().nodes, node]
//         });
//     },
//     onNodesChange: (changes) => {
//       set({
//         nodes: applyNodeChanges(changes, get().nodes),
//       });
//     },
//     onEdgesChange: (changes) => {
//       set({
//         edges: applyEdgeChanges(changes, get().edges),
//       });
//     },
//     onConnect: (connection) => {
//       set({
//         edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
//       });
//     },
//     // updateNodeField: (nodeId, fieldName, fieldValue) => {
//     //   set({
//     //     nodes: get().nodes.map((node) => {
//     //       if (node.id === nodeId) {
//     //         node.data = { ...node.data, [fieldName]: fieldValue };
//     //       }
  
//     //       return node;
//     //     }),
//     //   });
//     // },

//     //-------------------
//     updateNodeField: (nodeId, fieldName, fieldValue) => {
//   set({
//     nodes: get().nodes.map((node) =>
//       node.id === nodeId
//         ? {
//             ...node,
//             data: {
//               ...node.data,
//               [fieldName]: fieldValue
//             }
//           }
//         : node
//     ),
//   });
// },


//   }));
