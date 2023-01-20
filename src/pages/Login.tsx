import * as React from 'react';
import {
   TextField,
   Typography
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../redux/features/loginSlice';
import { useAppSelector, useAppDispatch } from '../redux/store/hooks'
import { useNavigate } from 'react-router-dom';

export interface LoginFormType {
   email: string;
   password: string;
}

export default function Login() {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const { isLoading, error } = useAppSelector(state => state.login)
   const loginValidationSchema = () =>
      yupResolver(
         Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
         }),
      );

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<LoginFormType>({
      resolver: loginValidationSchema()
   });

   const submitLogin = (data: LoginFormType) => {
      dispatch(loginRequest(data))
         .unwrap()
         .then(() => {
            navigate('/users')
         })

   }
   return (
      <div style={{ padding: 30 }}>
         <Paper>
            <Grid
               container
               spacing={3}
               direction="column"
               justifyContent="center"
               alignItems="center"
            >
               <span> Login Form </span>
               <Grid item xs={6}>
                  <TextField
                     required
                     label="Email"
                     type={'email'}
                     {...register('email')}
                     error={errors.email ? true : false}
                  />
                  <Typography variant="inherit" color="red">
                     {errors.email?.message}
                  </Typography>
               </Grid>
               <Grid item xs={6}>
                  <TextField
                     required
                     label="Password"
                     type={'password'}
                     {...register('password')}
                     error={errors.password ? true : false}
                  />
                  <Typography variant="inherit" color="red">
                     {errors.password?.message}
                  </Typography>

               </Grid>

               <Grid item xs={12}>
                  <LoadingButton loading={isLoading} fullWidth onClick={handleSubmit(submitLogin)}>
                     Login
                  </LoadingButton>
                  <Typography variant="inherit" color="red">
                     {error?.message}
                  </Typography>
               </Grid>
            </Grid>
         </Paper>
      </div>
   );
}
