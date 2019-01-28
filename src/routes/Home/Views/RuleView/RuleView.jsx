import React, { Component } from 'react'
import style from './RuleView.scss'
import PropTypes from "prop-types";
import maintitle from './imgs/maintitle.png'
  
export class RuleView extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.jumptogame = this.jumptogame.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
jumptogame(){
  this.context.HandleRouteStatus(3);
}
render() {
  return (
    <div className={[style.ViewBox,'childcenter','childcolumn'].join(' ')}>
        <img src={maintitle} className={style.maintitle} alt=""/>
        <div className={style.RuleDetial}>
            <p>现在我们的小安遇到了点麻烦，让我们一起协助他，帮助他打倒怪地鼠，助力安理申跨越五亿。</p> 
            <p>1.“告白”安理申排行榜前10名2亿分，前500名1亿分</p> 
            <p>2.游戏时长1分钟，点击小易、小艾、诗诗、小邦、小思，即可获得分数（3百万分）</p> 
            <p>3.点击安理申产品地鼠，将扣取分数（3百万分）</p> 
            <p>4.上方会随机飘过气球，点击气球获得分数（5百万分），出现关键信息</p> 
            <p>5.与“告白”安理申活动积分相累计，每1亿分可兑换1奖券，可用以“喝彩”安理申的终极竞猜活动</p> 
        </div>
        <div className={[style.ReadyToPlay,'childcenter'].join(' ')} onClick={this.jumptogame}>我已了解规则</div>
    </div>
   )
   }
}
RuleView.contextTypes = {
  HandleRouteStatus: PropTypes.func
};
export default RuleView