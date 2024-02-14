import axios from 'axios';

export default function CategoryModal({ handleClose, currentCategory }) {

    function handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (currentCategory) {
            editCategory(currentCategory, formJson);
        } else {
            createCategory(formJson);
        }

        handleClose();
    }

    function createCategory(formJson) {
        axios.post('https://localhost:7187/api/Categories',
        {
            Name: formJson.name,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    function editCategory(category, formJson) {
        axios.put('https://localhost:7187/api/Categories/' + category.id, 
        {
            Id: category.id,
            Name: formJson.name,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }


    return (
        <div>
            <section className="modal-main">
                <form method="post" onSubmit={handleSubmit}>
                    <div>

                        <label htmlFor="fName">Name</label>
                        <input
                            name="name"
                            defaultValue={currentCategory ? currentCategory.name : ""}
                            id="fName"
                            type="text"></input>

                    </div>
                    <div>
                        <button type="submit">{currentCategory ? "Edit" : "Create"}</button>
                        <button type="button" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
