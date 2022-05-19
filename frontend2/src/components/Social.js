import '../css/social.css';
import PeopleIcon from '@mui/icons-material/People';
import Navbar from './Navbar'
import FriendList from './FriendList';
import Community from './Community';
import MainFeed from './MainFeed';
import { useLocation } from 'react-router-dom'

function Social() {

  // Import user info from login/app state
  const location = useLocation()
  const { userInfo } = location.state
  console.log(userInfo)

  return (
    <div className="App">
      <Navbar />
      <div className='grid-container'>
          <FriendList />
          <MainFeed />
          <Community />
      </div>
    </div>
  );
}

export default Social;