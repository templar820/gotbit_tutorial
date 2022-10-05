import React, { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import MySwiper from '@common/Swiper/Swiper';
import { IconButton, Typography } from '@mui/material';
import MyTag from '@common/MyTag';
import SectionCard from '@common/SectionCard';
import MyDrawer from '@common/MyDrawer';
import Colors from '@colors';
import { ContactItem } from '../../utils/ContactFactory';
import { Contact, Place } from '../../api/api';
import UTILS from '../../utils';

function PlaceCardContact(props: {place: Place}) {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState([]);

  const { place } = props;

  const getContactCategories = (contacts: Contact[]) => {
    const array = contacts.reduce((acc, el) => {
      const res = UTILS.ContactFactory.getContactRules(el);
      if (res) {
        acc.push(res);
      }
      return acc;
    }, []);
    const dictionary = new Map();
    array.forEach(el => {
      if (dictionary.has(el.groupType)) {
        const oldArr = dictionary.get(el.groupType);
        oldArr.push(el);
        dictionary.set(el.groupType, oldArr);
      } else {
        dictionary.set(el.groupType, [el]);
      }
    });
    const newArray = [];
    for (const [key, value] of dictionary.entries()) {
      if (value.length === 1) {
        newArray.push(...value);
      } else {
        newArray.push(value);
      }
    }

    return newArray;
  };

  return (
    <>
      <SectionCard
        hide={!place.contacts.length}
        title="Контакты"
        icon={<ShareIcon />}
      >
        <MySwiper
          list={getContactCategories(place.contacts) || []}
          loop={false}
          slidesPerView={4}
        >
          {
            (contact: ContactItem | ContactItem[]) => {
              let rules;
              if (Array.isArray(contact) && contact.length) {
                rules = contact[0];
                rules.action = () => {
                  setOpen(true);
                  const list = (
                    <div className="d-flex flex-column w-100">
                      {contact!.map((el) => {
                        return (
                          <div
                            className="d-flex flex-row my-2 align-items-center"
                            onClick={() => {
                              if (el.type === 'phone') {
                                window.open(`tel:${el.contact}`, '_self');
                              } else {
                                window.open(el.contact, '_blank').focus();
                              }
                            }}
                          >
                            <IconButton className="me-2" color="linkColor">
                              {el.icon}
                            </IconButton>
                            <Typography variant="button">
                              {el.contact}
                            </Typography>
                          </div>
                        );
                      })}
                    </div>
                  );
                  setList(list);
                };
              } else {
                rules = contact;
              }
              if (!rules) return null;
              return (
                <MyTag
                  className="mb-1"
                  icon={rules.icon}
                  backgroundColor={Colors.white}
                  onClick={() => {
                    rules!.action();
                  }}
                />
              );
            }
          }
        </MySwiper>
      </SectionCard>
      <MyDrawer mode="bottom" open={open} onClose={() => setOpen(false)}>
        {list}
      </MyDrawer>
    </>

  );
}

export default PlaceCardContact;
