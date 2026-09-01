import { Box, OutlinedInput, type OutlinedInputProps } from '@mui/material';
import { FormLabel } from './FormLabel';

interface FormFieldProps extends Omit<OutlinedInputProps, 'size'> {
  label: string;
}

export const FormField = ({ label, id, ...rest }: FormFieldProps) => (
  <Box sx={{ width: '100%', mb: 2 }}>
    <FormLabel>{label}</FormLabel>
    <OutlinedInput
      id={id}
      name={id}
      fullWidth
      size="small"
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cccccc' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#999999' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
          borderWidth: '1px',
        },
      }}
      {...rest}
    />
  </Box>
);
