import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const notAuthorized = task((t, a) =>
  createView('401', {
    data({ type, status, viewData, formData, error }) {
      return {
        status,
        data: viewData,
        error,
      }
    },
    ui: ({ ui }) => ({ state, mutations }) => {
      return <div />
    },
  })
)