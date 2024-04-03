import { PageLoader } from './components/UI/PageLoader';
import { useAuth } from './hooks/useAuth';
import { MainLayout } from './layouts/MainLayout';
import { Router } from './router';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <MainLayout>
      <Router />
    </MainLayout>
  );
}

export default App;
