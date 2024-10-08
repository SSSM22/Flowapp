import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomModelNode = ({ data }) => {
    return (
        <div style={nodeStyle}>
            <div>{data.label}</div>
            <input type="file" accept=".pkl,.h5,.joblib,.sav" onChange={data.onFileUpload} />
            <Handle type="target" position="left" />
            <Handle type="source" position="right" />
        </div>
    );
};
const nodeStyle = {
    border: '1px solid black',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
};
export default CustomModelNode;