import * as React from 'react';
import { useEffect } from 'react';
import {
  useDispatch, useSelector,
  // useSelector
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setAlert } from '../actions/alert'
import { createUser } from '../actions/auth'
import { GET_PROGRAMMES } from '../actions/types';
import { getProgrammes } from '../actions/programme'

const theme = createTheme();

const jobs = [
  {
    value: 'Staff',
    label: 'Staff'
  },
  {
    value: 'Support Manager',
    label: 'Support Manager',
  },
  {
    value: 'Finance Manager',
    label: 'Finance Manager',
  },
  {
    value: 'Procurement Manager',
    label: 'Procurement Manager',
  },
  {
    value: 'Chairman',
    label: 'Chairman',
  }
];

export default function UserCreate() {
  const [value, setValue] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isAuthenticated } = useSelector(state => state.auth);
  const { programmes } = useSelector(state => state.programme);
  const programmesFiltered = programmes.filter((programme) => programme.isRemoved === false);
  const programmeOptions = programmesFiltered?.map((option) => ({
    value: option._id,
    label: option.name
  }))
  
  console.log("eagle", programmeOptions);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const birth = value;
    const address = data.get('address');
    const phone = data.get('phone');
    const email = data.get('email');
    const job = data.get('job');
    const programme = data.get('programme');
    const contractNo = data.get('contractNo');    
    const password = data.get('password');
    const password2 = data.get('password2');
    const captchaToken = 'staticcatcha';
    // recaptchaRef.current.reset();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'error'));
    } else {
      dispatch(createUser({ firstName, lastName, birth, address, phone, email, job, programme, contractNo, password, captchaToken }, navigate));
    }
  };

  useEffect(() => {
    // if (isAuthenticated) {
    //   navigate('/dashboard');
    // }
    dispatch(getProgrammes());
  }, [dispatch/* isAuthenticated, navigate*/])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Create User
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    name="birth"
                    id="birth"
                    label="Date of Birth:"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="phone"
                    label="Phone number"
                    name="phone"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="job"
                    label="Job Title"
                    name="job"
                    select
                  >
                    {jobs.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="programme"
                    label="Programme"
                    name="programme"
                    select
                    >
                      {programmeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="contractNo"
                    label="Contract No"
                    name="contractNo"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ color: '#ffffff', backgroundColor: '#d20000' }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}