import { Flex, Box, Heading, Button, Text } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import FormInputField from '../Shared/FormInputField';
import { loginFormState } from '../../utils/state';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Login = () => {
  const [form, setForm] = useState(loginFormState);
  const [login, { error }] = useMutation(LOGIN);
  const [formError, setFormError] = useState('');

  const updateField = useCallback(
    (name, value, attribute) => {
      setForm((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], [attribute]: value },
      }));
    },
    [setForm]
  );

  const clearErrors = () => {
    for (const key of Object.keys(form)) {
      updateField(key, '', 'error');
    }
  };

  const validateForm = () => {
    let errors = false;
    for (const key of Object.keys(form)) {
      if (form[key].value.trim().length === 0 || form[key].error.length) {
        errors = true;
      }
    }
    return !errors;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError('');
      clearErrors();
      if (!validateForm()) {
        return;
      }

      const response = await login({
        variables: { email: form.email.value, password: form.password.value },
      });

      const token = response.data.login.token;
      Auth.login(token);
    } catch (err) {
      setFormError('Invalid credentials');
    }
  };

  return (
    <Flex justify="center" mt="10rem">
      <Box
        onSubmit={handleOnSubmit}
        borderRadius={8}
        boxShadow="sm"
        as="form"
        border="1px solid"
        borderColor="gray.300"
        minH="500px"
        w={['100%', '450px', '450px']}
        mb="1rem"
      >
        <Box mb="4rem" p="0.5rem" textAlign="center">
          <Heading color="gray.600">Login</Heading>
          {formError.length > 0 && (
            <Text fontSize="0.85rem" color="red.500">
              {formError}
            </Text>
          )}
        </Box>

        <Box my="2rem">
          <FormInputField
            name={form.email.name}
            value={form.email.value}
            id={form.email.name}
            error={form.email.error}
            type={form.email.type}
            label="Email"
            errorField="Email"
            width="90%"
            updateField={updateField}
          />
        </Box>
        <Box my="2rem">
          <FormInputField
            name={form.password.name}
            value={form.password.value}
            id={form.password.name}
            error={form.password.error}
            type={form.password.type}
            label="Password"
            errorField="Password"
            width="90%"
            updateField={updateField}
          />
        </Box>
        <Flex p="0.5rem" justify="center">
          <Button type="submit" width="90%" colorScheme="teal">
            Login
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
