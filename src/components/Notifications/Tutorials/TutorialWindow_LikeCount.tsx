import React, { ReactNode } from 'react';
import {
  Backdrop, IconButton,
  Typography,
} from '@mui/material';
import Colors from '@colors';
import MyTag from '@common/MyTag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcons from '@svg-icons';
import BaseNotification from '../BaseNotification';
import PlacesStore from '../../../stores/Places.store';

interface EducationWindowProps {
  placeStore: PlacesStore;
  onClose?: () => void;
  onClick: () => void;
  reference: React.ReactNode;
}

export default class TutorialWindow_LikeCount extends BaseNotification {
  protected message: string;

  protected reference: ReactNode;

  protected placeStore: PlacesStore;

  protected onClose: () => void;

  protected onClick: () => void;

  open(config: EducationWindowProps) {
    this.reference = config.reference;
    this.onClose = config.onClose;
    this.onClick = config.onClick;
    this.placeStore = config.placeStore;
    this.sendNotify();
  }

  closeNotification(self?) {
    if (!self && this.onClose) {
      this.onClose();
    }
    this.close();
  }

  getNotificationWindow(): React.ReactNode {
    const target = this.reference.current?.getBoundingClientRect();

    return (
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ backgroundColor: Colors.gray10, opacity: 0.8 }}
        open
        onClick={() => {
          this.closeNotification();
        }}
      >
        <div
          className="position-absolute cursor-pointer"
          style={{ top: 401 }}
          onClick={() => {
            this.closeNotification();
          }}
        >
          <Typography variant="h2" color={Colors.gray7}>{'Пропустить'.toLocaleUpperCase()}</Typography>
        </div>
        <IconButton
          className="position-absolute"
          style={{ left: target.x, top: target.y }}
          tabIndex={15}
          onClick={(e) => {
            e.stopPropagation();
            this.onClick();
            this.closeNotification(true);
          }}
        >
          <MyTag
            withoutBorder
            icon={<Typography variant="h5" color={Colors.black}>{this.placeStore.favoritePlaces.length}</Typography>}
            backgroundColor={Colors.red5}
          >
            <FavoriteIcon color="white" />
          </MyTag>
        </IconButton>
        <div
          className="position-absolute"
          style={{ left: (target.x - 60), top: 16 }}
        >
          <SvgIcons name="like_count_tutorial" />
        </div>
        <Typography
          style={{ top: 91 }}
          textAlign="center"
          className="position-absolute cursor-pointer mw-100 mx-4"
          variant="h2"
          color={Colors.white}
        >
          Тут мы бережно храним твои лайки
        </Typography>
      </Backdrop>
    );
  }
}
