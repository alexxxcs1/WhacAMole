import React, { Component } from 'react'
import style from './GameView.scss'
import PropTypes from "prop-types";
import DarkBox from 'components/DarkBox'

import mice from './img/mice.png'
import miceonhit from './img/miceonhit.png'
import cat from './img/cat.png'
import catonhit from './img/catonhit.png'
import harm from './img/harm.png'

import balloon0 from './img/balloon0.png'
import balloon1 from './img/balloon1.png'
import balloon2 from './img/balloon2.png'
  
let gameTimerInterval;
let gameInterval;

let ballonArray = [
    {
        object:balloon0,
        clicked:false,
    },
    {
        object:balloon1,
        clicked:false,
    },
    {
        object:balloon2,
        clicked:false,
    }
];
const TextData = [
    {
        title:'3种程度AD',
        content:'安理申是中国唯一获批轻、 中、重度AD适应症的药物'
    },
    {
        title:'改善6大症状',
        content:'安理申10mg标准治疗，全面改善六大症状，照料更轻松'
    },
    {
        title:'肾功能不全者0减量',
        content:' 肾功能不全患者无需调整剂 量，安全性更高'
    },
    {
        title:'',
        content:'改善认知首选，全程标 准治疗 '
    }
]

const name=['小易','小艾','诗诗','小邦','小思'];
export class GameView extends Component {
constructor(props) {
  super(props);
  this.state = {
    gameResultShow:false,

    balloonFlyIng:false,
    balloonInfoShow:false,
    balloonInfo:{
        title:'',
        content:''
    },
    gamepaused:false,
    time:60,
    score:0,
    GameArray:[
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ],
    MiceType:[
        [0,0,0],
        [0,1,0],
        [0,0,0],
    ],
    NameArray:[
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ],
    HitStatus:[
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.gameStart = this.gameStart.bind(this);
     this.createGameBox = this.createGameBox.bind(this);
     this.onHitMice = this.onHitMice.bind(this);

     this.BalloonClick = this.BalloonClick.bind(this);
     this.HandleBaloonInfo = this.HandleBaloonInfo.bind(this);
     this.gameRestart = this.gameRestart.bind(this);
     this.HandleResult = this.HandleResult.bind(this);
     this.gameEnd = this.gameEnd.bind(this);
     this.nextView = this.nextView.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.gameStart();
  ballonArray.sort(function() {
    return .5 - Math.random();
  });
}
refreshProps(props) {
  
}
gameStart(){
    let self = this;
    this.state.time = 60;
    this.setState(this.state);
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
    gameInterval = setInterval(() => {
        if (this.state.gamepaused) return;
        for (let z = 0; z < this.state.GameArray.length; z++) {
            for (let x = 0; x < this.state.GameArray[z].length; x++) {
                if(this.state.GameArray[z][x]>0){
                    this.state.GameArray[z][x] = 0;
                }else{
                    this.state.HitStatus[z][x] = 0;
                    this.state.NameArray[z][x] = Math.round(Math.random() * (name.length-1));
                    this.state.MiceType[z][x] =  Math.round(Math.random()-0.2);
                    this.state.GameArray[z][x] = Math.round(Math.random());
                }
            }
        }
        self.setState(self.state);
    }, 1500);
    gameTimerInterval = setInterval(() => {
        if (this.state.gamepaused) return;
        this.state.time -= 1;
        if (this.state.time<=0) {
            this.state.time = 0;
            
            this.gameEnd();
        }else{
            let during = 60 - this.state.time;
            if ((during>5&&during<=20)||(during>25&&during<=40)||(during>45&&during<=60)) {
                this.state.balloonFlyIng = true;   
            }else{
                this.state.balloonFlyIng = false;   
            }
        }
        this.setState(this.state);
    }, 1000);
}
componentWillUnmount(){
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
}
onHitMice(pos){
    if (this.state.MiceType[pos[0]][[pos[1]]]) {
        this.state.score-=1;
    }else{
        this.state.score+=1;
    }
    this.state.HitStatus[pos[0]][[pos[1]]] = 1;
    this.state.GameArray[pos[0]][[pos[1]]] = 0;
    this.setState(this.state);
}
createGameBox(){
    return (
        <div className={[style.GameBox,'childcenter childcolumn'].join(' ')}>
            {(()=>{
                let row = [];
                for (let z = 0; z < this.state.GameArray.length; z++) {
                    row.push(
                        <div className={[style.Row,'childcenter'].join(' ')}>
                            {(()=>{
                                let hole = [];
                                for (let x = 0; x < this.state.GameArray[z].length; x++) {
                                    hole.push(
                                    <div className={[style.HoleBox,'childcenter childcolumn childcontentend'].join(' ')}>
                                        <div className={style.Hole}>
                                            <div className={[style.mice,this.state.GameArray[z][x]?style.miceUp:style.miceDown].join(' ')}>
                                                {this.state.HitStatus[z][x]?<img src={harm} className={style.Harm} alt=""/>:''}
                                                <img  onClick={this.onHitMice.bind(this,[z,x])} src={this.state.GameArray[z][x]?(this.state.MiceType[z][x]?cat:mice):this.state.HitStatus[z][x]?(this.state.MiceType[z][x]?catonhit:miceonhit):(this.state.MiceType[z][x]?cat:mice)}   alt=""/>
                                                {this.state.MiceType[z][x]?'':<div className={[style.TextBox,'childcenter'].join(' ')}>{name[this.state.NameArray[z][x]]}</div>}
                                            </div>
                                        </div>
                                    </div>)
                                }
                                return hole;
                            })()}
                        </div>
                    )
                }
                
                return row;
            })()}
        </div>
    )
}
BalloonClick(index){
    ballonArray[index].clicked = true;
    this.state.score+=5;
    this.state.gamepaused = true;
    this.state.balloonInfoShow = true;
    this.state.balloonInfo = TextData[Math.round(Math.random()*(TextData.length-1))];
    this.setState(this.state);
}
HandleBaloonInfo(boolean){
    this.state.gamepaused = boolean;
    this.state.balloonInfoShow = boolean;
    this.setState(this.state);
}
HandleResult(boolean){
    this.state.gameResultShow = boolean;
    this.setState(this.state);
}
gameEnd(){
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
    this.state.gameResultShow = true;
    this.state.gamepaused = true;
    this.setState(this.state);
}
gameRestart(){
    this.state.score = 0;
    this.state.gamepaused = false;
    this.state.gameResultShow = false;
    this.setState(this.state);
    this.gameStart();
}
nextView(){
    this.context.HandleRouteStatus(4);
}
render() {
  return (
    <div className={[style.ViewBox,'childcenter','childcolumn'].join(' ')}>
        {/* {this.state.score} */}
        {this.state.gameResultShow?<DarkBox >

            <div className={[style.ResultBox,'childcenter childcolumn'].join(' ')}>
                <div>游戏结束</div>
                <div>本局分数： <span>{this.state.score*1000000}分</span>  </div>
                <div>历史成绩： <span>9999999分</span> </div>
                <div>奖券数： <span>9999999张</span> </div>
                <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
                    <button className={style.Button} onClick={this.gameRestart}>再来一次</button>
                    <button className={style.Button} onClick={this.nextView}>奖券查看</button>
                </div>
            </div>

        </DarkBox>:''}
        {this.state.balloonInfoShow?<DarkBox >
            {this.state.balloonInfo?<div className={[style.TipsBox,'childcenter childcolumn'].join(' ')}>
                <span>关键信息</span>
                <span>{this.state.balloonInfo.title}</span>
                <span>{this.state.balloonInfo.content}</span>
                <div className={[style.CloseButton,'childcenter'].join(' ')} onClick={this.HandleBaloonInfo.bind(this,false)}>继续游戏</div>
            </div>:''}
        </DarkBox>:''}
        {this.state.balloonFlyIng?<div className={style.balloonBox}>
            <div className={style.EffeBalloon}>
                { (60 - this.state.time>5&&60 - this.state.time<=20)?(ballonArray[0].clicked?'':<img onClick={this.BalloonClick.bind(this,0)} src={ballonArray[0].object} alt=""/>):''}
                { (60 - this.state.time>25&&60 - this.state.time<=40)?(ballonArray[1].clicked?'':<img onClick={this.BalloonClick.bind(this,1)} src={ballonArray[1].object} alt=""/>):''}
                { (60 - this.state.time>45&&60 - this.state.time<=60)?(ballonArray[2].clicked?'':<img onClick={this.BalloonClick.bind(this,2)} src={ballonArray[2].object} alt=""/>):''}
            </div>
        </div>:''}
        {this.createGameBox()}
        <div className={style.TimeBar}>
            <div className={style.Time} style={{width:Math.floor((this.state.time/60)*100) + '%'}}>
                
            </div>
        </div>
        <div className={[style.TimeNumber,'childcenter'].join(' ')}>剩余时间：{this.state.time}秒</div>
    </div>
   )
   }
}
GameView.contextTypes = {
    HandleRouteStatus: PropTypes.func
  };
export default GameView