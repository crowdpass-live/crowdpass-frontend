import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose} from "./ui/dialog"

interface DialogComponentProps {
  onSubmit: (name: string, email: string) => void;
}

type Props = {}

const RegModal: React.FC<DialogComponentProps> = ({ onSubmit }) =>{
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    onSubmit(name, email);
  };

  return (
    <Dialog>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogContent>
      <DialogTitle>Enter Your Details</DialogTitle>
      <DialogDescription>
        Please enter your name and email.
      </DialogDescription>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <DialogClose>Close</DialogClose>
    </DialogContent>
  </Dialog>
  )
}

export default RegModal