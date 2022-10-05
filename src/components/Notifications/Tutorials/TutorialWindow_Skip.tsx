import React, { ReactNode } from 'react';
import {
  Backdrop, IconButton,
  Typography,
} from '@mui/material';
import Colors from '@colors';
import MyTag from '@common/MyTag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcons from '@svg-icons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlacesService, { ReactionsEnum } from '@services/Places.service';
import BaseNotification from '../BaseNotification';
import PlacesStore from '../../../stores/Places.store';

interface EducationWindowProps {
  onClose?: () => void;
  onClick: () => void;
  reference: React.ReactNode;
}

export default class TutorialWindow_Skip extends BaseNotification {
  protected message: string;

  protected reference: ReactNode;

  protected onClose: () => void;

  protected onClick: () => void;

  open(config: EducationWindowProps) {
    this.reference = config.reference;
    this.onClose = config.onClose;
    this.onClick = config.onClick;
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
          style={{ top: 71, right: 16 }}
          onClick={() => {
            this.closeNotification();
          }}
        >
          <Typography variant="h2" color={Colors.gray7}>{'Пропустить'.toLocaleUpperCase()}</Typography>
        </div>
        <IconButton
          className="position-absolute btn rounded p-3"
          style={{ left: target.x, top: target.y }}
          onClick={(e) => {
            e.stopPropagation();
            this.onClick();
            this.closeNotification(true);
          }}
        >
          <ArrowForwardIosIcon color="black" fontSize="small" />
        </IconButton>
        <div
          className="position-absolute"
          style={{ left: (target.x), top: target.y - 60 }}
        >
          <SvgIcons name="skip_tutorial" />
        </div>
        <div className="position-absolute cursor-pointer mw-100 mx-4" style={{ top: target.y - 140 }}>
          <Typography
            textAlign="center"
            style={{ opacity: 1 }}
            variant="h2"
            color={Colors.white}
          >
            Чтобы посмотреть на следующие места,
          </Typography>
          <Typography
            style={{ opacity: 1 }}
            textAlign="center"
            variant="h2"
            color={Colors.white}
          >
            Нажми на стрелочку
          </Typography>
        </div>

      </Backdrop>
    );
  }
}
