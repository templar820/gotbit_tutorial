import BaseNotification from '@components/notifications/BaseNotification';
import AppStore from '../stores/App.store';
import NotificationManager from '../helpers/NotificationManager';

export enum TutorialStatus {
  NOT_PASSED='NOT_PASSED',
  PASSED='PASSED'
}

export default class AppService {
  pickSpotTutorialStatusKeySkip = 'pick_spot_tutorial_status_skip';

  pickSpotTutorialStatusKeyLike = 'pick_spot_tutorial_status_like';

  pickSpotTutorialStatusKeyLikeCount = 'pick_spot_tutorial_status_like_count';

  private appStore: AppStore;

  NotificationManager: typeof NotificationManager;

  constructor(appStore: AppStore) {
    this.NotificationManager = NotificationManager;
    this.NotificationManager.init(this);

    this.appStore = appStore;
    const skip = this.registerTutorialStatus(this.pickSpotTutorialStatusKeySkip);
    const like = this.registerTutorialStatus(this.pickSpotTutorialStatusKeyLike);
    const likeCount = this.registerTutorialStatus(this.pickSpotTutorialStatusKeyLikeCount);
    this.appStore.setTutorialStatus({ skip, like, likeCount });

    window.onerror = (msg, url, lineNo, columnNo, error) => { this.errorListener(error); };
    window.onunhandledrejection = e => { this.errorListener(e.reason); };
  }

  registerTutorialStatus(key):TutorialStatus {
    let tutorialStatus = localStorage.getItem(key);
    if (!tutorialStatus) {
      tutorialStatus = TutorialStatus.NOT_PASSED;
    }
    localStorage.setItem(key, tutorialStatus);
    return tutorialStatus as TutorialStatus;
  }

  errorListener(e: Error) {
    console.log(e);
  }

  sendNotify(notifyInstance: BaseNotification) {
    this.appStore.addNotification(notifyInstance);
  }

  closeNotify(notify: BaseNotification) {
    this.appStore.setNotifications(this.appStore.notifications.filter(el => el.id !== notify.id));
  }
}
