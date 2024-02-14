import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FriendModal from "./FriendModal";
import Modal from 'react-modal'
import { fetchFriendsList, removeFriend } from "../Slices/friendsSlice";
import { fetchCategoriesList } from "../Slices/categoriesSlice";


export default function FriendsList() {
    const [showFriendsMod, setShowFriendsMod] = useState(false);
    const [currentFriend, setCurrentFriend] = useState(null);

    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friends.friends);
    const loading = useSelector((state) => state.friends.loading);
    const error = useSelector((state) => state.friends.error);

    const categories = useSelector((state) => state.categories.categories);
    const loadingCategories = useSelector((state) => state.categories.loading);
    const errorCategories = useSelector((state) => state.categories.error);



    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategoriesList());
        }
        if (friends.length === 0) {
            dispatch(fetchFriendsList());
        }
    }, [])

    const editItem = (friend) => {
        console.log(friend)
        setCurrentFriend(friend);
        setShowFriendsMod(true);
    }

    const addItem = () => {
        setCurrentFriend(null);
        setShowFriendsMod(true);
    }

    const deleteItem = async (id) => {
        await dispatch(removeFriend(id));
    }

    return (
        <>
            <div>
                {loading || loadingCategories ? (
                    <p>loading friends and categories...</p>
                ) : error || errorCategories  ? (
                    <p>Error loading your friends: {error}</p>
                ) : (
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
                )}
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
