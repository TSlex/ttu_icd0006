import { AppState } from './state/app-state';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {
  router?: Router;

  constructor(private appState: AppState) { }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;

    config.title = "Default";

    config.map([
      { route: ['', 'home', 'home/index'], name: 'home', moduleId: PLATFORM.moduleName('views/home/index'), nav: true, title: 'Home' },

      { route: ['account/login'], name: 'account-login', moduleId: PLATFORM.moduleName('views/account/login'), nav: false, title: 'Login' },
      { route: ['account/register'], name: 'account-register', moduleId: PLATFORM.moduleName('views/account/register'), nav: false, title: 'Register' },


      { route: ['posts', 'posts/index'], name: 'posts', moduleId: PLATFORM.moduleName('views/posts/index'), nav: true, title: 'Posts' },
      { route: ['posts/create'], name: 'posts-create', moduleId: PLATFORM.moduleName('views/posts/create') },
      { route: ['posts/edit'], name: 'posts-edit', moduleId: PLATFORM.moduleName('views/posts/edit') },
      { route: ['posts/detail'], name: 'posts-details', moduleId: PLATFORM.moduleName('views/posts/detail') },
      { route: ['posts/delete'], name: 'posts-delete', moduleId: PLATFORM.moduleName('views/posts/delete') },

      { route: ['comments', 'comments/index'], name: 'comments', moduleId: PLATFORM.moduleName('views/comments/index'), nav: true, title: 'Comments' },

      { route: ['messages', 'messages/index'], name: 'messages', moduleId: PLATFORM.moduleName('views/messages/index'), nav: true, title: 'Messages' },

    ]);

    config.mapUnknownRoutes('views/home/index');
  }

  logout(){
      this.appState.jwt = null;
      this.router.navigateToRoute('account-login');
  }
}