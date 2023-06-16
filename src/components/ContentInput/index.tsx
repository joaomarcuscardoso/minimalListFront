type Props = {
  text: string;
  label: string;
  type: string;
  placeholder: string;
  classInput?: string;
  classContainer?: string;
  name: string;
  state: string,
  setState: (e: string) => void,
};
export function ContentInput({
  label, 
  name,
  text,
  type,
  placeholder,
  classContainer,
  classInput, 
  state,
  setState,
}: Props) {
  return (
    <div className={`form-group ${classContainer ?? "" }`}>
      <label htmlFor={label} className="label">{text}</label>
      <input 
        type={type} 
        name={name} 
        className={`form-control input-form ${classInput ?? ""}`} 
        id={label} 
        aria-describedby={label} 
        placeholder={placeholder} 
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
    </div>
  )
}
