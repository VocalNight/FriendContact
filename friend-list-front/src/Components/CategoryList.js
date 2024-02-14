import CategoryModal from "./CategoryModal";
import { useEffect, useState } from "react";
import axios from 'axios';
import Modal from 'react-modal'

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [showCategoryMod, setShowCategoryMod] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://localhost:7187/api/Categories');
            setCategories(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }

    const editItem = (category) => {
        console.log(category);
        setCurrentCategory(category);
        setShowCategoryMod(true);
    }

    const addItem = () => {
        setCurrentCategory(null);
        setShowCategoryMod(true);
    }

    const deleteItem = (id) => {
        axios.delete('https://localhost:7187/api/Categories/' + id);
    }

    return (
        <>
            <div>
                <ul>
                    {categories.map(category => (
                        <li
                            key={category.id}>
                            {category.name} -
                            <button type="button" onClick={() => editItem(category)}>Edit</button>
                            <button type="button" onClick={() => deleteItem(category.id)}>Delete</button>
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
