import { EventTrackEnum, ReactionsEnum, TargetClickType } from '@services/Places.service';
import { TutorialStatus } from '@services/App.service';
import NotificationManager from '../helpers/NotificationManager';
import { useRootStore } from './useRootStore';
import UTILS from '../utils';

let timer = null;

let firstScroll = false;

let renderFlag = true;

function useTutorial(lastReaction, placesService, setLastReaction, history) {
  const { PlacesStore, AppStore } = useRootStore();

  const currentRef = document.getElementById(PlacesStore.places[PlacesStore.currentPlaceIndex]?.id) || null;

  if ((lastReaction === ReactionsEnum.LIKE)
    && AppStore.tutorialLikeCountStatus === TutorialStatus.NOT_PASSED) {
    if (renderFlag) {
      placesService.trackPlace(EventTrackEnum.TutorialSummaryOpened);
      renderFlag = false;
    }
    const onClose = (closeType = EventTrackEnum.TutorialSummaryClosed, target = TargetClickType.OTHER) => {
      placesService.trackPlace(closeType, target);
      AppStore.setTutorialStatus({ likeCount: TutorialStatus.PASSED });
    };
    NotificationManager.TutorialWindow_LikeCount.open({
      placeStore: PlacesStore,
      reference: AppStore.summaryReference,
      onClose,
      onClick: () => {
        history.push('/favorite');
        onClose(EventTrackEnum.TutorialSummaryClosed, TargetClickType.HIGHLIGHTER_BUTTON);
      }

    });
  }

  if ((lastReaction === ReactionsEnum.SKIP) && renderFlag
    && AppStore.tutorialLikeStatus === TutorialStatus.NOT_PASSED && !timer) {
    timer = setTimeout(() => {
      const onClose = (closeType = EventTrackEnum.TutorialLikeClosed, target = TargetClickType.OTHER) => {
        timer = null;
        AppStore.setTutorialStatus({ like: TutorialStatus.PASSED });
        placesService.trackPlace(closeType, target);
        renderFlag = true;
      };
      if (renderFlag && AppStore.tutorialLikeStatus === TutorialStatus.NOT_PASSED) {
        placesService.trackPlace(EventTrackEnum.TutorialLikeOpened);
        renderFlag = false;
        NotificationManager.TutorialWindow_Like.open({
          reference: AppStore.likeReference,
          onClose,
          onClick: () => {
            onClose(EventTrackEnum.TutorialLikeClosed, TargetClickType.HIGHLIGHTER_BUTTON);
            const { id } = PlacesStore.places[PlacesStore.currentPlaceIndex];
            const index = UTILS.flipCardAndGetNewIndex('left', document.getElementById(id), PlacesStore.currentPlaceIndex);
            placesService.actionsPlace(ReactionsEnum.LIKE);
            setLastReaction(ReactionsEnum.LIKE);
            PlacesStore.setCurrentPlaceIndex(index);
          }
        });
      }
    }, 5000);
  }
  if (currentRef && !firstScroll && renderFlag
    && AppStore.tutorialSkipStatus === TutorialStatus.NOT_PASSED && !timer) {
    const callback = () => {
      timer = setTimeout(() => {
        const onClose = (closeType = EventTrackEnum.TutorialSkipClosed, target = TargetClickType.OTHER) => {
          timer = null;
          AppStore.setTutorialStatus({ skip: TutorialStatus.PASSED });
          currentRef.removeEventListener('scroll', callback);
          placesService.trackPlace(closeType, target);
          renderFlag = true;
        };
        if (renderFlag) {
          placesService.trackPlace(EventTrackEnum.TutorialSkipOpened);
          renderFlag = false;
          NotificationManager.TutorialWindow_Skip.open({
            reference: AppStore.skipReference,
            onClose,
            onClick: () => {
              onClose(EventTrackEnum.TutorialSkipClosed, TargetClickType.HIGHLIGHTER_BUTTON);
              placesService.actionsPlace(ReactionsEnum.SKIP);
              setLastReaction(ReactionsEnum.SKIP);
              const { id } = PlacesStore.places[PlacesStore.currentPlaceIndex];
              const index = UTILS.flipCardAndGetNewIndex('left', document.getElementById(id), PlacesStore.currentPlaceIndex);
              PlacesStore.setCurrentPlaceIndex(index);
            }
          });
        }
      }, 3000);
    };
    currentRef.addEventListener('scroll', callback);
    firstScroll = true;
  }
}
export default useTutorial;
