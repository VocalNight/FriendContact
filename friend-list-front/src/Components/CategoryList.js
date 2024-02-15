import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory } from "../Slices/categoriesSlice";
import Modal from 'react-modal'
import CategoryModal from "./CategoryModal";

export default function CategoryList() {
    const [showCategoryMod, setShowCategoryMod] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const editItem = (category) => {
        setCurrentCategory(category);
        setShowCategoryMod(true);
    }

    const addItem = () => {
        setCurrentCategory(null);
        setShowCategoryMod(true);
    }

    const deleteItem = async (id) => {
        await dispatch(removeCategory(id));
    }

    return (
        <>
            <div>
                <ul>
                    {categories.map(category => (
                        <li
                            key={category.Id}>
                            {category.Name} -
                            <button type="button" onClick={() => editItem(category)}>Edit</button>
                            <button type="button" onClick={() => deleteItem(category.Id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <Modal className="modal" ariaHideApp={false} isOpen={showCategoryMod}>
                    <CategoryModal
                        handleClose={() => setShowCategoryMod(false)}
                        currentCategory={currentCategory} />
                </Modal>
                <div>
                    <button type="button" onClick={() => addItem()}>New Category</button>
                </div>
            </div>
        </>
    );
}
