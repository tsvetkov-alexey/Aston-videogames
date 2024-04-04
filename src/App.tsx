import { PageLoader } from './components/UI/PageLoader';
import { useAuth } from './hooks/useAuth';
import { ErrorLayout } from './layouts/ErrorLayout';
import { MainLayout } from './layouts/MainLayout';
import { Router } from './router';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <PageLoader />;
  }

  return (
    <MainLayout>
      <Router />
      <Toaster position="bottom-right" />
    </MainLayout>
  );
}

function WrappedApp() {
  return (
    <ErrorBoundary FallbackComponent={ErrorLayout}>
      <App />
    </ErrorBoundary>
  );
}

export default WrappedApp;
