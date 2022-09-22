import React from "react";

const Products = ({ state, dispatch }) => {
  const { products, cart } = state;
  console.log("products:", products);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        margin : 15,
        width: "100%"
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
            border: "1px solid grey",
            width: "20%",
            marginTop: 10,
            gap: 10
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ height: 200, objectFit: "cover" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{product.title} </span>
            <b>$ {product.price}</b>
          </div>
          {cart.some((products) => products.id === product.id) ? (
            <button
              style={{
                padding: 5,
                border: 0,
                borderRadius: 5,
                backgroundColor: "rgba(155,34,31,0.46)",
                color: "#fff"
              }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: product
                })
              }
            >
              Remove
            </button>
          ) : (
            <button
              style={{
                padding: 5,
                border: 0,
                borderRadius: 5,
                backgroundColor: "purple",
                color: "#ffffff"
              }}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    id: product.id,
                    title: product.title,
                    thumbnail: product.thumbnail,
                    qty: 1,
                    price: product.price
                  }
                })
              }
            >
              Buy it Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
