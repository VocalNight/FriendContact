import { useState } from 'react';
import './App.css';
import FriendsList from './Components/FriendsList';
import CategoryList from './Components/CategoryList';

function App() {
  const [showFriends, setShowFriends] = useState(true)

  const changeView = () => {
    setShowFriends(!showFriends);
  }

  return (
    <>
      <div className='header'>
        <h1>Friend List manager</h1>
      </div>
      <div className='mainView'>
        {showFriends ?
          <FriendsList /> : <CategoryList />}
        <br></br>
        <div>
          <button onClick={() => changeView()}>
            {showFriends ? "Show Categories" : "Show Friends"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
