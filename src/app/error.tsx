'use client';
import { Alert, Button } from 'antd';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Alert
        message="Failed to load data"
        description={error.message}
        type="error"
        showIcon
      />
      <Button onClick={() => reset()} style={{ marginTop: 20 }}>
        Try Again
      </Button>
    </div>
  );
}
