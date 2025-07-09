/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSpaceStore } from '@/lib/store/useSpaceStore';

type InviteDialogue ={
    spaceId:string
}

export default function InviteDialogue({spaceId}:InviteDialogue) {
  const [open, setOpen] = React.useState(false);
const {sendInviteLink}=useSpaceStore()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button className='mr-5' variant="outlined" onClick={handleClickOpen}>
        Invite
      </Button>
      <Dialog
     
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              sendInviteLink(spaceId,email)
              handleClose();
            },
          },
        }}
      >
        <DialogTitle  className='bg-black text-white'>Subscribe</DialogTitle>
        <DialogContent  className='bg-black ' >
          <DialogContentText sx={{ color: 'white' }}>
            Invite a team member to join this workspace. Enter their email address below, and well send them an invitation with a link to get started.
          </DialogContentText>
          <TextField
          className='border border-white'
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions  className='bg-black text-white'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Sent</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
