import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { TaskListPage } from './pages/TaskListPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TaskListPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
