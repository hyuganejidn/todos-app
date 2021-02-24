import React from 'react'
import { Field, FieldInputProps, FormikState } from 'formik'
import { FormUserValues } from '../../features/user/User'

type InputFieldProps = {
  form: FormikState<FormUserValues>
  field: FieldInputProps<string>,

  label: string,
  disabled?: boolean,
  type?: string,
  placeholder: string,
  autoComplete?: string,
}

type NameType = 'name' | 'username'

function InputField(props: InputFieldProps): React.ReactNode {
  const { field, form,
    label, disabled, type, placeholder, autoComplete } = props
  const { name } = field
  const { errors, touched } = form
  const showError = errors[name as NameType] && touched[name as NameType]

  console.log(form)

  return (
    <div className="form-group" >
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        {...field}
        id={name}
        type={type || 'text'}
        autoComplete={autoComplete || 'off'}
        disabled={disabled || false}
        placeholder={placeholder}
        validate={showError}
      />

      {showError && <div>{errors[name as NameType]}</div>}
      {/* <ErrorMessage name={name} component={<FormFeedback />} /> */}
    </div>
  )
}

export default InputField
