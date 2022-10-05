import React from 'react';
import PlaceCard from '@pages/Place';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Page from '@components/system/Page';
import ErrorBoundary from '@components/system/ErrorBoundary';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import NotificationWindow from './NotificationWindow';
import {Web3ReactProvider} from "@web3-react/core";
import Web3 from "web3";


function getLibrary(provider) {
  return new Web3(provider)
}

function Router(props: MOBXDefaultProps) {
  const getPage = (routerProps, Component, type?:any) => {
    return (
      <Page>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component type={type} {...routerProps} />
        </Web3ReactProvider>
      </Page>
    );
  };

  return (
    <BrowserRouter>
      <NotificationWindow />
      <ErrorBoundary throwError={props.services.appService.errorListener}>
        <Switch>
          <Route exact path="/" render={p => getPage(p, PlaceCard)} />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
export default MobXRouterDecorator(Router, false);
