import { Box, Button, Container, List, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import theme from "../../styles/theme";
import Transaction from "./Transaction";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("/api/transactions/" + "87267767")
      .then(async (response) => await response.json())
      .then((data) => {
        const allTransactions = data.Transactions;
        allTransactions.sort(function (x, y) {
          return Date.parse(y.timestamp) - Date.parse(x.timestamp);
        });
        setTransactions(allTransactions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <Box
            className="dashboard-shadow"
            sx={{
              backgroundColor: "secondary.main",
              borderRadius: 4,
            }}
          >
            <List dense={false}>
              {transactions.map((object, i) => (
                <Transaction transaction={object} />
              ))}
            </List>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AllTransactions;
