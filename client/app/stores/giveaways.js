import { observable, action } from 'mobx';
import list from './giveaways.json'; // TEMPORARLY - UNTIL BACKEND
class Giveaways {
    @observable giveaways = [];

    constructor(props) {
        this.giveaways = [1,2,3,4,5,6,7,8,9,10,11,12]//list.branch.slice(); // fetch from server []
    }

}

export default new Giveaways();
