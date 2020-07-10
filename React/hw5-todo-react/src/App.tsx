import React, { useEffect, ReactElement } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

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
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from 'redux/types';
import LoadingOverlay from 'components/Shared/LoadingOverlay';
import { loadUser } from 'redux/account/actions';
import { setErrors } from 'redux/notification/actions';
import AuthRedirect from 'components/AuthRedirect';

export default function App() {

  const isGlobalLoading = useSelector((state: AppState) => state.loadingSystem.isGlobalLoading)
  const isAuthenticated = useSelector((state: AppState) => state.account.isAuthenticated)

  const isAccountLoading = useSelector((state: AppState) => state.account.isLoading)

  const dispatch = useDispatch()

  useEffect(() => { dispatch(loadUser()) }, []);

  return (
    <>
      {!isAccountLoading &&
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


                <Route path="/tasks">
                  {isAuthenticated ? <TasksIndex /> : <AuthRedirect />}
                </Route>

                {/* Categories */}
                <Route path="/categories">
                  {isAuthenticated ? <CategoriesIndex /> : <AuthRedirect />}
                </Route>

                {/* Priorities */}
                <Route path="/priorities">
                  {isAuthenticated ? <PrioritiesIndex /> : <AuthRedirect />}
                </Route>

                {/* Default */}
                <Route path="/">
                  <Home />
                </Route>

              </Switch>
            </main>
          </div>
        </div>}
    </>
  );
}