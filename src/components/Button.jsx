import "./Button.css";

const Button = ({ text, onClick, type = "default" }) => {
  return (
    <button
      onClick={onClick}
      className={`Button ${type === "delete" ? "Delete-Button" : ""}`}
    >
      {text}
    </button>
  );
};

export default Button;
