// import Input from "@/app/_components/Input";

function FormRow({ text, children, label, error, styles }) {
  return (
    <div
      className={
        styles ? "hidden" : `flex relative flex-col gap-2 mb-4 text-[0.9rem]`
      }
    >
      {label && (
        <Label text={text} htmlFor={children.props?.id}>
          {label}
        </Label>
      )}
      {children}
      <p className="w-[9rem] text-center mx-auto">
        {error && <Error>{error}</Error>}
      </p>
    </div>
  );
}

export default FormRow;

function Label({ text, children }) {
  return (
    <div className={`  block text-sm font-medium text-${text} `}>
      {children}
    </div>
  );
}

function Error({ children }) {
  return (
    <span className="font-semibold text-lg w-[70%] mx-auto text-center text-red-700">
      {children}
    </span>
  );
}
