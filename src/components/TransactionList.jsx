import { useEffect, useState } from "react";
import Button from "./Button";
import TransactionItem from "./TransactionItem";
import "./TransactionList.css";
import { useNavigate } from "react-router-dom";
import { CATEGORY_LABEL } from "../constants/category";

const TransactionList = ({ transactions, pivotDate }) => {
  const [filteredType, setFilteredType] = useState("all");

  useEffect(() => {
    if (filteredType !== "all") {
      setFilteredType("all");
    }
  }, [pivotDate]);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const year = pivotDate.getFullYear();
  const month = pivotDate.getMonth();

  const monthlyTransactions = transactions.filter((transaction) => {
    const txDate = new Date(transaction.date);
    return txDate.getFullYear() === year && txDate.getMonth() === month;
  });

  const income = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const expense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const total = income - expense;

  const onChangeFilteredType = (e) => {
    setFilteredType(e.target.value);
  };

  const getFilteredTransactions = () => {
    if (filteredType === "all") return sortedTransactions;
    return sortedTransactions.filter(
      (transaction) => transaction.category === filteredType
    );
  };

  const nav = useNavigate();

  return (
    <div className="TransactionList">
      <div className="summary_bar">
        <div className="summary_income">
          수입 + {Number(income).toLocaleString()}
        </div>
        <div className="summary_expense">
          지출 - {Number(expense).toLocaleString()}
        </div>
        <div className={`summary_total ${total >= 0 ? "plus" : "minus"}`}>
          이번달은 {total.toLocaleString()}
        </div>
      </div>

      <div className="menu_bar">
        <select value={filteredType} onChange={onChangeFilteredType}>
          <option value="all">전체</option>
          {Object.entries(CATEGORY_LABEL).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <Button onClick={() => nav(`/new-transaction`)} text={"+ 내역 추가"} />
      </div>

      <div className="list_wrapper">
        {getFilteredTransactions().map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
