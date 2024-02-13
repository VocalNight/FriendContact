import axios from 'axios';
import { useState } from 'react';

export default function FriendModal({ handleClose, friendCategories, friend }) {
    const [selectedCategory, setSelectedCategory] = useState(friend ? friend.categoryId : '');

    function handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (!friend) {

        } else {
            createFriend(formJson);
        }
        
        handleClose();
    }

    function createFriend(formJson) {
        axios.post('https://localhost:7187/api/Friends',
        {
            Name: formJson.name,
            LastContactDate: formJson.lastContact,
            CategoryId: formJson.categorySel,
            DesiredContactFrequency: formJson.frequency,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    return (
        <div>
            <section className="modal-main">
                <form method="post" onSubmit={handleSubmit}>
                    <div>

                        <label htmlFor="fName">Name</label>
                        <input 
                        name="name" 
                        defaultValue={friend ? friend.name : ""} 
                        id="fName" 
                        type="text"></input>

                        <label htmlFor="fDaysWanted">Desired Contact Frequency</label>
                        <input 
                        name="frequency" 
                        type="number" 
                        defaultValue={friend ? friend.desiredContactFrequency : 0}
                        id="fDaysWanted"></input>

                        <label htmlFor="lastContact">Last contacted</label>
                        <input 
                        name="lastContact" 
                        defaultValue={friend ? friend.lastContactDate : null }
                        id="lastContact" 
                        type="date" />

                        <label htmlFor="categories">Category</label>
                        <select 
                        value={selectedCategory} 
                        onChange={e => setSelectedCategory(e.target.value)}
                        name="categorySel" 
                        id="categories">
                            {friendCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
