import { AppState } from './state/state';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {
    router?: Router;

    get isLoading(){
        return this.appState.isComponentLoading;
    }

    get userName(){
        return this.appState.userName;
    }

    constructor(private appState: AppState) { }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        config.title = "Default";

        config.map([
            { route: ['', 'home', 'home/index'], name: 'home', moduleId: PLATFORM.moduleName('views/home/index'), nav: true, title: 'Home' },

            { route: ['account/login'], name: 'account-login', moduleId: PLATFORM.moduleName('views/account/login'), nav: false, title: 'Login' },
            { route: ['account/register'], name: 'account-register', moduleId: PLATFORM.moduleName('views/account/register'), nav: false, title: 'Register' },

            // Manage
            { route: ['account/manage/:page?'], name: 'account-manage', moduleId: PLATFORM.moduleName('views/identity/manage'), nav: false, title: 'Manage' },

            // posts
            { route: ['posts', 'posts/index'], name: 'posts', moduleId: PLATFORM.moduleName('views/posts/index'), nav: true, title: 'Posts' },
            { route: ['posts/create'], name: 'posts-create', moduleId: PLATFORM.moduleName('views/posts/create-edit') },
            { route: ['posts/edit/:id'], name: 'posts-edit', moduleId: PLATFORM.moduleName('views/posts/create-edit') },

            // comments
            { route: ['comments', 'comments/index'], name: 'comments', moduleId: PLATFORM.moduleName('views/comments/index'), nav: true, title: 'Comments' },
            // { route: ['comments/create'], name: 'comments-create', moduleId: PLATFORM.moduleName('views/comments/create-edit') },
            // { route: ['comments/edit/:id'], name: 'comments-edit', moduleId: PLATFORM.moduleName('views/comments/create-edit') },

            // messages
            { route: ['messages', 'messages/index'], name: 'messages', moduleId: PLATFORM.moduleName('views/messages/index'), nav: true, title: 'Messages' },
            { route: ['messages/create/:chatRoomId'], name: 'messages-create', moduleId: PLATFORM.moduleName('views/messages/create-edit') },
            { route: ['messages/edit/:id'], name: 'messages-edit', moduleId: PLATFORM.moduleName('views/messages/create-edit') },

        ]);

        config.mapUnknownRoutes('views/home/index');
    }

    logout() {
        this.appState.jwt = null;
        this.router.navigateToRoute('account-login');
    }
}
