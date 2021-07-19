import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import { Box, TextField } from '@material-ui/core';

export type TextFormFieldProps = TextFieldProps & {
  hideMargin?: boolean;
  id: string;
};

const TextFormField = ({ field, form, hideMargin = false, id, ...props }: TextFormFieldProps) => {
  const hasError = form.touched[field.name] && !!form.errors[field.name];
  const errorText = hasError ? form.errors[field.name] : '';

  return (
    <Box marginBottom={hideMargin ? 0 : 3}>
      <TextField
        {...fieldToTextField({ field, form, ...props })}
        error={hasError}
        fullWidth
        helperText={errorText}
        id={id}
        size="small"
        variant="outlined"
      />
    </Box>
  );
};

export default TextFormField;
