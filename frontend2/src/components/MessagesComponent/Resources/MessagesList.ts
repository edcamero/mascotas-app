import IMessagesList from './IMessagesList'
const messagesList: IMessagesList = {
  INTERNAL_ERROR: {
    message:
      'Ha ocurrido un error interno y no se ha podido realizar el proceso, por favor intente de nuevo o más tarde, si el problema persiste debe comunicarse con el Administrador',
    title: 'Error encontrado',
    severity: 'error',
  },
  INVALID_FORM_VALIDATION: {
    message: 'No se ha podido guardar el registro, el formulario tiene errores',
    title: 'Error encontrado',
    severity: 'error',
  },
  SUCCESS_CREATED: {
    message: 'Registro ha sido creado con éxito',
    title: 'Proceso realizado',
    severity: 'success',
  },
  SUCCESS_DELETED: {
    message: 'Registro ha sido borrado con éxito',
    title: 'Proceso realizado',
    severity: 'success',
  },
  SUCCESS_UPDATED: {
    message: 'Registro ha sido actualizado con éxito',
    title: 'Proceso realizado',
    severity: 'success',
  },
  ITEMS_LIST_EMPTY: {
    message: 'No se han encontrado registros asociados a la búsqueda.',
    title: 'Advertencia',
    severity: 'warning',
  },
  INFO_SECTION: {
    message: '',
    title: 'Información de Ayuda',
    severity: 'info',
  },
  MESSAGE_SENT: {
    message: 'Mensaje ha sido enviado con éxito',
    title: 'Mensaje Enviado',
    severity: 'success',
  },
}
export default messagesList
