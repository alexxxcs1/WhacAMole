import React, { Component } from 'react'
import style from './LoginView.scss'
import PropTypes from "prop-types";
import maintitle from './imgs/maintitle.png'
import username from './imgs/username.png'
import userregion from './imgs/userregion.png'
import userid from './imgs/userid.png'

import {api} from 'common/app'
  
let timmer;
export class LoginView extends Component {
constructor(props) {
  super(props);
  this.state = {
    username:'',
    userregion:'',
    userid:'',
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onInputFocus = this.onInputFocus.bind(this);
     this.onInputBlur = this.onInputBlur.bind(this);
     this.Login = this.Login.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
onInputFocus(){
    clearTimeout(timmer);
}
onInputBlur() {
  timmer = setTimeout(() => {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
  }, 500);
}
onInputChange(type,e){
    this.state[type] = e.target.value;
    this.setState(this.state);
}
Login(){
    api.UserLogin(this.state.username,this.state.userid,this.state.userregion).then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.context.HandleRouteStatus(1);
        }else{
            alert(res.msg);
        }
    },err=>{
        console.log(err);
    })
}
render() {
  return (
    <div className={[style.ViewBox,'childcenter','childcolumn'].join(' ')}>
        <div className={style.maintitlebox}>
            <img src={maintitle} alt=""/>
        </div>
        <div className={style.LoginInfoBox}>
            <div className={[style.InfoInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={username} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的姓名' value={this.state.username} onChange={this.onInputChange.bind(this,'username')} onBlur={this.onInputBlur} onFocus={this.onInputFocus}/>
                </div>
            </div>
            <div className={[style.InfoInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={userregion} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的大区' value={this.state.userregion} onChange={this.onInputChange.bind(this,'userregion')} onBlur={this.onInputBlur} onFocus={this.onInputFocus}/>
                </div>
            </div>
            <div className={[style.InfoInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={userid} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的员工号' value={this.state.userid} onChange={this.onInputChange.bind(this,'userid')} onBlur={this.onInputBlur} onFocus={this.onInputFocus}/>
                </div>
            </div>
            <div className={[style.LoginButton,'childcenter'].join(' ')} onClick={this.Login}>
                <span>登</span>
                <span>陆</span>
            </div>
        </div>
    </div>
   )
   }
}
LoginView.contextTypes = {
    HandleRouteStatus: PropTypes.func
};
export default LoginView