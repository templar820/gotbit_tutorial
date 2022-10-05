import PlacesStore from '../stores/Places.store';
import { Api, PlaceReaction } from '../api/api';

export enum ReactionsEnum {
  LIKE='LIKE',
  DISLIKE='DISLIKE',
  SKIP='SKIP',
}

export enum EventTrackEnum{
  TutorialSkipOpened= 'tutorial_skip_opened',
  TutorialSkipClosed= 'tutorial_skip_closed',
  TutorialLikeOpened= 'tutorial_like_opened',
  TutorialLikeClosed= 'tutorial_like_closed',
  TutorialSummaryOpened= 'tutorial_summary_opened',
  TutorialSummaryClosed= 'tutorial_summary_closed',
  URL_LOADED='url_loaded',
}

export enum TargetClickType{
  OTHER='other',
  HIGHLIGHTER_BUTTON='highlighter_button',
}

export default class PlacesService {
  private apiService: Api;

  placesStore: PlacesStore;

  user: string;

  constructor(apiService: Api<any>, placesStore: PlacesStore, user: string) {
    this.apiService = apiService;
    this.placesStore = placesStore;
    this.user = user;
  }

  async getCities() {
    const list = (await this.apiService.regions.regionsList({ ordering: 'name' })).data;
    this.placesStore.setCities(list.map(el => {
      return {
        ...el,
        value: el.name,
      };
    }));
  }

  async getPlaces() {
    const list = (await this.apiService.places.placesList({
      limit: 5,
      region: this.placesStore.currentCity?.id,
    })).data;
    this.placesStore.setPlaces(list.results);
  }

  async actionsPlace(actions: PlaceReaction['type']) {
    this.apiService.reactions.reactionsCreate({
      type: actions,
      user: this.user,
      place: this.placesStore.places[this.placesStore.currentPlaceIndex].id,
    });
    if (actions === ReactionsEnum.LIKE && !this.placesStore.favoritePlaces.find(el => el.id === this.getCurrentPlace().id)) {
      this.placesStore.setFavoritePlaces(this.placesStore.favoritePlaces.concat(this.placesStore.places[this.placesStore.currentPlaceIndex]));
    }
    this.nextPlace(this.placesStore.currentPlaceIndex);
  }

  async getFavoritePlaces() {
    const res = (await this.apiService.places.placesLikedRead({
      limit: 1,
      offset: 0
    })).data;
    const likePlaces = (await this.apiService.places.placesLikedRead({
      limit: res.count,
      offset: 0
    })).data;
    this.placesStore.setFavoritePlaces(likePlaces.results);
  }

  async nextPlace(currentIndex) {
    if (this.placesStore.places.length - currentIndex < 5) {
      const newPlace = await this.apiService.places.placesList({
        limit: 1,
        offset: this.placesStore.places.length - 1,
        region: this.placesStore.currentCity?.id,
      });
      const { places } = this.placesStore;
      places.push(newPlace.data.results[0]);
      this.placesStore.setPlaces(places);
    }
  }

  getCurrentPlace() {
    return this.placesStore.places[this.placesStore.currentPlaceIndex];
  }

  async getReviews(placeId) {
    const currentReviews = (await this.apiService.reviews.reviewsList({
      place: placeId,
      limit: 10,
      offset: 0,
    })).data;
    return currentReviews.results;
  }

  async getSimilarPlaces(placeId) {
    const currentReviews = (await this.apiService.places.placesSimilarRead(placeId)).data;
    return currentReviews.results;
  }

  addToNextPlace(place) {
    const index = this.placesStore.currentPlaceIndex;
    const { places } = this.placesStore;
    if (!places.find(el => el.id === place.id)) {
      places.splice(index + 1, 0, place);
      this.placesStore.setPlaces(places);
    }
  }

  async trackPlace(event: EventTrackEnum, type?:TargetClickType) {
    this.apiService.tracking.trackingCreate({
      event_name: event,
      data: {
        target: type
      }
    });
  }

  async trackLoadPage(event: EventTrackEnum, data) {
    this.apiService.tracking.trackingCreate({
      event_name: event,
      data,
    });
  }
}
