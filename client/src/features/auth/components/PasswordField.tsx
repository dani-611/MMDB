import { useState } from 'react';
import {
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormLabel } from './FormLabel';

interface PasswordFieldProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  headerElement?: React.ReactNode;
}

export const PasswordField = ({
  label = 'Password',
  value,
  disabled,
  onChange,
  headerElement,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormLabel>{label}</FormLabel>
        {headerElement}
      </Box>
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          fullWidth
          size="small"
          placeholder="••••••••"
          value={value}
          disabled={disabled}
          onChange={onChange}
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cccccc' },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#999999',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
              borderWidth: '1px',
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                size="small"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="inherit" />
                ) : (
                  <Visibility fontSize="inherit" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};
