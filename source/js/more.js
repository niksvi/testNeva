const list = document.querySelector('.event-card__timing-list');
const li = document.querySelector('.event-card__feature--timing');
const text = document.querySelector('.event-card__feature-wrapper');
const more = document.querySelector('.event-card__timing-item--more');

const initMore = () => {
  if(list){
    const list2 = list.cloneNode(true);
    const addMore = (node) => {
      if (window.innerWidth >= 768 && (node.offsetWidth > (li.offsetWidth - text.offsetWidth))) {
        do {
          node.lastElementChild.remove();
          node.lastElementChild.remove();
          node.appendChild(more);
          more.classList.remove('visually-hidden');
        } while (node.offsetWidth > (li.offsetWidth - text.offsetWidth));
      } else if ((node.offsetWidth > li.offsetWidth) && window.innerWidth < 768) {
          do {
            node.lastElementChild.remove();
            node.lastElementChild.remove();
            node.appendChild(more);
            more.classList.remove('visually-hidden');
          } while (node.offsetWidth > li.offsetWidth);
        }
    }

    more.addEventListener('click', () => {
      more.remove();
      list.remove();
      li.appendChild(list2);
      list2.classList.add('event-card__timing-list--open');
    })

    addMore(list);
    window.addEventListener('resize', () => {
      addMore(list);
    })
  }
}

export {initMore};

