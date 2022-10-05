import React, { ReactNode } from 'react';
import {
  Backdrop, IconButton,
  Typography,
} from '@mui/material';
import Colors from '@colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcons from '@svg-icons';
import BaseNotification from '../BaseNotification';
import PlacesStore from '../../../stores/Places.store';

interface EducationWindowProps {
  onClose?: () => void;
  onClick: () => void;
  reference: React.ReactNode;
}

export default class TutorialWindow_Like extends BaseNotification {
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
          className="me-3 btn rounded p-3 position-absolute"
          style={{ left: target.x, top: target.y }}
          onClick={(e) => {
            e.stopPropagation();
            this.onClick();
            this.closeNotification(true);
          }}
        >
          <FavoriteIcon fontSize="large" color="green6" />
        </IconButton>
        <div
          className="position-absolute"
          style={{ left: (target.x), top: target.y - 70 }}
        >
          <SvgIcons name="like_tutorial" />
        </div>
        <div className="position-absolute cursor-pointer mw-100 mx-4" style={{ top: target.y - 200 }}>
          <Typography
            textAlign="center"
            variant="h2"
            color={Colors.white}
          >
            Чтобы не потерять понравившееся место,
          </Typography>
          <Typography
            textAlign="center"
            variant="h2"
            color={Colors.white}
          >
            нажми на лайк
          </Typography>
          <Typography
            textAlign="center"
            variant="h2"
            color={Colors.white}
          >
            А еще это поможет предложить НУЖНОЕ именно ТЕБЕ
          </Typography>
        </div>
      </Backdrop>
    );
  }
}
