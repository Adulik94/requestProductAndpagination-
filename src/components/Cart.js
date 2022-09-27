import React, { useEffect, useState } from "react";
import CardActionArea from '@material-ui/core/CardActionArea';
import { Button, Typography } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Cart = ({state, dispatch}) => {
  const {cart} = state;
  const [total, setTotal] = useState(0);

  console.log("Cart:", cart);

  const changeQty = (id, qty) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id,
        qty
      }
    });
  };

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 10,
        backgroundColor: "#ececec",
        padding: 10,
        width: "60%"
      }}
    >
      <Typography style={{fontSize: 30, alignSelf: "center"}}>Cart</Typography>
      <Typography style={{alignSelf: "center"}}>Total: ${total}</Typography>
      {cart.length > 0 ? (
        cart.map((product) => (
          <CardActionArea
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              border: "1px solid grey",
              margin: 5
            }}
          >
            <div style={{display: "flex", gap: 10}}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{width: 70, objectFit: "cover"}}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly"
                }}
              >
                <span>{product.title}</span>
                <b>${product.price}</b>
              </div>
            </div>
            <CardActionArea style={{display: "flex", alignItems: "center", width: "40%"}}>
              <Button style={{width: "fit-content", float:"left" }} onClick={() => changeQty(product.id, product.qty - 1)}>
                <RemoveCircleIcon fontSize='small'/>
              </Button>
              <Typography variant="body2">{product.qty}</Typography>
              <Button onClick={() => changeQty(product.id, product.qty + 1)}>
                <AddCircleIcon fontSize='small'/>
              </Button>
            </CardActionArea>
          </CardActionArea>
        ))
      ) : (
        <span style={{alignSelf: "center", padding: 20, color: "#666"}}>
        Cart is empty!
        </span>
      )}
    </div>
  );
};

export default Cart;
