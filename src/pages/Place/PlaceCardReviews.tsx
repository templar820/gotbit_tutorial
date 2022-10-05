import React, { useEffect, useState } from 'react';
import ReviewsIcon from '@mui/icons-material/Reviews';
import MySwiper from '@common/Swiper/Swiper';
import SectionCard from '@common/SectionCard';
import MyTag from '@common/MyTag';
import MyShowMoreText from '@common/MyShowMoreText';
import ReactStars from 'react-stars';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import { Place, Review } from '../../api/api';
import { Typography } from '@mui/material';

interface PlaceCardReviewsProps extends MOBXDefaultProps {
  place: Place
}

function PlaceCardReviews(props: PlaceCardReviewsProps) {
  const [reviews, setReviews] = useState([]);

  const { place } = props;

  useEffect(() => {
    props.services.placesService.getReviews(place.id).then(data => {
      setReviews(data);
    });
  }, [props.place.id]);

  return (
    <SectionCard
      hide={!reviews.length}
      title="Отзывы"
      icon={<ReviewsIcon />}
    >
      <MySwiper
        list={reviews}
        loop={false}
        slidesPerView={1}
      >
        {
          (review: Review) => {
            return (
              <SectionCard variant="subtitle1" title={review.header}>
                <div className="d-flex flex-column mb-2">
                  <div className="d-flex justify-content-between my-4">
                    <MyTag
                      icon={<img src={review.author_profile_img_url} className="br-16" />}
                    >
                      <Typography variant="subtitle2">{review.author_name}</Typography>
                    </MyTag>
                    <MyTag
                      className="ms-2"
                    >
                      <ReactStars
                        value={review.rating_settled}
                        count={5}
                        edit={false}
                      />
                    </MyTag>
                  </div>
                  <MyShowMoreText
                    lines={6}
                    variant="body2"
                    textAlign="left"
                    value={review.text.replaceAll('<br />', ' ')}
                  />
                </div>
              </SectionCard>
            );
          }
        }
      </MySwiper>
    </SectionCard>
  );
}
export default MobXRouterDecorator(PlaceCardReviews);
