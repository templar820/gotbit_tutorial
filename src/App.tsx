import React from 'react';
import AppService from '@services/App.service';
import { Provider } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from '@mui/material';
import { IServices, IStores, StoresNames } from '@globalTypes';
import Loader from '@components/system/Loader';
import { SnackbarProvider } from 'notistack';
import PlacesService from '@services/Places.service';
import Router from './Router';
import theme from './styles/muiTheme';
import { Api, HttpClient } from './api/api';
import { RootStoreProvider, useRootStore } from './hooks/useRootStore';

function App() {
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const localStorageKeyId = 'pick_spot_user_id';
  let user_id = localStorage.getItem(localStorageKeyId);
  if (!user_id) {
    user_id = uuidv4();
    localStorage.setItem(localStorageKeyId, user_id);
  }

  const httpClient = new HttpClient<any>({
    securityWorker: securityData => securityData,
    baseUrl: endpoint,
  });
  httpClient.setSecurityData({
    headers: {
      Authorization: `Bearer ${user_id}`
    }
  });
  const apiService = new Api(httpClient);

  const { AppStore, PlacesStore } = useRootStore();

  const appService = new AppService(AppStore);
  const placesService = new PlacesService(apiService, PlacesStore, user_id);

  const stores = {
    [StoresNames.AppStore]: AppStore,
    [StoresNames.PlacesStore]: PlacesStore,
  } as IStores;

  const services = {
    appService,
    placesService,
  } as IServices;
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Provider {...stores} services={services}>
          <Loader />
          <Router />
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
