import { useFormContext } from "react-hook-form";

export default function SelectInputFormGroup({
  name,
  formConfig,
  ...otherProps
}) {
  const { register, ErrorMessage } = useFormContext(); // retrieve all hook methods
  const attributes = { ...otherProps, ...formConfig };
  const {
    id,
    label,
    defaultValue,
    validationRuleset,
    errors,
    options,
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

      <select
        className="FormGroup__Ctrl"
        id={id || name}
        name={name}
        defaultValue={defaultValue}
        {...register(`${name}`, validationRuleset)}
      >
        {options.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
      <ErrorMessage
        className="FormGroup__ErrorMessage"
        errors={errors}
        name={name}
        as="span"
      />
    </div>
  );
}
