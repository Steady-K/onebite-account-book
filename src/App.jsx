import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewTransaction from "./pages/NewTransaction";
import EditTransaction from "./pages/EditTransaction";
import Notfound from "./pages/Notfound";
import { createContext, useReducer, useRef } from "react";

const mockData = [
  {
    id: 0,
    name: "마라탕 & 꿔바로우",
    amount: 59000,
    type: "expense",
    category: "food",
    date: new Date("2026-01-07").getTime(),
  },
  {
    id: 1,
    name: "월세",
    amount: 500000,
    type: "expense",
    category: "living",
    date: new Date("2026-01-06").getTime(),
  },
  {
    id: 2,
    name: "월급",
    amount: 3500000,
    type: "income",
    category: "salary",
    date: new Date("2025-12-10").getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const TransactionStateContext = createContext();
export const TransactionDispatchContext = createContext();

function App() {
  const [transaction, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreateTransaction = ({ name, amount, type, category, date }) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        name,
        amount,
        type,
        category,
        date,
      },
    });
  };

  const onUpdateTransaction = ({ id, name, amount, type, category, date }) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        name,
        amount,
        type,
        category,
        date,
      },
    });
  };

  const onDeleteTransaction = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <TransactionStateContext.Provider value={transaction}>
        <TransactionDispatchContext.Provider
          value={{
            onCreateTransaction,
            onUpdateTransaction,
            onDeleteTransaction,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-transaction" element={<NewTransaction />} />
            <Route path="/edit-transaction/:id" element={<EditTransaction />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </TransactionDispatchContext.Provider>
      </TransactionStateContext.Provider>
    </>
  );
}

export default App;
