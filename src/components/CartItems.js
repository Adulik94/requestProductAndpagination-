import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from "@material-ui/core/GridList";
import { Button, Card, CardContent, Typography } from "@mui/material";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "auto",
      marginBottom: 5,
      marginTop: 5,
      width: "70%",
      transition: "0.3s",
      border: 1,
      borderRadius: 16,
      boxShadow: "0 16px 70px -12.125px rgb(156,144,156,0.3)",
      "&:hover": {
        boxShadow: "0 8px 40px -12px rgb(156,144,1560.3)",
      }
    }
  },
  gridList: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    margin: 10,
    backgroundColor: "#ececec",
    padding: 10,
    width: "70%"
  },
  cardArea: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    transition: "0.3s",
    border: 1,
    borderRadius: 16,
    boxShadow: "0 16px 70px -12.125px rgb(156,144,156,0.3)",
    margin: 5,
    width: "initial !important"
  },
  media: {
    display: "block",
    height: 60,
    maxWidth: 90,
    objectFit: "cover",
    borderRadius: 16,
  },

  cartStyle: {
    display: "flex",
    gap: 10,
    borderColor: 'secondary',
    padding: 5,
  }

});

const CardItems = ({state, dispatch}) => {
  const {cart} = state;
  const [total, setTotal] = useState(0);
  console.log("Cart:", cart);

  const classes = useStyles();


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
    <GridList cellHeight={"auto"} className={classes.gridList} spacing={0}>
      <CardActionArea style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
        <Typography style={{fontSize: 30, textAlign: "center"}}>Cart</Typography>
        <Typography style={{textAlign: "center"}}>Total: ${total}</Typography>
      </CardActionArea>
      {cart.length > 0 ? (
        cart.map(product => (
          <Card key={product.id} className={classes.cardArea}>
            <CardContent
              className={classes.cartStyle}
            >
              <CardMedia
                component="img"
                className={classes.media}
                image={product.thumbnail}
                title={product.title}
              />
            </CardContent>
            <CardActionArea style={{display: "flex", flexDirection: "column", alignItems: "center", width: "20%"}}>
              <Typography align='center' variant="inherit">
                {product.title}
              </Typography>
              <Typography align='center' variant="inherit">
                ${product.price}
              </Typography>
            </CardActionArea>
            <CardActionArea style={{display: "flex", alignItems: "center", width: "40%"}}>
              <Button style={{width: "fit-content", float: "left"}}
                      onClick={() => changeQty(product.id, product.qty - 1)}>
                <RemoveCircleIcon fontSize='small'/>
              </Button>
              <Typography variant="body2">{product.qty}</Typography>
              <Button onClick={() => changeQty(product.id, product.qty + 1)}>
                <AddCircleIcon fontSize='small'/>
              </Button>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography align='center' variant="inherit" color="textSecondary" component="p"
                    style={{alignSelf: "center", padding: 20, color: "#666"}}>
          Cart is empty 😱!
          <p>Add more items in Cart✨</p>
        </Typography>
      )}
    </GridList>
  );
}
export default CardItems;
