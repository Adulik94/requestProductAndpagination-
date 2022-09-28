import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@mui/material';
import GridList from "@material-ui/core/GridList";
import "../styles.css";


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
    height: "auto"
  },
  media: {
    height: 200,
    maxWidth: "100%",
    objectFit: "cover",
    borderRadius: 16,
  },

});

const CardProduct = ({state, dispatch}) => {
  const {products, cart} = state;
  console.log("prd", products)
  const classes = useStyles();

  return (
    <GridList cellHeight={"auto"} className={classes.gridList} spacing={0}>
      {products.map((product) => (
        <Card key={product.id}
              className={classes.root}>
          <CardContent
            style={{
              borderColor: 'secondary',
              padding: 5,
            }}
          >
            <CardMedia
              component="img"
              className={classes.media}
              image={product.thumbnail}
              title={product.title}
            />
            <Typography align='left' variant="inherit" gutterBottom component="h2" style={{
              padding: 5,
            }}
            >
              {product.title}
            </Typography>
            {/*<Typography align='center' color="secondary" variant="h6" gutterBottom component="h1">*/}
            {/*  Current price - ${product.price}*/}
            {/*</Typography>*/}
            {/*<Typography align='center' variant="inherit" color="textSecondary" component="p" style={{*/}
            {/*  padding: 10,*/}
            {/*}}>*/}
            {/*  {product.description}*/}
            {/*</Typography>*/}
            <CardActionArea style={{display: "flex", flexDirection: "column", alignItems: "center",padding:10 }}>
              <Typography align='center' color="secondary" variant="h6" gutterBottom component="h1">
                Current price - ${product.price}
              </Typography>
              <Typography align='center' variant="inherit" color="textSecondary" component="p">
                {product.description}
              </Typography>
            </CardActionArea>
            <CardActionArea style={{textAlign: "center"}}>
              {cart.find((products) => products.id === product.id) ? (
                <Button
                  style={{

                    marginLeft: 15,
                    marginBottom: 15,
                    padding: 5,
                    border: 0,
                    borderRadius: 5,
                    backgroundColor: "rgb(86,27,79)",
                    color: "#fff"
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
                  Add more in cart
                </Button>
              ) : (
                <Button
                  style={{
                    marginLeft: 15,
                    marginBottom: 15,
                    padding: 5,
                    border: 0,
                    borderRadius: 5,
                    backgroundColor: "rgb(47,14,44)",
                    color: "#fff"
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
                >Buy it Now
                </Button>
              )}
            </CardActionArea>
          </CardContent>
        </Card>
      ))}
    </GridList>
  );
}
export default CardProduct;
