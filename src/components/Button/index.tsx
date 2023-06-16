type Prop = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  classBtn?: string;
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
}
export function Button({ type = "button", onClick, classBtn, children }: Prop) {
  return (
    <button onClick={onClick} type={type} id="container-button" className={`form-control ${classBtn ?? "btn btn-primary"}`}>{children}</button>
  )
}
