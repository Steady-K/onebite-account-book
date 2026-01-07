import "./TransactionItem.css";
import { useNavigate } from "react-router-dom";
import { CATEGORY_LABEL } from "../constants/category";

export default function TransactionItem(props) {
  const nav = useNavigate();
  const { id, name, amount, type, category, date } = props;

  return (
    <div className="TransactionItem">
      <div className="category">{CATEGORY_LABEL[category] ?? "기타"}</div>
      <div className="name">{name}</div>
      <div
        className={`amount ${
          type === "income" ? "amount_income" : "amount_expense"
        }`}
      >
        {type === "income" ? "+" : "-"}
        &nbsp;
        {Number(amount).toLocaleString("ko-KR")}원
      </div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <div className="button_container">
        <div
          className="edit_button"
          onClick={() => {
            nav(`/edit-transaction/${id}`);
          }}
        >
          수정
        </div>
        <div className="delete_button">삭제</div>
      </div>
    </div>
  );
}
