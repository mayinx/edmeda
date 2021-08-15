TODO: 2DOC:

## Usage of `<>InputFormGroup`-Components (like `TextInputFormGroup` etc.):

Either by passing a formConfig object along and/or by specifying the needed form-group-attributes via props - whereas provided props override any available form-config - the latter just kicks in, if no prop were provided...

**Examples:**

a) Just passing the `name`-attribute and the `formConfig` - that's it:

```js
<TextInputFormGroup name="name" formConfig={FormConfig.name} />
```

_Expected schema of the formObj:_

```js
  {
    label: "Teacher (Community Owner)"
    defaultValue: "Chris Krass"
    placeholder: "Teacher / Community Owner"
    validationRuleset:
      required: { value: true, message: "What ever..."}
      maxLength: { value: 60, message: "What Ever...")},
    }
  }
```

b) Passing formGroup-attributes via props and formConfig:

```js
<TextInputFormGroup
  name="name"
  formConfig={FormConfig.name}
  label="Class Community Name"
  defaultValue={community?.name}
  validationRuleset={{ required: false }}
/>
```

export default function TextInputFormGroup({
