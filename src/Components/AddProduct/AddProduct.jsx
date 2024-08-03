import React from "react";
import "./AddProduct.css";
import upload_area from "../../assets/Admin_Assets/upload_area.svg";

const AddProduct = () => {
  const [img, setImg] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imgHandler = (e) => {
    setImg(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log(productDetails);
    let respondData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", img);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        respondData = data;
      });

    if (respondData.success) {
      product.image = respondData.img_url;
      console.log(product);
      await fetch("http://localhost:4000/addproducts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? alert("Product added successfully")
            : alert("Failed to add product");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-item">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="add-product-price">
        <div className="add-product-item">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>

        <div className="add-product-item">
          <p>Offer price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="add-product-item">
        <p>Product category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="add-product-item">
        <label htmlFor="file-input">
          <img
            src={img ? URL.createObjectURL(img) : upload_area}
            alt=""
            className="add-product-thumbnail"
          />
        </label>
        <input
          onChange={imgHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button
        onClick={() => {
          addProduct();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
