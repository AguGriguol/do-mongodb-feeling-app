import { ChangeEvent, useState } from 'react';
import { MoveFocusInside } from 'react-focus-lock';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Box, Button, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import UploadButton from 'utils/components/UploadButton';
import TextFormField from 'utils/components/TextFormField';
import type { FeelingFormSchema } from 'feelings/models/feeling';

const feelingSchema = yup.object().shape<FeelingFormSchema>({
  title: yup.string().required('Title is required'),
  type: yup.string().required('Type is required'),
  image: yup.mixed()
});

const feelingDefaultSchema: FeelingFormSchema = {
  title: '',
  type: 'normal',
  image: null
};

const FeelingForm = () => {
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleSubmit = async (_: FeelingFormSchema, { setSubmitting }: FormikHelpers<FeelingFormSchema>) => {
    setSubmitting(false);
  };

  return (
    <Formik initialValues={feelingDefaultSchema} onSubmit={handleSubmit} validationSchema={feelingSchema}>
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <MoveFocusInside>
            <Field component={TextFormField} id="title" label="Title" name="title" />
          </MoveFocusInside>
          <Box marginY={3}>
            <RadioGroup aria-label="type" name="type" onChange={handleChange} value={values.type}>
              <FormControlLabel control={<Radio />} label="Happy" value="happy" />
              <FormControlLabel control={<Radio />} label="Normal" value="normal" />
              <FormControlLabel control={<Radio />} label="Sad" value="sad" />
            </RadioGroup>
          </Box>
          <Box marginY={3}>
            <UploadButton
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFieldValue('image', event.target.files?.[0]);
                setImagePreview(URL.createObjectURL(event.target.files?.[0]));
              }}
            />
          </Box>
          {!!imagePreview && (
            <Box marginY={3}>
              <img alt="feeling-description" src={imagePreview} />
            </Box>
          )}
          <Button color="primary" disableElevation size="large" type="submit" variant="contained">
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FeelingForm;
