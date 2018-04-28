import { observable, action } from 'mobx';
class TopUsers {
    @observable topUsers = [];

    constructor(props) {
        this.topUsers = [1,2,3,4,5,6,7,8,9,10,11,12]//list.branch.slice(); // fetch from server []
    }

}

export default new TopUsers();
