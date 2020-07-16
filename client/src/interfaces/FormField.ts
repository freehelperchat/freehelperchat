export default interface IFormField {
  _id: string;
  name: string;
  label: string;
  inputType: string;
  required: boolean;
  options: string[];
}
