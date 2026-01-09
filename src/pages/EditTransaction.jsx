import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import TransactionEditor from "../components/TransactionEditor";
import { TransactionDispatchContext, TransactionStateContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const EditTransaction = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdateTransaction, onDeleteTransaction } = useContext(
    TransactionDispatchContext
  );
  const [curTransactionItem, setCurTransacionItem] = useState();

  const transactions = useContext(TransactionStateContext);

  const currentTransactionItem = transactions.find(
    (transaction) => String(transaction.id) === String(params.id)
  );
  usePageTitle(`${params.id}번 내역 수정`);

  useEffect(() => {
    if (!currentTransactionItem) {
      window.alert("존재하지 않는 내역입니다.");
      nav("/", { replace: true });
    }
    setCurTransacionItem(currentTransactionItem);
  }, [params.id]);

  const onSubmit = (input) => {
    onUpdateTransaction({
      id: currentTransactionItem.id,
      name: input.name,
      amount: input.amount,
      type: input.type,
      category: input.category,
      date: input.date.getTime(),
    });
    nav("/", { replace: true });
  };
  const onEditDeleteButtonClick = () => {
    const isConfirmed = window.confirm(
      "삭제하면 복구할 수 없습니다.\n정말 삭제 하시겠습니까?"
    );
    if (!isConfirmed) return;
    onDeleteTransaction(String(params.id));
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"내역 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rigthChild={
          <Button
            onClick={onEditDeleteButtonClick}
            text={"삭제 하기"}
            type="delete"
          />
        }
      />
      <TransactionEditor
        initData={currentTransactionItem}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditTransaction;
