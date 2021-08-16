import { useFormContext } from "react-hook-form";

export default function TextInputFormGroup({
  name,
  formConfig,
  ...otherProps
}) {
  const { register, ErrorMessage, errors } = useFormContext(); // retrieve all hook methods
  const attributes = { ...otherProps, ...formConfig };
  const {
    id,
    label,
    defaultValue,
    placeholder,
    validationRuleset,
  } = attributes;

  return (
    <div
      className={`FormGroup ${
        errors && errors[name] ? "FormGroup--invalid" : ""
      }`}
    >
      <label className="FormGroup__Label" htmlFor={name}>
        {label}
      </label>
      <input
        className="FormGroup__Ctrl"
        id={id || name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(`${name}`, validationRuleset)}
      />
      {attributes?.errors?.name && (
        <p className="sendMail_error">Name is required</p>
      )}

      <ErrorMessage
        className="FormGroup__ErrorMessage"
        errors={errors}
        name={name}
        as="span"
      />
    </div>
  );
}
