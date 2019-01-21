import React, { Component } from 'react'
import style from './IndexView.scss'
import PropTypes from "prop-types";
import title from './imgs/title.png'
import maintitle from './imgs/maintitle.png'

import fish from './imgs/fish.png'
import hangdrop from './imgs/hangdrop.png'

export class IndexView extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.goToRule = this.goToRule.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
goToRule(){
    this.context.HandleRouteStatus(2);
}
render() {
  return (
    <div className={[style.ViewBox,'childcenter','childcolumn'].join(' ')}>
        <img src={maintitle} className={style.maintitle} alt=""/>
        <div className={[style.EffectBox,'childcenter'].join(' ')}>
            <div className={[style.fishroad,'childcenter','childcontentend'].join(' ')}>
                <img src={fish} className={style.fishpng} alt=""/>
                <img src={fish} className={style.fishpng} alt=""/>
            </div>
            <img src={hangdrop} className={style.hangdroppng} alt=""/>
            <img src={title} className={style.Titlepng} alt=""/>
        </div>
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            <div className={style.Button} onClick={this.goToRule}>活动规则</div>
            <div className={style.Button}>奖券查看</div>
        </div>
    </div>
   )
   }
}
IndexView.contextTypes = {
    HandleRouteStatus: PropTypes.func
};
export default IndexView