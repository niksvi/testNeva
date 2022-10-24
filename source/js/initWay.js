const selectAB = document.querySelector('#timeAB');
const selectBA = document.querySelector('#timeBA');
const route = document.querySelector('#route');
const num = document.querySelector('#num');
const btn = document.querySelector('#btn');
const time = document.querySelector('#time');
const submit = document.querySelector('#submit');
const times = document.querySelectorAll('.time');


const differenceTimeZone = (-(new Date().getTimezoneOffset())/60)-3;
const duration = 50;

let price,value,departure,h,m,arrival,date,dateArrival;

if (times) {
  times.forEach((item) => {
    item.textContent = new Date((new Date(item.value).setHours((new Date(item.value).getHours() + differenceTimeZone)))).getHours() + ":" + (new Date(item.value).getMinutes()<10?'0':'') + new Date(item.value).getMinutes();
  })
}

const initWay = () => {
  if (route) {
  if(route.value == "AB" || route.value == "BA"){
    price = 700;
  } else price = 1200;

  const labelAB = document.createElement('label');
  labelAB.textContent = "из A в B ";
  labelAB.setAttribute("for", "timeAB");

  const labelBA = document.createElement('label');
  labelBA.textContent = "из B в A ";
  labelBA.setAttribute("for", "timeBA");

  const handlerSelectAB = () => {
    if((Date.parse(selectBA.value)) < (Date.parse(selectAB.value) + duration * 60000)) {
      do {
        selectBA.options[0].remove();
      } while ((Date.parse(selectBA.value)) < (Date.parse(selectAB.value) + duration * 60000));
    };
  }

  route.addEventListener('change', () => {
    if (route.value == 'AB') {
      selectBA.style.display = "none";
      selectAB.style.display = "inline-block";
      time.style.display = "inline";
      submit.style.display = "inline";
      labelAB.remove();
      labelBA.remove();
    } else if (route.value == 'BA'){
      selectAB.style.display = "none";
      selectBA.style.display = "inline-block";
      time.style.display = "inline";
      submit.style.display = "inline";
      labelAB.remove();
      labelBA.remove();
    } else if (route.value == 'ABA'){
      selectAB.parentElement.insertBefore(labelAB, selectAB);
      selectBA.parentElement.insertBefore(labelBA, selectBA);
      selectBA.style.display = "inline-block";
      selectAB.style.display = "inline-block";
      time.style.display = "inline";
      submit.style.display = "inline";
      handlerSelectAB();

      selectAB.addEventListener('change', () => {
        handlerSelectAB();
      })

    } else {
      selectBA.style.display = "none";
      selectAB.style.display = "none";
      time.style.display = "none";
      submit.style.display = "none";
      labelAB.remove();
      labelBA.remove();
    }
  })

  btn.addEventListener('click', () => {
    if(!num.value){
      alert('укажите кол-во билетов');
      return
    }
    if(route.value == "AB" || route.value == "BA"){
      price = 700;
    } else {
      price = 1200;
    }

    if(route.value == "AB" || route.value == "ABA") {
      value = selectAB.options[selectAB.selectedIndex].value;
    } else if(route.value == "BA") {
      value = selectBA.options[selectBA.selectedIndex].value;
    }

    date = new Date(value);
    h = new Date(date.setHours(date.getHours() + differenceTimeZone)).getHours();
    m = (date.getMinutes()<10?'0':'') + date.getMinutes();
    departure = h + ":" + m;
    dateArrival = new Date(date.setMinutes(date.getMinutes() + duration));

    if(route.value == "ABA") {
      const valueBA = selectBA.options[selectBA.selectedIndex].value;
      const upM = new Date(new Date(valueBA).setMinutes(new Date(valueBA).getMinutes() + duration));
      dateArrival = new Date(new Date(upM).setHours(new Date(upM).getHours() + differenceTimeZone));
    }
    const newDuration = (dateArrival - new Date(new Date(value).setHours(new Date(value).getHours() + differenceTimeZone))) / 60000;
    arrival = dateArrival.getHours() + ":" + (dateArrival.getMinutes()<10?'0':'') + dateArrival.getMinutes();

    alert('Вы выбрали ' + num.value + ((num.value%10 == 1) ? ' билет' : ((num.value%10 > 1) && (num.value%10 < 5)) ? ' билета' : ' билетов') + ' по маршруту ' + route.options[route.selectedIndex].text + ' стоимостью ' + price*num.value + 'р.\n'
          + 'Это путешествие займет у вас ' + ((route.value == "ABA") ? newDuration : duration) + ' минут. \n'
          + 'Теплоход отправляется в ' + departure + ', а прибудет в ' + arrival);
  })
}
}

export {initWay};
