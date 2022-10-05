import React from 'react';
import { IconButton, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import { Place } from '../../api/api';


interface CardActionsBarProps{
  place: Place
}

function CardActionsBar(props: CardActionsBarProps) {
  const getNavBar = (description, value, icon, callback, index) => {
    return (
      <div key={index} className="d-flex flex-row ms-1">
        <IconButton
          onClick={() => {
            callback();
          }}
          className="btn rounded p-2"
        >
          {icon}
        </IconButton>
        <div className="d-flex flex-column justify-content-center ms-1">
          <Typography variant="button">{description}</Typography>
          {value && <Typography variant="caption">{value}</Typography>}
        </div>
      </div>
    );
  };
  const data = [
    {
      description: 'Займет',
      value: props.place.time_spent_in_place,
      icon: <AccessTimeIcon fontSize="small" color="info" />,
      callback: () => {

      }
    },
    {
      description: 'Позвонить',
      value: null,
      icon: <CallIcon fontSize="small" color="primary2" />,
      callback: () => {

      }
    },
    {
      description: 'Сайт',
      value: null,
      icon: <LanguageIcon fontSize="small" color="starsTextColor" />,
      callback: () => {

      }
    },

  ];

  return (
    <div className="mt-4 d-flex flex-row  justify-content-between align-items-center">
      {data.map((el, key) => {
        if (!el.value && el.description === 'Займет') return null;
        return getNavBar(el.description, el.value, el.icon, el.callback, el.value);
      })}
    </div>
  );
}

export default CardActionsBar;
