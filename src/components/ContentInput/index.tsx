type Props = {
  text: string;
  label: string;
  type: string;
  placeholder: string;
  classInput?: string;
  classContainer?: string;
};
export function ContentInput({label, text, type, placeholder, classContainer, classInput}: Props) {
  return (
    <div className={`form-group ${classContainer ?? "" }`}>
      <label htmlFor={label} className="label">{text}</label>
      <input type={type} className={`form-control input-form ${classInput ?? ""}`} id={label} aria-describedby={label} placeholder={placeholder} />
    </div>
  )
}
