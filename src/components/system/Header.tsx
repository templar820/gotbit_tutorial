import React, { useEffect, useRef, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import PlaceIcon from '@mui/icons-material/Place';
import {
  Button, IconButton, Menu, MenuItem, Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MyTag from '@common/MyTag';
import Colors from '@colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { EventTrackEnum } from '@services/Places.service';

function Header(props: MOBXDefaultProps) {
  const [value, setValue] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const ref = useRef();

  const placesStore = props.PlacesStore;

  const url = new URL(window.location.href);
  const isFavorite = url.pathname.includes('favorite');

  useEffect(() => {
    props.AppStore.setSummaryReference(ref);
  }, []);

  useEffect(() => {
    const data = {
      name: url.href.replace(url.origin+"/","").replace(url.search,""),
      ...Object.fromEntries(url.searchParams.entries())
    }
    props.services.placesService.trackLoadPage(EventTrackEnum.URL_LOADED, data);
  }, [url]);

  useEffect(() => {
    props.services.placesService.getCities();
    props.services.placesService.getFavoritePlaces();
  }, []);

  useEffect(() => {
    setValue(placesStore.currentCity);
    if (placesStore.currentCity) {
      url.searchParams.set('region', placesStore.currentCity.name);
      history.pushState(null, null, url);
    }
  }, [placesStore.currentCity]);

  const toFavoritePlaces = () => {
    if (!isFavorite) {
      props.history.push('/favorite');
    } else {
      props.history.push('/?region=' + props.PlacesStore.currentCity?.name);
    }
  };

  return (
    <header className="w-100 px-2" onClick={() => setAnchorEl(null)}>
      <div className="d-flex justify-content-between align-items-center align-content-center my-2">
        <div className="cities-input">
          {isFavorite
            ? (
              <IconButton onClick={() => {
                toFavoritePlaces();
              }}
              >
                <ArrowBackIosNewOutlinedIcon color="black" />
              </IconButton>
            ) : (
              <Button
                className="p-3"
                aria-haspopup="true"
                color="primary"
                variant="outlined"
                disableElevation
                onClick={(e) => {
                  setAnchorEl(anchorEl ? null : e.currentTarget);
                  e.stopPropagation();
                }}
                startIcon={<PlaceIcon fontSize="small" />}
                endIcon={<KeyboardArrowDownIcon fontSize="small" />}
              >
                <Typography variant="button">{value?.name}</Typography>
              </Button>
            )}
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
            {placesStore.cities.map((city) => (
              <MenuItem
                key={city.id}
                onClick={() => {
                  placesStore.setCurrentCity(city);
                  setAnchorEl(null);
                }}
              >
                <Typography variant="subtitle2">{city.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
        {isFavorite && <Typography variant="h1">PickSpot</Typography>}
        <IconButton
          ref={ref}
          tabIndex={15}
          onClick={() => {
            toFavoritePlaces();
          }}
        >
          <MyTag
            withoutBorder
            icon={<Typography variant="h5" color={Colors.black}>{props.PlacesStore.favoritePlaces.length}</Typography>}
            backgroundColor={Colors.red5}
          >
            <FavoriteIcon color="white" />
          </MyTag>
        </IconButton>

      </div>

    </header>
  );
}

export default MobXRouterDecorator(Header);
