import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/shared/Header';

import Home from './components/Home';

import TasksIndex from './components/TodoTasks/Index';
import CategoriesIndex from './components/TodoCategories/Index';
import PrioritiesIndex from './components/TodoPriorities/Index';

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <main role="main">
          <Switch>
            <Route path="/tasks">
              <TasksIndex />
            </Route>
            <Route path="/categories">
              <CategoriesIndex />
            </Route>
            <Route path="/priorities">
              <PrioritiesIndex />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}