import '../css/social.css';
import PeopleIcon from '@mui/icons-material/People';
import Navbar from './Navbar'
import FriendList from './FriendList';
import Community from './Community';
import MainFeed from './MainFeed';

function Social() {
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