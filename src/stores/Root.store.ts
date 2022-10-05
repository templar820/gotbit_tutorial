import AppStore from './App.store';
import PlacesStore from './Places.store';

class RootStore {
  AppStore: AppStore;

  PlacesStore: PlacesStore;

  constructor() {
    this.AppStore = new AppStore();
    this.PlacesStore = new PlacesStore();
  }
}

export default new RootStore();
