import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { cartReducer } from "./reducers/cartReducer";
import Pagination from "@material-ui/lab/Pagination";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CardProduct from './components/CardProduct'
import CartItems from "./components/CartItems";
import "./styles.css"

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const PageSize = 6;
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProducts = async () => {
    const {data} = await axios.get(`https://dummyjson.com/products?limit=${PageSize}&skip=${(currentPage - 1) * PageSize}`);
    dispatch({
      type: "ADD_PRODUCTS",
      payload: data.products,
    });
  };

  useEffect(() => {
    fetchProducts().then(r => console.log(r));
  }, [currentPage]);

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <Stack spacing={2}>
        <Typography>Page: {currentPage}</Typography>
        <CardProduct state={state} dispatch={dispatch}/>
        <Pagination
          shape="rounded"
          variant="outlined"
          count={5}
          page={currentPage}
          onChange={handleChange}/>
      </Stack>
      <CartItems state={state} dispatch={dispatch}></CartItems>
    </div>

  );
}
