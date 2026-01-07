import { useContext, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import "./Home.css";
import { TransactionStateContext } from "../App";

const getMonthlyData = (pivotDate, transactions) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  );
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  return transactions.filter(
    (transaction) =>
      beginTime <= transaction.date && transaction.date <= endTime
  );
};

const Home = () => {
  const transactions = useContext(TransactionStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, transactions);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div className="Home">
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rigthChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <TransactionList transactions={monthlyData} pivotDate={pivotDate} />
    </div>
  );
};

export default Home;
