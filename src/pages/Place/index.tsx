import React, {
  useEffect, useMemo, useRef, useState
} from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import './index.scss';
import TabBar from '@common/TabBar';
import PlaceCard from '@pages/Place/PlaceCard';
import PageNotFound from '@components/system/PageNotFound';
import Emoji from 'a11y-react-emoji';
import { Typography } from '@mui/material';
import { TutorialStatus } from '@services/App.service';
import { ReactionsEnum } from '@services/Places.service';
import useTutorial from '../../hooks/useTutorial';
import { usePosition } from '../../hooks/usePosition';
import UTILS from '../../utils';

function PlacePage(props: MOBXDefaultProps) {
  const [lastReaction, setLastReaction] = useState(null);

  const [firstRender, setFirstRender] = useState(true);
  const list = props.PlacesStore.places;
  const currentIndex = props.PlacesStore.currentPlaceIndex;
  const nextRef = useRef();
  const likeRef = useRef();

  useEffect(() => {
    props.AppStore.setLikeReference(likeRef);
    props.AppStore.setSkipReference(nextRef);
  }, []);

  const url = usePosition();

  const modifyList = useMemo(() => {
    return props.PlacesStore.places.reduce((acc, el) => {
      if (!el) return acc;
      acc.push({
        ...el,
        ref: React.createRef(),
      });
      return acc;
    }, []);
  }, [list, list.length, url]);

  // в утилсы должен быть чистый компонент максимально

  useEffect(() => {
    setLastReaction(null);
    setFirstRender(true);
    setTimeout(() => {
      setFirstRender(false);
    }, 1500);
  }, [props.PlacesStore.currentCity?.id]);

  useEffect(() => {
    if (props.PlacesStore.currentCity) {
      props.services.placesService.getPlaces();
    }
  }, [props.PlacesStore.currentCity]);

  const endCard = (currentIndex >= modifyList.length) && !firstRender;

  useTutorial(lastReaction, props.services.placesService, setLastReaction, props.history);

  return (
    <>
      <div className="position-relative h-100 w-100 mh-100">
        {modifyList.map((place, index) => {
          return (
            <div
              key={place.id}
              id={place.id}
              className="placeCard w-100 h-100 mh-100 position-absolute overflow-auto"
              style={{ zIndex: list.length - index, left: 0, top: 0 }}
              ref={place.ref}
            >
              <PlaceCard place={place} minifyMode={currentIndex !== index} />
            </div>
          );
        })}
        {endCard
          ? (
            <PageNotFound
              title={<Typography variant="h2">К сожалению карточки закончились</Typography>}
              description={(
                <Typography className="my-2" variant="body2">
                  Предлагаем кликнуть на
                  <Emoji className="mx-1" symbol="❤️" label="love" />
                  сверху и посмотреть выбранные места
                </Typography>
              )}
            />
          )
          : null}
      </div>
      {modifyList.length
      && (
        <TabBar
          hidePrevious={currentIndex === 0}
          hideNext={endCard}
          hideDislike={endCard}
          hideLike={endCard}
          nextRef={nextRef}
          likeRef={likeRef}
          onClickNext={(reactions) => {
            setLastReaction(reactions);
            props.services.placesService.actionsPlace(reactions);
            if (reactions === ReactionsEnum.SKIP) {
              props.AppStore.setTutorialStatus({ skip: TutorialStatus.PASSED });
            }

            if (reactions === ReactionsEnum.LIKE) {
              props.AppStore.setTutorialStatus({ like: TutorialStatus.PASSED });
            }

            const newIndex = UTILS.flipCardAndGetNewIndex('left', modifyList[currentIndex].ref.current, currentIndex);
            props.PlacesStore.setCurrentPlaceIndex(newIndex);
          }}
          onClickPrevious={() => {
            setLastReaction(null);
            const newIndex = UTILS.flipCardAndGetNewIndex('right', modifyList[currentIndex].ref.current, currentIndex);
            props.PlacesStore.setCurrentPlaceIndex(newIndex);
          }}
        />
      )}
    </>

  );
}

export default MobXRouterDecorator(PlacePage);
