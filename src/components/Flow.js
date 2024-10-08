import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, Background, Controls } from 'react-flow-renderer';
import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import NodeMenu from './NodeMenu';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const Flow = () => {
    const initialNodes = [
        {
            id: '1',
            type: 'input',
            position: { x: 250, y: 5 },
            data: { label: 'Input Node' },
        },
        {
            id: '2',
            type: 'model',
            position: { x: 100, y: 100 },
            data: { label: 'Model Node' },
        },
        {
            id: '3',
            type: 'output',
            position: { x: 250, y: 200 },
            data: { label: 'Output Node' },
        },
    ];
    const initialEdges = [];
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
      );
      const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
      );
    const [, drop] = useDrop(() => ({
        accept: 'node',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const position = {
                x: offset.x,
                y: offset.y,
            };
            setNodes((nds) => [
                ...nds,
                {
                    id: `${item.type}-${nds.length}`,
                    type: item.type,
                    position,
                    data: { label: `${item.type} node` },
                },
            ]);
        },
    }));

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
                <div style={{ width: '15vw' }}>
                    <NodeMenu />
                </div>
                <div ref={drop} style={{ height: '100%', width: '85%' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onConnect={onConnect}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        fitView
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        </DndProvider>
    );
};

export default Flow;