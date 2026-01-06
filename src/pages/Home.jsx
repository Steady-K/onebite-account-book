import Button from "../components/Button";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <Header
        title={"2026년 1월 7일"}
        leftChild={<Button text={"<"} />}
        rigthChild={<Button text={">"} />}
      />
      <TransactionList />
    </div>
  );
};

export default Home;
