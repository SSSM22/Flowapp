import React from 'react';
import { useDrag } from 'react-dnd';

const NodeMenu = () => {
    const nodeTypes = ["input", "model", "output"];

    return (
        <div>
            {nodeTypes.map((type) => (
                <DraggableNode key={type} type={type} />
            ))}
        </div>
    );
};

const DraggableNode = ({ type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'node',
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {type}
        </div>
    );
};

export default NodeMenu;