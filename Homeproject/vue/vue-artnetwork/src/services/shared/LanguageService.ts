import store from '@/store';

export class LanguageService {
  static get culture() {
    return store.getters.getCurrentCulture;
  }
}
