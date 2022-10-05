import {
  action, computed, makeObservable, observable,
} from 'mobx';
import { TutorialStatus } from '@services/App.service';
import BaseNotification from '../components/Notifications/BaseNotification';

export default class AppStore {
  @observable
  tutorialSkipStatus = TutorialStatus.NOT_PASSED;

  @observable
  tutorialLikeStatus = TutorialStatus.NOT_PASSED;

  @observable
  tutorialLikeCountStatus = TutorialStatus.NOT_PASSED;

  summaryReference = null;

  skipReference = null;

  likeReference = null;

  @observable
  notifications = [];

  @action
  setNotifications(notifications: BaseNotification[]) {
    this.notifications = notifications;
  }

  @action
  setTutorialStatus({
    skip = this.tutorialSkipStatus,
    like = this.tutorialLikeStatus,
    likeCount = this.tutorialLikeCountStatus
  }) {
    this.tutorialSkipStatus = skip;
    this.tutorialLikeStatus = like;
    this.tutorialLikeCountStatus = likeCount;
  }

  @action
  addNotification(notify) {
    this.setNotifications([...this.notifications, notify]);
  }

  @computed
  get currentNotification() {
    return this.notifications[0];
  }

  setSummaryReference(ref) {
    this.summaryReference = ref;
  }

  setSkipReference(ref) {
    this.skipReference = ref;
  }

  setLikeReference(ref) {
    this.likeReference = ref;
  }

  constructor() {
    makeObservable(this);
  }
}
