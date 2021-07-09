import { Box, Container, Typography } from '@material-ui/core';
import FeelingForm from 'feelings/components/FeelingForm';

const CreateFeeling = () => (
  <Container>
    <Box marginBottom={4} marginTop={8}>
      <Typography component="h1" variant="h6">Create a feeling</Typography>
    </Box>
    <FeelingForm />
  </Container>
);

export default CreateFeeling;
