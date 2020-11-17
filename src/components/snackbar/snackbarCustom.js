import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'

export const SnackbarCustom = (props) => {

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

  const handleClose = (event, reason) => reason === 'clickaway' ? null : props.setSnackbarOpen(false)

  return (
    <Snackbar
      open={props.snackbarOpen}
      autoHideDuration={props.snackbarAutoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.snackbarType}>
        {props.snackbarMessege}
      </Alert>
    </Snackbar>
  )
}


