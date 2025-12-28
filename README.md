# VectorShift Pipeline Editor

A visual pipeline editor that allows users to build directed workflows using draggable nodes and validate them as DAGs.

Frontend:-https://vectorshift-node-toolbar-assesment.vercel.app/
Backend:- https://vectorshift-node-toolbar-assesment.onrender.com/
## Tech Stack
- Frontend: React, React Flow, Zustand
- Backend: FastAPI (Python)

## Features
- Drag and drop nodes
- Dynamic node inputs/outputs
- DAG cycle detection
- Backend pipeline validation
- Clean modular architecture

## Folder Structure
vectorshift/
├── frontend/
│ ├── src/
│ └── package.json
├── backend/
│ └── main.py

shell
Copy code

## Running the Project

### Backend
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

## Frontend
```bash
Copy code
cd frontend
npm install
npm start
```
## API
POST /pipelines/parse

Returns:

Number of nodes

Number of edges

Whether pipeline is a DAG

