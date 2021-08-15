import { useFormContext } from "react-hook-form";

export default function TextInputFormGroup({
  name,
  formConfig,
  ...otherProps
}) {
  const { register, ErrorMessage } = useFormContext(); // retrieve all hook methods
  const attributes = { ...otherProps, ...formConfig };
  const {
    label,
    defaultValue,
    placeholder,
    validationRuleset,
    errors,
  } = attributes;

  return (
    <div className="FormGroup">
      <label className="FormGroup__Label" htmlFor={name}>
        {label}
      </label>
      <input
        className="FormGroup__Ctrl"
        id={attributes.id || name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(`${name}`, validationRuleset)}
      />
      <ErrorMessage
        className="FormGroup__ErrorMessage"
        errors={errors}
        name={name}
        as="span"
      />
    </div>
  );
}
