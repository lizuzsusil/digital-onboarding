import React from 'react';
import {Spin} from 'antd';

interface LoaderProps {
    content?: string;
    type?: 'page' | 'component';
}

function Loader({content}: LoaderProps) {
    return (
        <Spin>{content}</Spin>
    );
}

export default Loader;