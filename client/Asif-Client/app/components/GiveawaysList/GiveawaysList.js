import React, { Component } from 'react';
import GiveawayItem from './../GiveawayItem/GiveawayItem';
import { observer } from 'mobx-react/native'
import { List , ListItem} from 'native-base';


@observer class GiveawaysList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { giveaways } = this.props;
        return ( 
            <List>
            {
                giveaways.map((g,i) => <GiveawayItem key={i}></GiveawayItem>)
            }
            </List>)

        }
    }
    export default GiveawaysList;
