export interface UserModel {
  _id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  company_name?: string;
  job_title: string;
  personality: string;
  description?: string;
  choosen_llm: string;
  created: string;
  last_update: string;
}
