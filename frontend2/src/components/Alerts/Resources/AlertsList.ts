import IAlertsList from './IAlertsList'

const alertsList: IAlertsList = {
  ALLOW_ACTIVE_ITEM: {
    title: 'Activar registro',
    message: '¿Esta seguro de querer activar el registro seleccionado?',
  },
  ALLOW_LOCK_ITEM: {
    title: 'Bloquear registro',
    message: '¿Esta seguro de querer bloquear el registro seleccionado?',
  },
  ALLOW_DELETE_ITEM: {
    title: 'Borrar registro',
    message: '¿Esta seguro de querer borrar el registro seleccionado?',
  },
  ALLOW_MODIFY_ITEM: {
    title: 'Modificar registro',
    message: '¿Esta seguro de querer modificar el registro seleccionado?',
  },
  ALLOW_LOGOUT_ITEM: {
    title: 'Cerrar sesión',
    message: '¿Esta seguro de querer salir de la aplicación?',
  },
}
export default alertsList
