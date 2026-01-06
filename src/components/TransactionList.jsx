import { useContext } from "react";
import Button from "./Button";
import TransactionItem from "./TransactionItem";
import "./TransactionList.css";
import { TransactionStateContext } from "../App";

const TransactionList = () => {
  const transactions = useContext(TransactionStateContext);
  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return (
    <div className="TransactionList">
      <div className="menu_bar">
        <select>
          <option value="all">전체</option>
          <option value="living">생활</option>
          <option value="food">식비</option>
          <option value="transport">교통</option>
          <option value="shopping">쇼핑</option>
          <option value="subscription">구독</option>
          <option value="finance">금융</option>
          <option value="medical">의료</option>
          <option value="education">교육</option>
          <option value="leisure">여가</option>
          <option value="etc">기타</option>
        </select>
        <Button text={"+ 내역 추가"} />
      </div>
      <div className="list_wrapper">
        {sortedTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
