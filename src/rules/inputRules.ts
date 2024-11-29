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

export const dateRules = [(v: string) => !!v || 'Date is required']

export const comboboxRules = [(v: string) => !!v || 'Field is required']
