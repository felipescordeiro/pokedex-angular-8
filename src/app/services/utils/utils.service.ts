import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getBackgroundColor(type) {
    switch (type) {
      case "water":
        return '#4592c4';

      case "rock":
        return '#a38c21';

      case "fire":
        return '#fd7d24';

      case "grass":
        return '#9bcc50';

      case "eletric":
        return '#eed535';

      case "bug":
          return '#729f3f';

      case "flying":
        return '#bdb9b8';

      case "ice":
        return '#51c4e7';

      case "fighting":
        return '#d56723';

      case "poison":
          return '#b97fc9';

      case "psychic":
        return '#f366b9';

      case "ground":
        return '#ab9842';

      case "steel":
        return '#9eb7b8';

      case "fairy":
        return '#fdb9e9';

      case "ghost":
        return '#7b62a3';

      case "dark":
        return '#707070';

      case "dragon":
        return '#f16e57';

      default:
        return '#a4acaf';

    }
  }
}
