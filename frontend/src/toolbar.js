// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <>
        
        <div style={{ padding: '10px' ,background: '#6624d0ff'}}>
            <h3 style={{ textAlign: 'left', color: '#fefec2ff', margin: '10px' }}>Node Toolbar</h3>
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' /> */}
                
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='logger' label='Logger' />

            </div>
        </div>
        </>
    );
};
