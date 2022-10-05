import AppService from '@services/App.service';
import { RouteComponentProps } from 'react-router';
import PlacesService from '@services/Places.service';
import AppStore from './stores/App.store';
import PlacesStore from './stores/Places.store';

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    REACT_APP_ENDPOINT: string;
  }
}
declare module '*.scss';

export enum StoresNames {
  AppStore='AppStore',
  PlacesStore='PlacesStore',
}

export interface IServices {
  appService: AppService;
  placesService: PlacesService;
}
export interface IStores {
  AppStore: AppStore;
  PlacesStore: PlacesStore;
}

export interface MOBXDefaultProps extends IStores, RouteComponentProps{
  services: IServices;
}
