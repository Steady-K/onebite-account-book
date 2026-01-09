import "./App.css";
import { Routes, Route, data } from "react-router-dom";
import Home from "./pages/Home";
import NewTransaction from "./pages/NewTransaction";
import EditTransaction from "./pages/EditTransaction";
import Notfound from "./pages/Notfound";
import { createContext, useEffect, useReducer, useRef, useState } from "react";

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      {
        nextState = action.data;
      }
      break;
    case "CREATE":
      {
        nextState = [action.data, ...state];
      }
      break;
    case "UPDATE":
      {
        nextState = state.map((item) =>
          String(item.id) === String(action.data.id) ? action.data : item
        );
      }
      break;
    case "DELETE":
      {
        nextState = state.filter(
          (item) => String(item.id) !== String(action.id)
        );
      }
      break;
    default:
      return state;
  }
  localStorage.setItem("transaction", JSON.stringify(nextState));
  return nextState;
}

export const TransactionStateContext = createContext();
export const TransactionDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storeData = localStorage.getItem("transaction");
    if (!storeData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storeData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

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

  if (isLoading) {
    return <div>데이터 로딩 중입니다 ...</div>;
  }

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
