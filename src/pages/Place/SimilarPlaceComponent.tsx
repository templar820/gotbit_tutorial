import React, { useState } from 'react';
import { Tooltip, Typography, Zoom } from '@mui/material';
import { Place } from '../../api/api';

function SimilarPlaceComponent(props: {data: Place, onClick: (data: Place) => void}) {
  const [show, setShow] = useState(false);

  const { data } = props;
  return (
    <Tooltip
      placement="top"
      open={show}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 300 }}
      title="Позиция добавлена в ленту"
      arrow
    >
      <div
        tabIndex={10}
        className="d-flex mx-2 mt-2 flex-column justify-content-start w-100 "
        onClick={() => {
          setShow(true);
          props.onClick(data);
          setTimeout(() => {
            setShow(false);
          }, 2000);
        }}
      >
        <div className="br-16" style={{ height: 148 }}>
          <img className="br-16 m-auto" src={data.photos[0]} alt="" />
        </div>
        <div className="d-flex flex-column w-100 mt-2">
          <Typography className="ms-2 align-self-start" variant="subtitle1">
            {data.title}
          </Typography>
        </div>
      </div>
    </Tooltip>
  );
}

export default SimilarPlaceComponent;
