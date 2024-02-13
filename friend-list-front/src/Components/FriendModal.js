import axios from 'axios';

export default function FriendModal({ handleClose, friendCategories }) {

    function handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        createFriend(formJson);
        
        handleClose();
    }

    function createFriend(formJson) {
        axios.post('https://localhost:7187/api/Friends',
        {
            Name: formJson.name,
            LastContactDate: '2024-02-13T21:22:10.653Z',
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
                        <input name="name" id="fName" type="text"></input>

                        <label htmlFor="fDaysWanted">Desired Contact Frequency</label>
                        <input name="frequency" type="number" id="fDaysWanted"></input>

                        <label htmlFor="lastContact">Last contacted</label>
                        <input name="lastContact" id="lastContact" type="date" />

                        <label htmlFor="categories">Category</label>
                        <select name="categorySel" id="categories">
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
