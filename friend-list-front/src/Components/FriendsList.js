import { useEffect, useState } from "react";
import axios from 'axios';
import FriendModal from "./FriendModal";
import Modal from 'react-modal'

export default function FriendsList() {
const [friends, setFriends] = useState([]);
const [categories, setCategories] = useState([]);
const [showFriendsMod, setShowFriendsMod] = useState(false);
const [currentFriend, setCurrentFriend] = useState(null);


useEffect(() => {
    fetchCategories();
    fetchFriends();
}, [])

const fetchFriends = async () => {
    try {
        const response = await axios.get('https://localhost:7187/api/Friends');
        setFriends(response.data);
    }
    catch (error) {
        console.log(error)
    }
}

const fetchCategories = async () => {
    try {
        const response = await axios.get('https://localhost:7187/api/Categories');
        setCategories(response.data);
    }
    catch (error) {
        console.log(error)
    }
}

const editItem = (friend) => {
    console.log(friend)
    setCurrentFriend(friend);
    setShowFriendsMod(true);
}

const addItem = () => {
    setCurrentFriend(null);
    setShowFriendsMod(true);
}

const deleteItem = (id) => {
    axios.delete('https://localhost:7187/api/Friends/' + id);
}

    return(
        <>
        <div>
            <ul>
                {friends.map(friend => (
                    <li       
                    key={friend.id}>
                        {friend.name} - 
                        {friend.lastContactDate} - 
                        {friend.desiredContactFrequency} - 
                        {categories.find(c => c.id === friend.categoryId).name}
                        <button type="button" onClick={() => editItem(friend)}>Edit</button>
                        <button type="button" onClick={() => deleteItem(friend.id)}>Delete</button>
                        </li>
                ))}
            </ul>
            <Modal className="modal" ariaHideApp={false} isOpen={showFriendsMod}>
                    <FriendModal 
                    handleClose={() => setShowFriendsMod(false)} 
                    friendCategories={categories} 
                    friend={currentFriend} />
            </Modal>
            <div>
                <button type="button" onClick={() => addItem()}>New Friend</button>
            </div>
        </div>
        </>
    );
}
