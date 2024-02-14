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
    {showFriends ?
     <FriendsList/> : <CategoryList/> }
     <div>
      <button onClick={() => changeView()}>
        {showFriends ? "Show Categories" : "Show Friends"}
        </button>
     </div>
    </>
  );
}

export default App;
