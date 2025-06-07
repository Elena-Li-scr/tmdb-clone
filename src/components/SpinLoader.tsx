'use client';
import { Spin } from 'antd';

export default function SpinLoader() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Spin tip="Loading..." size="large" />
    </div>
  );
}
