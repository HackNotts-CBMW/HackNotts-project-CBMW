import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { checkUserInfo } from "../../helpers";
import DoughNotts from "./DoughNotts";

const GridDoughNotts = () => {
  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = checkUserInfo();
    const uid = user.accountId;

    fetch("/api/spendings/" + uid)
      .then(async (response) => await response.json())
      .then((data) => {
        const dailybudget = user.balance / Object.keys(data).length;
        var categories = [];
        for (var key in data) {
          const val = data[key];
          const catVal = Math.max(val, -1 * val);
          categories.push({
            name: key,
            spent: catVal,
            left: Math.abs(dailybudget - catVal),
          });
        }
        setSpendings(categories);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div >
        <div className="grid-dough-notts-title-container">
          <h1 className="grid-dough-notts-title">
            Your spendings on each catergory
          </h1>
        </div>
        {loading ? (
          <CircularProgress color="action" sx={{ padding: 5 }} />
        ) : (
          <div className="grid-dough-notts">
            {spendings.map((values) => (
              <div>
                <h3 className="grid-dough-notts-heading">{values.name}</h3>

                <DoughNotts
                className="grid-dough-block"
                  data={{
                    labels: ["Spent", "Left"],
                    datasets: [
                      {
                        label: "Amount of Money",
                        data: [values.spent, values.left],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GridDoughNotts;
