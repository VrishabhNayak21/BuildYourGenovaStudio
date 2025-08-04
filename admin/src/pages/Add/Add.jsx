import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        price: "",
        category: "PS5"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({ name: "", price: "", category: "PS5" });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file" 
                        id="image" 
                        hidden 
                        required 
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        name="name" 
                        placeholder="Type here" 
                        required 
                    />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select 
                            onChange={onChangeHandler} 
                            name="category" 
                            value={data.category}
                        >
                            <option value="PS5">PS5</option>
                            <option value="Graphics Card">Graphics Card</option>
                            <option value="Monitor">Monitor</option>
                            <option value="CPU">CPU</option>
                            <option value="Laptop">Gaming Laptop</option>
                            <option value="GameGear">GameGear</option>
                            <option value="Design Accessories">Design Accessories</option>
                            <option value="Gaming Chairs">Gaming Chairs</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.price} 
                            type="number" 
                            name="price" 
                            placeholder="$20" 
                            required 
                        />
                    </div>
                </div>

                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default Add;
