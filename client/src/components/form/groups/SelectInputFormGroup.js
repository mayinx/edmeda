import { useFormContext } from "react-hook-form";

export default function SelectInputFormGroup({
  name,
  formConfig,
  ...otherProps
}) {
  const { register, ErrorMessage, errors } = useFormContext(); // retrieve all hook methods
  const attributes = { ...formConfig, ...otherProps };
  const { id, label, defaultValue, validationRuleset, options } = attributes;

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
        {options?.map((option) => {
          return (
            <option
              value={option.value}
              className={option?.className ?? null}
              disabled={!option?.value}
              selected={!option?.value}
              hidden={!option?.value}
            >
              {option.label}
            </option>
          );
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
