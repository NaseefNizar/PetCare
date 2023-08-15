import React, { useRef } from 'react';
import { TextField } from '@mui/material';

interface SmallInputProps {
  value: string;
  onChange: (value: string) => void;
  nextInputRef?: React.RefObject<HTMLInputElement>;
}

export const OtpInput: React.FC<SmallInputProps> = ({ value, onChange, nextInputRef }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 1) {
      onChange(inputValue);
    }
  };



  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    if (inputValue.length === 1 && nextInputRef?.current) {
      nextInputRef.current.focus();
    }
  };

  return (
    <TextField
      inputRef={inputRef}
      variant="outlined"
      size="small"
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      style={{ width: '38px', textAlign: 'center' }}
      inputProps={{
        maxLength: 1,
      }}
    />
  );
};


