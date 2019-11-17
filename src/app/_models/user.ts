export interface User {    
    user_id: string,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    creation_date: string,
    accounts: Account[]
  }

export interface Account {
  account_id: string,
  user_id: string,
  type: string,
  creation_date: string
}