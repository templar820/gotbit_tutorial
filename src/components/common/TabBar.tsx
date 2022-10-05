import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcons from '@svg-icons';
import { ReactionsEnum } from '@services/Places.service';

interface TabBarProps{
  hideLike?: boolean
  hideNext?: boolean
  hideDislike?: boolean
  hidePrevious?: boolean;
  onClickNext?: (reactions, ref?: React.Ref<HTMLElement>) => void
  nextRef?: React.Ref<HTMLElement>;
  likeRef?: React.Ref<HTMLElement>;
  zIndex?: number;
  onClickPrevious?: () => void
}

function TabBar(props: TabBarProps) {
  return (
    <footer
      className="w-100 d-flex justify-content-center align-items-center flex-row"
      style={{ zIndex: props.zIndex || 1200 }}
    >
      {!props.hidePrevious && (
        <IconButton
          onClick={() => {
            props.onClickPrevious && props.onClickPrevious();
          }}
          className="btn rounded p-3"
        >
          <ArrowBackIosNewIcon color="black" fontSize="small" />
        </IconButton>
      )}
      {!props.hideDislike && (
        <IconButton
          onClick={() => {
            props.onClickNext && props.onClickNext(ReactionsEnum.DISLIKE);
          }}
          className="mx-3 btn rounded p-3"
        >
          <SvgIcons name="clear" height={35} width={35} />
        </IconButton>
      )}
      {!props.hideLike && (
        <IconButton
          ref={props.likeRef}
          onClick={() => {
            props.onClickNext && props.onClickNext(ReactionsEnum.LIKE, props.likeRef);
          }}
          className="me-3 btn rounded p-3"
        >
          <FavoriteIcon fontSize="large" color="green6" />
        </IconButton>
      )}
      {!props.hideNext && (
        <IconButton
          ref={props.nextRef}
          onClick={() => {
            props.onClickNext && props.onClickNext(ReactionsEnum.SKIP, props.nextRef);
          }}
          className="btn rounded p-3"
        >
          <ArrowForwardIosIcon color="black" fontSize="small" />
        </IconButton>
      )}
    </footer>
  );
}

export default TabBar;
