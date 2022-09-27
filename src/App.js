import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { cartReducer } from "./reducers/cartReducer";
import Pagination from "@material-ui/lab/Pagination";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CardProduct from './components/CardProduct'

import "./styles.css"
import Cart from "./components/Cart";

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

  const fetchProducts = async () => {
    const {data} = await axios.get(`https://dummyjson.com/products?limit=${PageSize}&skip=${(currentPage - 1) * PageSize}`);
    dispatch({
      type: "ADD_PRODUCTS",
      payload: data.products,
      total: data.total

    });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <Stack spacing={2}>
        <Typography>Page: {currentPage}</Typography>
        <CardProduct state={state} dispatch={dispatch}/>
        <Pagination
          shape="rounded"
          variant="string"
          count={5}
          page={currentPage}
          onChange={handleChange}/>
      </Stack>
      <Cart state={state} dispatch={dispatch}></Cart>

    </div>

  );
}
