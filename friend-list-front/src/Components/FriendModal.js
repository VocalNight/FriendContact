import { useState } from 'react';
import { addFriend, updateFriend } from '../Slices/friendsSlice';
import { useDispatch } from 'react-redux';

export default function FriendModal({ handleClose, friendCategories, friend }) {
    const [selectedCategory, setSelectedCategory] = useState(friend ? friend.CategoryId : '');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (friend) {
            editFriend(friend, formJson);
        } else {
            createFriend(formJson);
        }

        handleClose();
    }

    function createFriend(formJson) {
        dispatch(addFriend({
            Name: formJson.name,
            LastContactDate: formJson.lastContactDate,
            CategoryId: parseInt(formJson.categoryId),
            DesiredContactFrequency: formJson.desiredContactFrequency,
        }));
    }

    function editFriend(friend, formJson) {
        dispatch(updateFriend(
            {
                Id: friend.Id,
                Name: formJson.name,
                LastContactDate: formJson.lastContactDate,
                //Returns the id as a string if i don't do this :)
                CategoryId: parseInt(formJson.categoryId),
                DesiredContactFrequency: formJson.desiredContactFrequency,
            }));
    }

    return (
        <div>
            <section className="modal-main">
                <form method="post" onSubmit={handleSubmit}>
                    <div>

                        <label htmlFor="fName">Name</label>
                        <input
                            name="name"
                            defaultValue={friend ? friend.Name : ""}
                            id="fName"
                            type="text"></input>

                        <label htmlFor="fDaysWanted">Desired Contact Frequency</label>
                        <input
                            name="desiredContactFrequency"
                            type="number"
                            defaultValue={friend ? friend.DesiredContactFrequency : 0}
                            id="fDaysWanted"></input>

                        <label htmlFor="lastContact">Last contacted</label>
                        <input
                            name="lastContactDate"
                            defaultValue={friend ? friend.LastContactDate : null}
                            id="lastContact"
                            type="date" />

                        <label htmlFor="categories">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            name="categoryId"
                            id="categories">
                            {friendCategories.map(category => (
                                <option key={category.Id} value={category.Id}>{category.Name}</option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <button type="submit">{friend ? "Edit" : "Create"}</button>
                        <button type="button" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
