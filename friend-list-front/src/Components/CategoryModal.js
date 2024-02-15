import { addCategory, updateCategory } from '../Slices/categoriesSlice';
import { useDispatch } from 'react-redux';

export default function CategoryModal({ handleClose, currentCategory }) {
    const dispatch = useDispatch();

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
        dispatch(addCategory({
            Name: formJson.Name,
        }));
    }

    function editCategory(category, formJson) {
        dispatch(updateCategory(
            {
                Id: category.Id,
                Name: formJson.Name,
            }
        ))
    }


    return (
        <div>
            <section className="modal-main">
                <form method="post" onSubmit={handleSubmit}>
                    <div>

                        <label htmlFor="fName">Name</label>
                        <input
                            name="Name"
                            defaultValue={currentCategory ? currentCategory.Name : ""}
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
