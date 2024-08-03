import React, { useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/Admin_Assets/cross_icon.png";

const ListProduct = () => {
  const [all_product, setAllProduct] = React.useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/getproducts").then((resp) =>
      resp.json().then((data) => {
        setAllProduct(data);
      })
    );
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  return (
    <div className="list-product">
      <h1>All product list</h1>
      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="list-product-all-product">
        <hr />
        {all_product.map((product, i) => {
          return (
            <>
              <div
                key={i}
                className="list-product-format-main list-product-format"
              >
                <img src={product.image} alt="" className="list-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => removeProduct(product.id)}
                  className="list-product-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
