import React, { PureComponent as Component } from 'react';
import Header from './Header';

export default class DestinationApp extends Component {
  render(){
      const subtitle = "Can't decide where to go on your next trip?"

      return(
        <div>
          <Header subtitle={subtitle} />
        </div>
      );
  }
}
