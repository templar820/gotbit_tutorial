import React, { useEffect, useState } from 'react';
import YMap from '@common/YMap';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';

function YMapSingleton(props: MOBXDefaultProps) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const currentPoint = props.services.placesService.getCurrentPlace();
  const { currentMapContainer } = props.PlacesStore;

  useEffect(() => {
    let maps = document.getElementsByTagName('ymaps')[0];
    if (maps?.style) {
      maps.style.display = 'none';
    }
    setTimeout(() => {
      maps = document.getElementsByTagName('ymaps')[0];
      if (maps && currentMapContainer && +currentMapContainer.current.id === props.PlacesStore.currentPlaceIndex) {
        maps.style.display = 'block';
        const box = currentMapContainer.current.getBoundingClientRect();
        maps.style.left = `${box.x + document.documentElement.scrollLeft}px`;
        maps.style.top = `${box.y + document.documentElement.scrollTop}px`;
        maps.style.position = 'absolute';
        maps.style.zIndex = props.PlacesStore.places.length;
        setHeight(box.height);
        setWidth(box.width);
      }
    }, 520);
  }, [props.PlacesStore.currentMapContainer]);
  return (
    <YMap lat={currentPoint?.lat} height={height} width={width} lon={currentPoint?.lon} name={currentPoint?.title} />
  );
}

export default MobXRouterDecorator(YMapSingleton, false);
