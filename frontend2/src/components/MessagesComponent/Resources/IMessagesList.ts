import IMessageAttributes from './IMessageAttributes'

export default interface IMessagesList {
  INTERNAL_ERROR: IMessageAttributes
  SUCCESS_CREATED: IMessageAttributes
  INVALID_FORM_VALIDATION: IMessageAttributes
  SUCCESS_UPDATED: IMessageAttributes
  SUCCESS_DELETED: IMessageAttributes
  ITEMS_LIST_EMPTY: IMessageAttributes
  INFO_SECTION: IMessageAttributes
  MESSAGE_SENT: IMessageAttributes
}
