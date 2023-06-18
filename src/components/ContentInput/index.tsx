type Props = {
  text: string;
  label: string;
  type: string;
  placeholder: string;
  classInput?: string;
  classContainer?: string;
  name: string;
  state: string,
  required?: boolean
  setState: (e: string) => void,
  error?: string
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
  required = false,
  error
}: Props) {
  return (
    <div className={`form-group ${classContainer ?? ""}`}>
      <label htmlFor={label} className="form-label">
        {`${text}: `}
      </label>

      {(error) && (
        <span id={label} className="span-error">
          {`  ${error}`}
        </span>
      )}
      <div className="input-group has-validation">
        {name == "nickname" && <span className="input-group-text" id="inputGroupPrepend">@</span>}
        <input
          type={type}
          name={name}
          className={`form-control input-form ${classInput ?? ""}`}
          id={label}
          aria-describedby={label}
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          value={state}
          required={required}
        />
      </div>
    </div>
  )
}
