

export type severety = 'error' | 'warning' | 'info' | 'success';
export default interface IMessageAttributes {
  message: string
  title: string
  severity: severety
}
