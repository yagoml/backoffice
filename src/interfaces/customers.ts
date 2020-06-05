export interface ICustomer {
  name: string
  lead?: boolean
  phone: string
  email: string
  postalCode?: string
}

export interface ICustomerData {
  [key: string]: string | string[]
  firstName: string
  lastName: string
  email: string
  phones: string[]
  postalCode: string
}

export interface ICustomerError {
  [key: string]: null | string | string[]
  firstName: null | string
  lastName: null | string
  email: null | string
  phone: null | string
  phone2: null | string
  postalCode: null | string
}
