import './App.css';
import BlogPost from './components/BlogPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Individual from './components/BlogPost/individual';

function App() {
  return (
    <Router>
      <div className="App"> 
        <Switch>
          <Route path="/api/blogPosts" exact component={BlogPost} />
          <Route path="/api/blogPosts/:id" component={Individual} />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
