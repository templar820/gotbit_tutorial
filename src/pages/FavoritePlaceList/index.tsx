import React, { useEffect, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import Typography from '@mui/material/Typography';
import './index.scss';
import MySwiper from '@common/Swiper/Swiper';
import YMap from '@common/YMap';
import { Badge } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import UTILS from '../../utils';
import { Place } from '../../api/api';

function FavoritePlaceList(props: MOBXDefaultProps) {
  const [list, setList] = useState<Place[]>(props.PlacesStore.favoritePlaces);
  const [currentPLace, setCurrentPlace] = useState(null);

  useEffect(() => {
    props.services.placesService.getFavoritePlaces();
    setList(props.PlacesStore.favoritePlaces);
    if (!currentPLace) {
      setCurrentPlace(props.PlacesStore.favoritePlaces[0]);
    }
  }, [props.PlacesStore.favoritePlaces.length]);

  return (
    <div className="d-flex h-100 flex-column">
      <div className="w-100 h-100">
        <YMap
          height="100%"
          currentId={currentPLace?.id}
          lat={currentPLace?.lat}
          lon={currentPLace?.lon}
          name={currentPLace?.name}
          points={list.map(el => {
            return {
              x: el.lat,
              y: el.lon,
              name: el.title,
              id: el.id,
            };
          })}
          onClick={point => {
            setCurrentPlace(props.PlacesStore.favoritePlaces.find(el => el.id === point.id));
          }}
        />
      </div>
      <div
        className="w-100 mapAction  d-flex flex-column justify-content-center align-items-center"
        style={{ height: 260 }}
      >
        <button
          className="m-lg-auto btn w-50 btn-dark br-16 p-2 px-4 btn-rounded"
        >
          {list.length ? 'Скачать места' : 'Любимых мест не найдено'}
        </button>
        <MySwiper
          onSlide={(activeIndex) => {
            if (props.PlacesStore.favoritePlaces.length > 1) {
              setCurrentPlace(props.PlacesStore.favoritePlaces[activeIndex - 1]);
            }
          }}
          height={200}
          activeIndex={props.PlacesStore.favoritePlaces.findIndex(el => el.id === currentPLace?.id)}
          list={list}
          className="swiper-default"
          withoutPagination
        >
          {
            (data: Place) => (
              <div className="mx-4 mt-4">
                <Badge
                  className="br-16 me-2"
                  badgeContent={(
                    <div className="d-flex flex-row my-2 align-content-center align-items-center">
                      <StarOutlinedIcon fontSize="small" />
                      {data?.rating?.rating_avg.toFixed(1)}
                    </div>
                  )}
                  variant="border"
                >
                  <section className="m-0 card pr-1 br-16 w-100" style={{ maxHeight: 364 }}>
                    <div className="d-flex my-2 flex-row justify-content-between align-items-start">
                      <div className="br-16 ms-2">
                        <MySwiper
                          height={140}
                          width={140}
                          withoutPagination
                          className="swiper-default"
                          list={data.photos || []}
                        >
                          {
                            (url) => (
                              <img className="br-16" src={url} alt="" />
                            )
                          }
                        </MySwiper>
                      </div>
                      <div className="mx-2 d-flex flex-column w-100 placeName">
                        <Typography
                          className="mb-1"
                          textAlign="left"
                          variant="h2"
                        >
                          {data.title}
                        </Typography>
                        <div className="d-flex flex-column flex-wrap my-2 w-100">
                          {data.categories.slice(0, 2)
                            .map(el => <div className="mb-2 w-100">{UTILS.CategoriesFactory.getCategory(el)}</div>)}
                        </div>
                      </div>
                    </div>
                  </section>
                </Badge>
              </div>

            )
          }
        </MySwiper>
      </div>
    </div>

  );
}

export default MobXRouterDecorator(FavoritePlaceList);
