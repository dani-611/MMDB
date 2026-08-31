import * as React from 'react';
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const FormAlert = ({ message }: { message: string }) => (
  <Alert
    sx={{ mb: 3, px: 1, py: 0.25, width: '100%', borderRadius: '8px' }}
    severity="warning"
  >
    {message}
  </Alert>
);

export const PasswordField = ({
  placeholder = '••••••••',
}: {
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl fullWidth variant="outlined">
      <OutlinedInput
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        required
        fullWidth
        size="small"
        placeholder={placeholder}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cccccc',
          },
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
  );
};
