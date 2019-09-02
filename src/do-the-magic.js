const prices = require("./data/prices");
const spents = require("./data/spents");
const supplies = require("./data/supplies");

class DoTheMagic {
  constructor() {
    this.consumptionPerLiter = 10;
  }
  getLiterPrice(date) {
    let list = this.sortBydate(prices)

    let mostRecentPrice = null;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      let _date = date.split("/")
      let _elem = element.date.split("/")
      _date = new Date(Number(_date[2]), Number(_date[1] - 1), Number(_date[0]))
      _elem = new Date(Number(_elem[2]), Number(_elem[1] - 1), Number(_elem[0]))
      if (_date.getTime() == _elem.getTime()) {
        return element.value;
      }
      if (_elem.getTime() < _date.getTime()) {
        mostRecentPrice = element.value;
      }
      if (_elem.getTime() > _date.getTime()) {
        return mostRecentPrice;
      }
    }

    return mostRecentPrice;
  }
  getSupplyPerDay() {
    let list = [];
    let suppliesList = this.sortBydate(supplies)
    suppliesList.forEach((supply, i, arr) => {
      list.push({
        value: supply.value / this.getLiterPrice(supply.date),
        date: supply.date
      });
    });
    return list;
  }
  getFuelConsumption() {
    let list = [];
    spents.forEach(spent => {
      list.push({
        value: (spent.value / this.consumptionPerLiter) * -1,
        date: spent.date
      });
    });
    return list;
  }
  sortBydate(array) {
    array.sort(function (a, b) {
      let elem_a = a.date.split("/")
      let elem_b = b.date.split("/")
      return new Date(Number(elem_a[2]), Number(elem_a[1] - 1), Number(elem_a[0])) - new Date(Number(elem_b[2]), Number(elem_b[1] - 1), Number(elem_b[0]));
    });
    return array;
  }
  mergeLiters() {
    let list = [];
    list = list.concat(this.getSupplyPerDay(), this.getFuelConsumption());
    //list = this.sortBydate(list)
    let newList = [];

    list.forEach((elem, i, arr_i) => {
      if (newList.length == 0) {
        newList.push({
          value: Number(parseFloat(Math.round(elem.value * 100) / 100).toFixed(2)),
          date: elem.date
        });
      } else {
        let newList_index = -1;
        if (
          newList.some((value, j, arr_j) => {
            if (elem.date == value.date) {
              newList_index = j;
              return true;
            } else {
              return false;
            }
          })
        ) {
          newList[newList_index].value = newList[newList_index].value + elem.value;
          newList[newList_index].value = Number(parseFloat(Math.round(newList[newList_index].value * 100) / 100).toFixed(2));
        } else {
          newList.push({
            value: Number(parseFloat(Math.round(elem.value * 100) / 100).toFixed(2)),
            date: elem.date
          });
        }
      }
    });
    return this.sortBydate(newList);
  }
  do() {
    //console.log(this.mergeLiters());
    return this.mergeLiters();
  }
}

module.exports = new DoTheMagic();
