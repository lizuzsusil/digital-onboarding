import React from 'react';
import {Spin, SpinProps} from 'antd';

interface LoaderProps extends SpinProps {
    content?: string;
    type?: 'page' | 'component';
}

function Loader({content, ...rest}: LoaderProps) {
    return (
        <Spin {...rest}>{content}</Spin>
    );
}

export default Loader;