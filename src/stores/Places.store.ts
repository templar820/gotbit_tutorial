import {
  action, makeAutoObservable, makeObservable, observable,
} from 'mobx';
import { Ref, RefObject } from 'react';
import { Place, Region, Review } from '../api/api';

export default class PlacesStore {
  @observable
  cities: Region[] = [];

  @observable
  currentCity: Region;

  @observable
  places: Place[] = [];

  @observable
  favoritePlaces: Place[] = [];

  @observable
  currentPlaceIndex = 0;

  @observable
  currentMapContainer: RefObject<HTMLElement> = null;

  @observable
  reviews: Review[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  setPlaces(list) {
    this.places = list;
  }

  @action
  setFavoritePlaces(list) {
    this.favoritePlaces = list;
  }

  @action
  setCities(list) {
    this.cities = list;
  }

  @action
  setCurrentCity(city) {
    this.currentCity = city;
    this.places = [];
    this.setCurrentPlaceIndex(0);
  }

  @action
  setCurrentPlaceIndex(v) {
    this.currentPlaceIndex = v;
  }

  @action
  setCurrentMapContainer(v) {
    this.currentMapContainer = v;
  }

  @action
  setReviews(v) {
    this.reviews = v;
  }
}
