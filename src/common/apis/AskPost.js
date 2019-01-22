import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}
    //用户登录
    customer.UserLogin = (name,code,zone) => {
        return ajaxinstance.post('users/index',qs.stringify({
            name,code,zone
        }));
    }
    //获取排行榜信息
    customer.getRank = () => {
        return ajaxinstance.post('users/scoreOrder');
    }
    //获取排行榜信息
    customer.setScore = (total) => {
        return ajaxinstance.post('users/scoreTotal',qs.stringify({
            total
        }));
    }
    //微信授权
    customer.isAuth = (url) => {
        return ajaxinstance.post('index/GetCodeUrl',qs.stringify({
            url
        }));
    }
    
    
    return customer
  }
  
  export default AskPost