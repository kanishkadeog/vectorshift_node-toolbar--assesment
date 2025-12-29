# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vectorshift-node-toolbar-assesment.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    graph = {node["id"]: [] for node in nodes}
    for edge in edges:
        graph[edge["source"]].append(edge["target"])

    visited = set()
    rec_stack = set()

    def has_cycle(v):
        visited.add(v)
        rec_stack.add(v)
        for n in graph.get(v, []):
            if n not in visited:
                if has_cycle(n):
                    return True
            elif n in rec_stack:
                return True
        rec_stack.remove(v)
        return False

    is_dag = True
    for node_id in graph:
        if node_id not in visited:
            if has_cycle(node_id):
                is_dag = False
                break

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }

