function Alert({ color = "danger", message }) {
  return <div className={"alert alert-" + color}>{message}</div>;
}
export default Alert;
