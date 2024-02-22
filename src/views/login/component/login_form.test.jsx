import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

import { useLoginRestaurantMutation } from 'src/redux/api/auth_slice_api.test';
import { setCredentials } from 'src/redux/actions/auth_slice.test';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function LoginForm() {
  //   const theme = useTheme();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const [loginRestaurant, { isLoading: isLoginLoading }] = useLoginRestaurantMutation();

  async function handleLogin(e) {
    e.preventDefault();
    const data = {
      email: phoneNumber,
      password,
    };

    try {
      const { accessToken } = await loginRestaurant(data).unwrap();
      dispatch(setCredentials({ accessToken }));
      setPhoneNumber('');
      setPassword('');
      router.push('/');
    } catch (err) {
      console.log('Login error', err);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: { xs: 2, sm: 5 },
            width: 1,
            maxWidth: 'md',
          }}
        >
          <Typography variant="h4">Sign in to QR Food</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link to="/register" style={{ marginLeft: '8px' }}>
              Get started
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <Stack spacing={3}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <TextField
              name="password"
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            sx={{ my: 3 }}
          >
            {isLoginLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Card>{' '}
      </Stack>
    </form>
  );
}
