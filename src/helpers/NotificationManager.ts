import TutorialWindow_LikeCount from '@components/Notifications/Tutorials/TutorialWindow_LikeCount';
import TutorialWindow_Like from '@components/Notifications/Tutorials/TutorialWindow_Like';
import TutorialWindow_Skip from '@components/Notifications/Tutorials/TutorialWindow_Skip';
import ErrorWindow from '../components/Notifications/ErrorWindow';
import ConfirmWindow from '../components/Notifications/ConfirmWindow';
import BaseNotification from '../components/Notifications/BaseNotification';

export interface INotificationService {
  sendNotify: (notify: BaseNotification) => void;
  closeNotify: (notify: BaseNotification) => void;
}

class NotificationManager {
  private service: INotificationService;

  Confirm: ConfirmWindow;

  Error: ErrorWindow;

  TutorialWindow_LikeCount: TutorialWindow_LikeCount;

  TutorialWindow_Skip: TutorialWindow_Skip;

  TutorialWindow_Like: TutorialWindow_Like;

  init(service: INotificationService) {
    this.service = service;
    this.Confirm = new ConfirmWindow(this.service);
    this.Error = new ErrorWindow(this.service);
    this.TutorialWindow_LikeCount = new TutorialWindow_LikeCount(this.service);
    this.TutorialWindow_Skip = new TutorialWindow_Skip(this.service);
    this.TutorialWindow_Like = new TutorialWindow_Like(this.service);
  }
}

export default new NotificationManager();
