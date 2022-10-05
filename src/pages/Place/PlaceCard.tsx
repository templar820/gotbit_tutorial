import React from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import MySwiper from '@common/Swiper/Swiper';
import './index.scss';
import MyShowMoreText from '@common/MyShowMoreText';
import SectionCard from '@common/SectionCard';
import { Map } from '@mui/icons-material';
import YMap from '@common/YMap';
import PlaceCardContact from '@pages/Place/PlaceCardContact';
import PlaceCardReviews from '@pages/Place/PlaceCardReviews';
import PlaceCardSimilarPlaces from '@pages/Place/PlaceCardSimilarPlaces';
import Colors from '@colors';
import ReactStars from 'react-stars';

import UTILS from '../../utils';
import { Place } from '../../api/api';

interface PlaceCardProps extends MOBXDefaultProps{
  place: Place
  minifyMode: boolean;
}

function PlaceCard(props: PlaceCardProps) {
  const { place } = props;

  if (!place) return null;

  return (
    <div className="placeCard card mx-2">
      <div style={{ height: 345 }}>
        {
          !props.minifyMode && (
            <MySwiper list={place.photos || []} className="swiper-default">
              {
                (url) => {
                  return (
                    <div className="bg-image">
                      <img src={url} alt={place.title} />
                      <div className="mask mask-custom" />
                    </div>
                  );
                }
              }
            </MySwiper>
          )
        }

      </div>
      <main>
        <SectionCard
          title={place.title}
          icon={(
            // <Badge className="me-2" badgeContent={place.rating.rating_avg}>
            //   <StarBorderOutlinedIcon />
            // </Badge>
            <div className="mx-2 d-flex justify-content-end stars">
              <ReactStars
                className="d-flex flex-nowrap"
                value={place.rating.rating_avg}
                count={5}
                color2={Colors.black}
                color1={Colors.white}
                edit={false}
              />
            </div>

          )}
        >
          <div className="d-flex flex-column">
            <div className="d-flex flex-row flex-wrap my-2">
              {place.categories.map((el) => <div className="me-2 my-2" key={el.name_ru}>{UTILS.CategoriesFactory.getCategory(el)}</div>)}
            </div>
            <MyShowMoreText variant="button" value={place.place_description} />
          </div>
        </SectionCard>
        <SectionCard
          hide={!(place.lat && place.lon)}
          title="Местоположение"
          icon={<Map />}
        >
          {!props.minifyMode
            && (
              <YMap
                name={place.title}
                height="300px"
                lat={place.lat}
                lon={place.lon}
                points={props.PlacesStore.favoritePlaces.map(el => {
                  return {
                    x: el.lat,
                    y: el.lon,
                    name: el.title,
                    id: el.id
                  };
                })}
              />
            )}
        </SectionCard>

        {!props.minifyMode && <PlaceCardContact place={place} />}
        {!props.minifyMode && <PlaceCardReviews place={place} />}
        {!props.minifyMode && <PlaceCardSimilarPlaces place={place} />}

        <div className="cardEnd" />
      </main>
    </div>
  );
}

export default MobXRouterDecorator(PlaceCard);
