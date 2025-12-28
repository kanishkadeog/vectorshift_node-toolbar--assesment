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


# =======================
# from fastapi import FastAPI, Body, Form
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from typing import List, Optional
# import json


# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "https://vectorshift-node-toolbar-assesment.vercel.app",
#         "http://localhost:3000"  # optional for local testing
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class Node(BaseModel):
#     id: str


# class Edge(BaseModel):
#     source: str
#     target: str


# class Pipeline(BaseModel):
#     nodes: List[Node]
#     edges: List[Edge]


# @app.get("/")
# def read_root():
#     return {"Ping": "Pong"}

# @app.post("/pipelines/parse")
# def parse_pipeline(pipeline: Pipeline):
#     nodes = pipeline.nodes
#     edges = pipeline.edges

#     num_nodes = len(nodes)
#     num_edges = len(edges)

#     # Build graph
#     graph = {}
#     for edge in edges:
#         graph.setdefault(edge.source, []).append(edge.target)

#     visited = set()
#     rec_stack = set()

#     def has_cycle(v):
#         visited.add(v)
#         rec_stack.add(v)

#         for n in graph.get(v, []):
#             if n not in visited:
#                 if has_cycle(n):
#                     return True
#             elif n in rec_stack:
#                 return True

#         rec_stack.remove(v)
#         return False

#     is_dag = True
#     for node in nodes:
#         if node.id not in visited:
#             if has_cycle(node.id):
#                 is_dag = False
#                 break

#     return {
#         "num_nodes": num_nodes,
#         "num_edges": num_edges,
#         "is_dag": is_dag
#     }


# =============

# @app.post("/pipelines/parse")
# @app.get("/pipelines/parse")
# def parse_pipeline(
#     pipeline: Optional[str] = Form(None),
#     body: Optional[Pipeline] = Body(None)
# ):
#     # Handle GET (form) or POST (JSON)
#     if pipeline:
#         data = json.loads(pipeline)
#         nodes = data["nodes"]
#         edges = data["edges"]
#     else:
#         nodes = body.nodes
#         edges = body.edges

#     num_nodes = len(nodes)
#     num_edges = len(edges)

#     # DAG check
#     graph = {}
#     for edge in edges:
#         src = edge["source"] if isinstance(edge, dict) else edge.source
#         tgt = edge["target"] if isinstance(edge, dict) else edge.target
#         graph.setdefault(src, []).append(tgt)

#     visited = set()
#     rec_stack = set()

#     def has_cycle(v):
#         visited.add(v)
#         rec_stack.add(v)

#         for n in graph.get(v, []):
#             if n not in visited:
#                 if has_cycle(n):
#                     return True
#             elif n in rec_stack:
#                 return True

#         rec_stack.remove(v)
#         return False

#     is_dag = True
#     for n in nodes:
#         node_id = n["id"] if isinstance(n, dict) else n.id
#         if node_id not in visited:
#             if has_cycle(node_id):
#                 is_dag = False
#                 break

#     return {
#         "num_nodes": num_nodes,
#         "num_edges": num_edges,
#         "is_dag": is_dag
#     }




# ---------------------

# from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import List

# app = FastAPI()

# class Node(BaseModel):
#     id: str

# class Edge(BaseModel):
#     source: str
#     target: str

# class Pipeline(BaseModel):
#     nodes: List[Node]
#     edges: List[Edge]

# @app.get("/")
# def read_root():
#     return {"Ping": "Pong"}

# @app.post("/pipelines/parse")
# def parse_pipeline(pipeline: Pipeline):
#     num_nodes = len(pipeline.nodes)
#     num_edges = len(pipeline.edges)

#     # DAG check
#     graph = {}
#     for edge in pipeline.edges:
#         graph.setdefault(edge.source, []).append(edge.target)

#     visited = set()
#     rec_stack = set()

#     def has_cycle(v):
#         visited.add(v)
#         rec_stack.add(v)

#         for neighbor in graph.get(v, []):
#             if neighbor not in visited:
#                 if has_cycle(neighbor):
#                     return True
#             elif neighbor in rec_stack:
#                 return True

#         rec_stack.remove(v)
#         return False

#     is_dag = True
#     for node in pipeline.nodes:
#         if node.id not in visited:
#             if has_cycle(node.id):
#                 is_dag = False
#                 break

#     return {
#         "num_nodes": num_nodes,
#         "num_edges": num_edges,
#         "is_dag": is_dag
#     }


#---------------------------------------

# from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import List, Dict

# app = FastAPI()

# class Pipeline(BaseModel):
#     nodes: List[Dict]
#     edges: List[Dict]

# @app.post("/pipelines/parse")
# def parse_pipeline(pipeline: Pipeline):
#     nodes = pipeline.nodes
#     edges = pipeline.edges

#     graph = {n["id"]: [] for n in nodes}
#     indeg = {n["id"]: 0 for n in nodes}

#     for e in edges:
#         graph[e["source"]].append(e["target"])
#         indeg[e["target"]] += 1

#     queue = [n for n in indeg if indeg[n] == 0]
#     visited = 0

#     while queue:
#         cur = queue.pop(0)
#         visited += 1
#         for nxt in graph[cur]:
#             indeg[nxt] -= 1
#             if indeg[nxt] == 0:
#                 queue.append(nxt)

#     return {
#         "num_nodes": len(nodes),
#         "num_edges": len(edges),
#         "is_dag": visited == len(nodes)
#     }


# ------------------------------------


# from fastapi import FastAPI, Form

# app = FastAPI()

# @app.get('/')
# def read_root():
#     return {'Ping': 'Pong'}

# @app.get('/pipelines/parse')
# def parse_pipeline(pipeline: str = Form(...)):
#     return {'status': 'parsed'}
