import React, { Component } from 'react'
import style from './IsAuth.scss'
import {api} from 'common/app'
import PropTypes from "prop-types";
  
export class IsAuth extends Component {
constructor(props) {
  super(props);
  this.state = {
    isAuth:false,
    isLogin:false,
  };
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  api.isAuth(window.location.href).then(res=>{
    if (res.code != 200) {
      if (res.code == 203) {
        this.state.isAuth = false;
        window.location = res.data;
      }else if(res.code == 202){
        this.state.isLogin = false;
        this.context.HandleRouteStatus(0);
      }
    }else{
      this.state.isAuth = true;
      this.state.isLogin = true;
      this.context.HandleRouteStatus(1);
      this.setState(this.state);
    }
    },err=>{
  })
}
refreshProps(props) {

}
IsAuth(){
    
}
render() {
  return (
    <div style={{display:'none'}}>
        
    </div>
   )
   }
}
IsAuth.contextTypes = {
  HandleRouteStatus: PropTypes.func
};
export default IsAuth