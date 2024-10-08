import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomInputNode = ({ data }) => {
    return (
        <div>
            <div>{data.label}</div>
            <input type="file" accept=".csv" onChange={data.onFileUpload} />
            <Handle type="source" position="right" />
        </div>
    );
};

export default CustomInputNode;