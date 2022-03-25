import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import { Post } from './types';
import Table from './components/table/Table';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getPosts = async (): Promise<void> => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err && err.response) {
          setErrorMsg(
            `Failed to retrieve data, response status: ${err.response.status}`
          );
          return;
        }
        setErrorMsg(`Failed to retrieve data`);
      } else setErrorMsg(`Failed to retrieve data, unknown error`);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return posts.length ? (
    <Router>
      <Routes>
        {['/', '/evens', '/odds'].map(path => (
          <Route key={path} path={path} element={<Table entries={posts} />} />
        ))}
        <Route
          path="*"
          element={<ErrorPage errorMsg={"This path doesn't exist"} />}
        />
      </Routes>
    </Router>
  ) : (
    <ErrorPage errorMsg={errorMsg} />
  );
};

export default App;
