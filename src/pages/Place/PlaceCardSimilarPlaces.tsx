import React, { useEffect, useState } from 'react';
import { MOBXDefaultProps } from '@globalTypes';
import MySwiper from '@common/Swiper/Swiper';
import SectionCard from '@common/SectionCard';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { Tooltip, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import SimilarPlaceComponent from '@pages/Place/SimilarPlaceComponent';
import { Place } from '../../api/api';

interface PlaceCardReviewsProps extends MOBXDefaultProps {
  place: Place
}

function PlaceCardSimilarPlaces(props: PlaceCardReviewsProps) {
  const [list, setList] = useState([]);

  const { place } = props;

  useEffect(() => {
    props.services.placesService.getSimilarPlaces(place.id).then(data => {
      setList(data);
    });
  }, [props.place.id]);

  return (
    <SectionCard
      hide={!list.length}
      title="Похожие места"
      icon={<TravelExploreIcon />}
    >
      <MySwiper
        list={list}
        slidesPerView={list.length === 1 ? 1 : 2}
      >
        {
          (similarPlace) => (
            <SimilarPlaceComponent
              data={similarPlace}
              onClick={(data) => {
                props.services.placesService.addToNextPlace(data);
              }}
            />
          )
        }
      </MySwiper>
    </SectionCard>
  );
}
export default MobXRouterDecorator(PlaceCardSimilarPlaces);
