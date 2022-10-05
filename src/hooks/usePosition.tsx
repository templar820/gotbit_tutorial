import { useEffect } from 'react';
import { useRootStore } from './useRootStore';

export const usePosition = () => {
  const { PlacesStore } = useRootStore();

  const url = new URL(window.location.href);
  const regionName = url.searchParams.get('region');

  useEffect(() => {
    let currentCity = PlacesStore.cities.find(el => el.name === regionName);

    if ((currentCity && currentCity.id !== PlacesStore.currentCity?.id) || PlacesStore.currentCity) {
      currentCity = currentCity || PlacesStore.currentCity;
      url.searchParams.set('region', currentCity.name);
      PlacesStore.setCurrentCity(currentCity);
      history.pushState(null, null, url);
    } else if (PlacesStore.cities) {
      PlacesStore.setCurrentCity(PlacesStore.cities[0]);
    }
  }, [PlacesStore.cities]);

  return url;
};
