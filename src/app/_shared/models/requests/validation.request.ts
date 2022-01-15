export interface ValidationRequest {
  validator: string;
  message: string;
  metaData: string;
  sender: string;
  type: string;
  members: Array<string>;
  comments: Array<string>;
  status: string;
  date: string;
}