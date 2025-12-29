// frontend/src/store.js
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
