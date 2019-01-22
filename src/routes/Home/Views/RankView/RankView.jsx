import React, { Component } from 'react'
import style from './RankView.scss'
import PropTypes from "prop-types";
import {api} from 'common/app'

import rank1 from './imgs/rank1.png'
import rank2 from './imgs/rank2.png'
import rank3 from './imgs/rank3.png'

const rank = [rank1,rank2,rank3];
  
export class RankView extends Component {
constructor(props) {
  super(props);
  this.state = {
      myself:null,
      data:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createRank = this.createRank.bind(this);
     this.returnIndex = this.returnIndex.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getRank();
}
refreshProps(props) {
  
}
createRank(){
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
        result.push(
        <div className={[style.ListRow,'childcenter'].join(' ')}>
            <div className={[style.ListColumn,'childcenter'].join(' ')}>{z<=2?<img className={style.rankType} src={rank[z]}/>:z+1}</div>
            <div className={[style.ListColumn,'childcenter'].join(' ')}> <div className={style.HeadImg}><img src={this.state.data[z].headimgurl} alt=""/></div> </div>
            <div className={[style.ListColumn,'childcenter'].join(' ')}>{this.state.data[z].name}</div>
            <div className={[style.ListColumn,'childcenter'].join(' ')}>{this.state.data[z].total}</div>
        </div>)
    }
    return result;
}
returnIndex(){
    this.context.HandleRouteStatus(1);
}
getRank(){
    api.getRank().then(res=>{
        console.log(res);
        if(res.code == 200){
            this.state.myself = res.data.first;
            this.state.data = res.data.scoreOrder;
            this.setState(this.state);
        }else{
            alert(res.msg)
        }
    },err=>{

    });
}
render() {
  return (
    <div className={[style.ViewBox,'childcenter','childcolumn'].join(' ')}>

        <div className={style.ListBox}>
            <div className={[style.ListHead,'childcenter'].join(' ')}>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>排行</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>头像</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>昵称</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>奖券</div>
            </div>
            {this.state.myself?<div className={[style.ListOfMy,style.ListRow,'childcenter'].join(' ')}>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>{this.state.myself.times<=3?<img className={style.rankType} src={rank[this.state.myself.times-1]}/>:this.state.myself.times}</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}><div className={style.HeadImg}><img src={this.state.myself.headimgurl} alt=""/></div></div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>{this.state.myself.name}</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>{this.state.myself.total}</div>
            </div>:''}
            {this.createRank()}
        </div>
        <div className={[style.ReturnIndex,'childcenter'].join(' ')} onClick={this.returnIndex}>返回主页</div>
    </div>
   )
   }
}
RankView.contextTypes = {
    HandleRouteStatus: PropTypes.func
  };
export default RankView