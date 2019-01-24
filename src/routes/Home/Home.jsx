import React, { Component } from 'react'
import style from './Home.scss'
import PropTypes from "prop-types";
import LoginView from './Views/LoginView'
import IndexView from './Views/IndexView'
import RuleView from './Views/RuleView'
import GameView from './Views/GameView'
import RankView from './Views/RankView'
import IsAuth from 'components/IsAuth'
import ShareBox from 'components/ShareBox'

import toplogo from 'assets/toplogo.png'
import bottom from 'assets/bottom.png'
import bg from 'assets/bg.png'
import music from 'assets/music.png'
import musicaudio from 'assets/musicaudio.m4a'


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MusicOn:true,
      bottomshow:true,
      stageStatus:0,
    };
    this.customRoute = this.customRoute.bind(this);
    this.HandleStageStatus = this.HandleStageStatus.bind(this);
    this.onresize = this.onresize.bind(this);
    this.MusicHandle = this.MusicHandle.bind(this);
  }
  componentDidMount()
  {
    let self = this;
    window.addEventListener('resize', this.onresize, false)
    this.audioAutoPlay();
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
  audioAutoPlay() {
    var audio = this.refs.music;
    let self = this;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
      },
      false
    );
    document.addEventListener(
      "YixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
      },
      false
    );
  }
  MusicHandle(boolean){
    if (boolean) {
      this.refs.music.play();
      
    }else{
      this.refs.music.pause();
    }
    this.state.MusicOn = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.Box} style={{backgroundImage:'url('+bg+')'}}>
          <IsAuth />
          <ShareBox />
          <img src={toplogo} className={style.toplogo} alt=""/>
          <audio src={musicaudio} ref='music' style={{opacity:0}} loop></audio>
          <div className={[style.MucisBox,this.state.MusicOn?style.MusicOn:style.MusicOff].join(' ')} onClick={this.MusicHandle.bind(this,!this.state.MusicOn)}>
            <img src={music} alt=""/>
          </div>
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
