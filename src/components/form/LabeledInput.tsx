import React from 'react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string; // Assuming id is mandatory for associating the label with the input
}

export function LabeledInput({ label, id, ...inputProps }: LabeledInputProps): React.JSX.Element {
  return (
    <>
      <div className={`w-full ${inputProps.className} text-start`}>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          {...inputProps}
        />
      </div>
    </>
  );
}
