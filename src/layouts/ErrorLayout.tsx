import type { FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';

export function ErrorLayout({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="error-block">
      <h1>Something went wrong, sorry</h1>
      <button onClick={resetErrorBoundary} className="error-button">
        <Link to="/">Go Home</Link>
      </button>
    </div>
  );
}
