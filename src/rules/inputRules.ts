export const inputDefaultRules = [(v: string) => !!v || 'Field is required']

export const emailRules = [
  (v: string) => !!v || 'Field is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

export const passwordRules = [
  (v: string) => !!v || 'Field is required',
  (v: string) => (v && v.length >= 6) || 'Min 6 characters',
  (v: string) =>
    /[A-Z].*[0-9]|[0-9].*[A-Z]/.test(v) ||
    'Password must contain at least one letter and one number',
]
export const inputPasswordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters long',
  (v: string) =>
    /[A-Za-z]/.test(v) || 'Password must contain at least one letter (a-z)',
  (v: string) =>
    /\d/.test(v) || 'Password must contain at least one number (0-9)',
  (v: string) =>
    /[!@#$%^&*]/.test(v) ||
    'Password must contain at least one special character (!@#$%^&*)',
]
export const dateRules = [(v: string) => !!v || 'Date is required']

export const comboboxRules = [(v: string) => !!v || 'Field is required']

export const multipleComboboxRules = [
  (v: string[]) => !!v.length || 'Field is required',
]
