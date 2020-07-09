import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from 'components/Shared/Header';

import Home from 'components/Home';

// Tasks
import TasksIndex from 'components/TodoTasks/Index';

// Categories
import CategoriesIndex from 'components/TodoCategories/Index';

// Priorities
import PrioritiesIndex from 'components/TodoPriorities/Index';

// Account
import Login from 'components/Identity/Login';
import Register from 'components/Identity/Register';
import { useSelector } from 'react-redux';

import { AppState } from 'redux/types';
import LoadingOverlay from 'components/Shared/LoadingOverlay';

export default function App() {

  const isGlobalLoading = useSelector((state: AppState) => state.loadingSystem.isGlobalLoading)

  return (
    <div className="App">
      <Header />
      <div className="container">
        <main role="main">
          {isGlobalLoading && <LoadingOverlay />}
          <Switch>

            {/* Account */}
            <Route path="/account/register">
              <Register />
            </Route>

            <Route path="/account/login">
              <Login />
            </Route>

            {/* Tasks */}
            <Route path="/tasks">
              <TasksIndex />
            </Route>

            {/* Categories */}
            <Route path="/categories">
              <CategoriesIndex />
            </Route>

            {/* Priorities */}
            <Route path="/priorities">
              <PrioritiesIndex />
            </Route>

            {/* Default */}
            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </main>
      </div>
    </div>
  );
}