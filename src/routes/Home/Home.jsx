import React, { Component } from 'react'
import style from './Home.scss'
import PropTypes from "prop-types";
import LoginView from './Views/LoginView'
import IndexView from './Views/IndexView'
import RuleView from './Views/RuleView'
import GameView from './Views/GameView'
import RankView from './Views/RankView'
import IsAuth from 'components/IsAuth'

import toplogo from 'assets/toplogo.png'
import bottom from 'assets/bottom.png'
import bg from 'assets/bg.png'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomshow:true,
      stageStatus:0,
    };
    this.customRoute = this.customRoute.bind(this);
    this.HandleStageStatus = this.HandleStageStatus.bind(this);
    this.onresize = this.onresize.bind(this);
  }
  componentDidMount()
  {
    let self = this;
    window.addEventListener('resize', this.onresize, false)
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
  onresize(){
    let self = this;
    if (window.document.body.clientHeight/(window.screen.height-108)<0.7) {
      self.state.bottomshow = false;
      self.setState(self.state);
    }else{
      self.state.bottomshow = true;
      self.setState(self.state);
    }
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
  componentWillUnmount(){
    window.removeEventListener('resize',this.onresize,false);
  }
  render() {
    return (
      <div className={style.Box} style={{backgroundImage:'url('+bg+')'}}>
          {/* <IsAuth /> */}
          <img src={toplogo} className={style.toplogo} alt=""/>
          {this.customRoute()}
          {this.state.bottomshow?<div className={style.FloatBottom}>
            <img src={bottom} alt=""/>
          </div>:''}
      </div>
    )
  }
}
Home.childContextTypes = {
  HandleRouteStatus:PropTypes.func,
};
export default Home
