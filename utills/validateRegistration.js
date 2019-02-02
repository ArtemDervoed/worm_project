function validate(values) {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.first_name) {
      errors.firstName = 'Required'
    }
    if (!values.last_name) {
      errors.lastName = 'Required'
    }
    if (!values.doc_number) {
      errors.docNumber = 'Required'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or less'
    }
    if (!values.confirm_password) {
      errors.confirmPassword = 'Required'
    } else if (values.confirm_password !== values.password) {
      errors.confirmPassword = 'Must be equals password'
    }
    return errors
  }

  module.exports = validate;