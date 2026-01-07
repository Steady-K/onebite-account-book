import "./TransactionEditor.css";
import { CATEGORY_LABEL } from "../constants/category";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getStringDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

export default function TransactionEditor({ onSubmit }) {
  const nav = useNavigate();
  const [input, setInput] = useState({
    name: "",
    amount: "",
    type: "income",
    category: "living",
    date: new Date(),
  });

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "date") {
      setInput({
        ...input,
        date: new Date(value),
      });
      return;
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  const onClickCancelButton = () => {
    const isConfirmed = window.confirm(
      "작성 중인 내용이 사라집니다.\n취소하겠습니까?"
    );
    if (isConfirmed) {
      return nav(-1);
    }
  };
  return (
    <div className="TransactionEditor">
      <div>
        <div className="description">분류</div>
        <select name="type" onChange={onChangeInput} value={input.type}>
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
      </div>
      <div>
        <div onChange={onChangeInput} className="description">
          지출/수입 이름
        </div>
        <input
          onChange={onChangeInput}
          value={input.name}
          type="text"
          name="name"
          placeholder="지출 & 수입 이름을 입력하세요 ..."
        />
      </div>
      <div>
        <div className="description">지출/수입 금액</div>
        <input
          onChange={onChangeInput}
          value={input.amount}
          type="number"
          name="amount"
          placeholder="금액을 입력하세요"
        />
      </div>
      <div>
        <div className="description">카테고리</div>
        <select name="category" onChange={onChangeInput} value={input.category}>
          {Object.entries(CATEGORY_LABEL).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="description">날짜</div>
        <input
          onChange={onChangeInput}
          value={getStringDate(input.date)}
          type="date"
          name="date"
        />
      </div>
      <div className="button_container">
        <button onClick={onClickSubmitButton} className="submit_button">
          저장
        </button>
        <button onClick={onClickCancelButton} className="cancel_button">
          취소
        </button>
      </div>
    </div>
  );
}
