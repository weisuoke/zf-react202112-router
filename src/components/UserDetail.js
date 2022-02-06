import React from 'react';
import {UserAPI} from "../utils";
import {useLocation, useParams} from "../origin/react-router-dom";

function UserDetail(props) {
  const [user, setUser] = React.useState({});
  let location = useLocation()
  let params = useParams(); // 获取匹配对象
  React.useEffect(() => {
    let user = location.state;
    if (!user) {
      let id = params.id
      user = UserAPI.find(id)
    }
    if (user) setUser(user)
  }, [location.state, params.id])
  return (
    <div>{user.id}:{user.username}</div>
  )
}

export default UserDetail