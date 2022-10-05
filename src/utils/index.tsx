import ContactFactory from './ContactFactory';
import CategoriesFactory from './CategoriesFactory';

export default class UTILS {
  static ContactFactory = new ContactFactory();

  static CategoriesFactory = new CategoriesFactory();

  static getInPx = (number: number) => `${number}px`;

  static flipCardAndGetNewIndex = (direction: 'right' | 'left', currentRef, index) => {
    const moveOutWidth = document.body.clientWidth * 1.5;
    let newCount = index;
    if (direction === 'right') {
      --newCount;
      const card = currentRef.previousSibling! as HTMLElement;
      card.style.transform = '';
      card.style.opacity = 1;
    } else {
      const card = currentRef! as HTMLElement;
      card.style.opacity = 0;
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
      ++newCount;
    }
    return newCount;
  };
}
