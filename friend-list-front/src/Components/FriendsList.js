import { useEffect, useState } from "react";
import axios from 'axios';
import FriendModal from "./FriendModal";
import Modal from 'react-modal'

export default function FriendsList() {
const [friends, setFriends] = useState([]);
const [categories, setCategories] = useState([]);
const [showFriendsMod, setShowFriendsMod] = useState(false);
const [showCategoryMod, setShowCategoryMod] = useState(false);

useEffect(() => {
    fetchCategories();
    fetchFriends();
}, [])

const fetchFriends = () => {
    axios.get('https://localhost:7187/api/Friends')
    .then(response => setFriends(response.data))
    .catch(error => console.log(error));
}

const fetchCategories = () => {
    axios.get('https://localhost:7187/api/Categories')
    .then(response => setCategories(response.data))
    .catch(error => console.log(error));
}

const check = () => {
    console.log(categories);
    console.log(categories.find(c => c.id === 1));
}

    return(
        <>
        <div>
            <ul>
                {friends.map(friend => (
                    <li 
                    onClick={() => check()} 
                    key={friend.id}>
                        {friend.name} - 
                        {friend.lastContactDate} - 
                        {friend.desiredContactFrequency} - 
                        {categories.find(c => c.id === friend.categoryId).name}
                        <button type="button">Edit</button>
                        <button type="button">Delete</button>
                        </li>
                ))}
            </ul>
            <Modal className="modal" isOpen={showFriendsMod}>
                    <FriendModal handleClose={() => setShowFriendsMod(false)} />
            </Modal>
            <div>
                <button type="button" onClick={() => setShowFriendsMod(true)}>New Friend</button>
                <button type="button">New Category</button>
            </div>
        </div>
        </>
    );
}
