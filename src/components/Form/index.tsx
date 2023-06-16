type Props = {
  children: React.ReactNode;
}

export function Form({children} : Props) {
  return (
    <div className="container-fluid">
      <form>
        {children}
      </form>
    </div>
  )
}
