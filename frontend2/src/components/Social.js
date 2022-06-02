import '../css/social.css';
import PeopleIcon from '@mui/icons-material/People';
import Navbar from './Navbar'
import FriendList from './FriendList';
import CommunitySidebar from './CommunitySidebar';
import MainFeed from './MainFeed';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Social() {

  const { user } = useSelector((state) => state.auth)

  console.log (user)

  return (
    <div className="App">
      <Navbar />
      <div className='grid-container'>
          <FriendList />
          <MainFeed />
          <CommunitySidebar />
      </div>
    </div>
  );
}

export default Social;