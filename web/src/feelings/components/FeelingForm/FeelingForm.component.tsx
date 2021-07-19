import { ChangeEvent, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Avatar, Box, Button, CircularProgress, FormControlLabel, IconButton, Radio, RadioGroup } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

import UploadButton from 'utils/components/UploadButton';
import TextFormField from 'utils/components/TextFormField';
import type { FeelingFormSchema } from 'feelings/models/feeling';
import { useStyles } from './FeelingForm.styles';
import { useAppDispatch, useAppSelector } from 'app/root/hooks';
import { createOrUpdateFeeling } from 'feelings/ducks/feeling.slice';
import { useEffect } from 'react';

type QuizParams = {
  identifier: string;
};

const feelingSchema = yup.object().shape<FeelingFormSchema>({
  title: yup.string().required('Title is required'),
  type: yup.string().required('Type is required'),
  shortDescription: yup.string().required('Short description is required'),
  feelingDescription: yup.string(),
  image: yup.mixed()
});

const defaultSchema: FeelingFormSchema = {
  title: '',
  type: 'happy',
  image: null,
  shortDescription: '',
  feelingDescription: ''
};

const FeelingForm = () => {
  const classes = useStyles();
  const { identifier } = useParams<QuizParams>();
  const dispatch = useAppDispatch();
  const upsertStatus = useAppSelector(state => state.feeling.feelingUpsertStatus);
  const selectedFeeling = useAppSelector(state => state.feeling.selectedFeeling);

  const [feelingDefaultSchema, setFeelingDefaultSchema] = useState<FeelingFormSchema>(defaultSchema);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (identifier !== 'new' && selectedFeeling) {
      const feeling: FeelingFormSchema = {
        title: selectedFeeling.title,
        type: selectedFeeling.feelingType.code,
        image: null,
        shortDescription: selectedFeeling.shortDescription,
        feelingDescription: selectedFeeling.feelingDescription
      };

      if (selectedFeeling.feelingPicture) {
        feeling.image = 'existing';
        setImagePreview(selectedFeeling.feelingPicture.fileName);
      }
      setFeelingDefaultSchema(feeling);
    };
  }, [selectedFeeling, identifier]);

  const handleSubmit = async (_: FeelingFormSchema, { setSubmitting }: FormikHelpers<FeelingFormSchema>) => {
    setSubmitting(false);
    const feeling = {
      _id: identifier,
      title: _.title,
      type: _.type,
      shortDescription: _.shortDescription,
      feelingDescription: _.feelingDescription,
      deletePicture: false
    };

    if (identifier !== 'new' && selectedFeeling && selectedFeeling?.feelingPicture && !_.image) feeling.deletePicture = true;
    void dispatch(createOrUpdateFeeling({ feeling, picture: _.image}));
  };

  return (
    <Formik enableReinitialize initialValues={feelingDefaultSchema} onSubmit={handleSubmit} validationSchema={feelingSchema}>
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <Box display="flex" flexDirection="row" marginY={3}>
            <Box display="flex" flexDirection="column" flexGrow={1} paddingRight={10}>
              <Field component={TextFormField} id="title" label="Title" name="title" required/>
              <Field component={TextFormField} id="shortDescription" label="Short description feeling" multiline name="shortDescription" required rows={2}/>
            </Box>
            <RadioGroup aria-label="type" name="type" onChange={handleChange} value={values.type}>
              <Box alignItems="center" display="flex" flexDirection="row">
                <Box display="flex" flexDirection="column">
                  <FormControlLabel control={<Radio />} label="Happy" value="happy" />
                  <FormControlLabel control={<Radio />} label="Sad" value="sad" />
                  <FormControlLabel control={<Radio />} label="Furious" value="furious" />
                  <FormControlLabel control={<Radio />} label="Angry" value="angry" />
                </Box>
                <Box display="flex" flexDirection="column">
                  <FormControlLabel control={<Radio />} label="Bored" value="bored" />
                  <FormControlLabel control={<Radio />} label="Love" value="in_love" />
                  <FormControlLabel control={<Radio />} label="Scared" value="scared" />
                  <FormControlLabel control={<Radio />} label="Sleepy" value="sleepy" />
                </Box>
                <Avatar alt="Remy Sharp" className={classes.avatar} src={`/assets/${values.type}.png`} />
              </Box>
            </RadioGroup>
          </Box>
          <Field component={TextFormField} id="feelingDescription" label="Feeling description" multiline name="feelingDescription" rows={5}/>
          {!imagePreview &&
            <Box marginY={3}>
              <UploadButton
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('image', event.target.files?.[0]);
                  setImagePreview(URL.createObjectURL(event.target.files?.[0]));
                }}
              />
            </Box>
          }
          {!!imagePreview &&
            <Box alignItems="flex-start" display="flex" flexDirection="column" marginY={3}>
              <IconButton
                aria-label="deleetImage"
                edge="end"
                onClick={() => {
                  setFieldValue('image', '');
                  setImagePreview('');
                }}>
                <CloseOutlined color="secondary"/>
              </IconButton>
              <img alt="feeling-description" className={classes.image} src={imagePreview} />
            </Box>
          }
          {upsertStatus === 'saving' &&
            <Box alignItems="center" display="flex" height={42} justifyContent="flex-start" marginBottom={24}>
              <CircularProgress size={24}/>
            </Box>
          }
          {upsertStatus !== 'saving' &&
            <Button className={classes.button} color="primary" disableElevation size="large" type="submit" variant="contained">
              {identifier === 'new' ? 'Create' : 'Update' }
            </Button>
          }
        </Form>
      )}
    </Formik>
  );
};

export default FeelingForm;
