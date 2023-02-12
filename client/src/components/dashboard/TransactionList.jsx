import { Box, Button, List, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import theme from "../../styles/theme";
import Transaction from "./Transaction";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("/api/transactions/" + "87267767")
      .then(async (response) => await response.json())
      .then((data) => {
        const transactionList = data.Transactions;
        transactionList.sort(function (x, y) {
          return Date.parse(y.timestamp) - Date.parse(x.timestamp);
        });
        setTransactions(transactionList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const navigate = useNavigate();


  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          className="dashboard-shadow"
          sx={{
            backgroundColor: "secondary.main",
            borderRadius: 4,
          }}
        >
          <List dense={false}>
            {transactions.slice(0, 5).map((object, i) => (
              <Transaction transaction={object} />
            ))}
          </List>
          <Button
            variant="contained"
            color="action"
            sx={{ textTransform: "none", marginBottom: 2 }}
            onClick={() =>  navigate("/transactions") }
          >
            <Typography variant="caption">See All</Typography>
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TransactionList;
