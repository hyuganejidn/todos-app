import React from 'react';
import './App.css';
import Post from './features/post/Post';
import TodoList from './features/todo/TodoList';
import User from './features/user/User';
import { StoreProvider } from './store';
// import { todoStore } from './features/todo/TodoStore';

function App() {
  return (
    <StoreProvider >
      <div className="App">
        <TodoList />
        <User />
        <Post />
      </div>
    </StoreProvider>
  );
}

export default App;
