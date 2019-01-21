import React, { Component } from 'react'
import style from './RankView.scss'
import PropTypes from "prop-types";
  
export class RankView extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.createRank = this.createRank.bind(this);
     this.returnIndex = this.returnIndex.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
createRank(){
    let result = [];
    for (let z = 0; z < 10; z++) {
        result.push(
        <div className={[style.ListRow,'childcenter'].join(' ')}>
            <div className={[style.ListColumn,'childcenter'].join(' ')}>排行</div>
            <div className={[style.ListColumn,'childcenter'].join(' ')}>头像</div>
            <div className={[style.ListColumn,'childcenter'].join(' ')}>昵称</div>
            <div className={[style.ListColumn,'childcenter'].join(' ')}>奖券</div>
        </div>)
    }
    return result;
}
returnIndex(){
    this.context.HandleRouteStatus(1);
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
            <div className={[style.ListOfMy,style.ListRow,'childcenter'].join(' ')}>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>排行</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>头像</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>昵称</div>
                <div className={[style.ListColumn,'childcenter'].join(' ')}>奖券</div>
            </div>
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