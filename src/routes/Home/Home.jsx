import React, { Component } from 'react'
import style from './Home.scss'
import PropTypes from "prop-types";
import LoginView from './Views/LoginView'
import IndexView from './Views/IndexView'
import RuleView from './Views/RuleView'
import GameView from './Views/GameView'
import RankView from './Views/RankView'

import bottom from 'assets/bottom.png'
import bg from 'assets/bg.png'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageStatus:0,
    };
    this.customRoute = this.customRoute.bind(this);
    this.HandleStageStatus = this.HandleStageStatus.bind(this);
  }
  componentDidMount()
  {

  }
  HandleStageStatus(status){
    this.state.stageStatus = status;
    this.setState(this.state);
  }
  getChildContext() {
    return {
      HandleRouteStatus: this.HandleStageStatus,
    };
  }
  customRoute(){
    switch (this.state.stageStatus) {
      default:
        return <LoginView />
      case 1:
        return <IndexView />;    
      case 2:
        return <RuleView />;   
      case 3:
        return <GameView />;   
      case 4:
        return <RankView />;   
    }
  }
  render() {
    return (
      <div className={style.Box} style={{backgroundImage:'url('+bg+')'}}>
          {this.customRoute()}
          <div className={style.FloatBottom}>
            <img src={bottom} alt=""/>
          </div>
      </div>
    )
  }
}
Home.childContextTypes = {
  HandleRouteStatus:PropTypes.func,
};
export default Home
