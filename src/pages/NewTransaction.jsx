import Header from "../components/Header";
import Button from "../components/Button";
import TransactionEditor from "../components/TransactionEditor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TransactionDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const NewTransaction = () => {
  const { onCreateTransaction } = useContext(TransactionDispatchContext);
  const nav = useNavigate();
  usePageTitle("새 내역 작성하기");

  const onSubmit = (input) => {
    onCreateTransaction({
      name: input.name,
      amount: input.amount,
      type: input.type,
      category: input.category,
      date: input.date.getTime(),
    });
    nav("/", { replace: true });
  };
  return (
    <div>
      <Header
        title={"새 내역 작성"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
      />
      <TransactionEditor onSubmit={onSubmit} />
    </div>
  );
};

export default NewTransaction;
