import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, screen, fireEvent } from '@testing-library/react'
import DeleteConfirmationMessage from './DeleteConfirmationMessage.component'

test('Validate alert component loading', () => {
  act(() => {
    render(
      <DeleteConfirmationMessage
        open={true}
        setOpen={() => {
          return
        }}
        onClickAccept={() => {
          return
        }}
        title="Titulo"
        content="Contenido"
      />
    )
  })
  expect(screen.getByTestId('alert')).toBeInTheDocument()
  expect(screen.getByTestId('button-alert-cancelar')).toBeInTheDocument()
  expect(screen.getByTestId('button-alert-accept')).toBeInTheDocument()
})

test('Validata btn cancelar', () => {
  act(() => {
    render(
      <DeleteConfirmationMessage
        open={true}
        setOpen={() => {
          return
        }}
        onClickAccept={() => {
          return
        }}
        title="Titulo"
        content="Contenido"
      />
    )
  })
  act(() => {
    fireEvent.click(screen.getByTestId('button-alert-cancelar'))
  })
})

test('Validata btn accept', () => {
  act(() => {
    render(
      <DeleteConfirmationMessage
        open={true}
        setOpen={() => {
          return
        }}
        onClickAccept={() => {
          return
        }}
        title="Titulo"
        content="Contenido"
      />
    )
  })
  act(() => {
    fireEvent.click(screen.getByTestId('button-alert-accept'))
  })
})
