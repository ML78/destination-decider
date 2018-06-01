import React, { PureComponent as Component } from 'react';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class DestinationApp extends Component {
  state = {
  options: [],
  selectedOption: undefined
  };


  handleAddOption = (option) => {
    if(!option){
      return 'Please enter a valid item.';
    } else if(this.state.options.indexOf(option) > -1){
      return 'This option already exists.';
    }

    this.setState((prevState) => ( {
      options: prevState.options.concat([option])
    }));
  }

  handleDeleteOptions = () => {
    this.setState(() => ({options:[]})); //implicity returns the object wrapped in parenthesis
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({
        selectedOption: undefined
    }));
}

  //lifecycle methods
  componentDidMount(){
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if(options){
        this.setState(() => ({options}));
      }
    } catch(e){
      this.setState(() => ({
        options: []
      }));
    }

    const json = localStorage.getItem('options');
    const options = JSON.parse(json);

    if(options){
      this.setState(() => ({options}));
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount(){
    //to see individual options that get removed:
    console.log('componentWillUnmount');
  }

  render(){
      const subtitle = "Can't decide where to go on your next trip?"

      return(
        <div>
          <Header subtitle={subtitle} />

          <div className="container">
            <Action
              hasOptions={this.state.options.length>0}
              handlePick={this.handlePick}
            />
            <div className="widget">
              <Options
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
              />
              <AddOption
                handleAddOption={this.handleAddOption}
              />
              </div>
          </div>
          <OptionModal
              selectedOption={this.state.selectedOption}
              handleClearSelectedOption={this.handleClearSelectedOption}
              />
        </div>
      );
  }
}
