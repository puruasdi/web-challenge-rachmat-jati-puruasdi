// ** React Imports
import { useState, useContext } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

//Axios
import axios from 'axios'

//Context
import { AuthContext } from 'src/context/auth-context'


// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
  backgroundImage: `url("/images/logos/header-login.png")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: "40%"
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.warning.main
}))

const LoginPage = () => {
  const authContext = useContext(AuthContext);

  // ** State
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
    loading: false,
    openAlert: false,
    errorMessage: ""
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.username === '' && values.password === '') {
      setValues({ ...values, openAlert: true, errorMessage: "Username & password cannot be null or empty." })
    } else if (values.password === '') {
      setValues({ ...values, openAlert: true, errorMessage: "Password cannot be null or empty." })
    } else if (values.username == '') {
      setValues({ ...values, openAlert: true, errorMessage: "Username cannot be null or empty." })
    } else {
      setValues({ ...values, loading: true })

      await axios.post('https://dummyjson.com/auth/login', {
        username: values.username,
        password: values.password,
      })
        .then((response) => {
          authContext.setAuthState({
            token: response.data.token,
            userData: response.data
          })
          setValues({ ...values, loading: false })

          return response
        })
        .then((response) => {
          router.push("/dashboard")
        })
        .catch((error) => {
          setValues({ ...values, loading: false, openAlert: true, errorMessage: 'Invalid username or password' })
        });
    }

  }

  const handleClose = () => {
    setValues({ ...values, openAlert: false })
  };

  return (
    <Box className='content-center'>
      <Dialog
        open={values.openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {values.errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, mt: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img alt="logo" src='/images/logos/logo.png' width={110} />
          </Box>
          <Box sx={{ mb: 12, mt: 30 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Login
            </Typography>
            <Typography variant='body2'>Please sign in to continue.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField autoFocus fullWidth id='email'
              label='Username'
              sx={{ marginBottom: 12 }}
              type="text"
              value={values.username}
              onChange={handleChange('username')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{ display: 'flex', marginBottom: 12, marginTop: 12 }}>
              {values.loading ?
                <CircularProgress
                  sx={{ marginLeft: 'auto' }}
                /> :
                <Button
                  size='large'
                  variant='contained'
                  sx={{ marginLeft: 'auto', borderRadius: "25px" }}
                  type="submit"
                >
                  Login
                </Button>
              }
            </Box>
          </form>
          <Box sx={{ mt: 20, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              Don't have an account?
            </Typography>
            <Typography variant='body2'>
              <Link>
                <LinkStyled>Sign Up</LinkStyled>
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
