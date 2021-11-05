function Square(props) {
  const className = props.isActive ? "Square active" : "Square";
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
