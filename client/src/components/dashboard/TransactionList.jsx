import {
  Box,
  Button,
  CircularProgress,
  List,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getLoggedInUser } from "../../helpers";
import theme from "../../styles/theme";
import Transaction from "./Transaction";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const uid = getLoggedInUser();

  useEffect(() => {
    fetch("/api/transactions/" + uid)
      .then(async (response) => await response.json())
      .then((data) => {
        const transactionList = data.Transactions;
        transactionList.sort(function (x, y) {
          return Date.parse(y.timestamp) - Date.parse(x.timestamp);
        });
        setTransactions(transactionList);
        setLoading(false);
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
          {loading ? (
            <CircularProgress color="action" sx={{ padding: 5 }}/>
          ) : (
            <div>
              <List dense={false}>
                {transactions.slice(0, 5).map((object, i) => (
                  <Transaction transaction={object} />
                ))}
              </List>
              <Button
                variant="contained"
                color="action"
                sx={{ textTransform: "none", marginBottom: 2 }}
                onClick={() => navigate("/transactions")}
              >
                <Typography variant="caption">See All</Typography>
              </Button>
            </div>
          )}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TransactionList;
