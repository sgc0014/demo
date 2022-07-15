import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Divider,
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RootState } from 'src/store/';
import { setApp } from '@store/app.action';
import axios from 'axios';
import { throttle } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import container from './LandingPage.container';

export interface ILandingProps {}
const useStyles = makeStyles((theme: any) => ({
  header: {
    fontSize: '14px',
    color: '#575757',
    textTransform: 'capitalize'
  },
  subheader: {
    paddingBottom: 15,
    paddingTop: 10,
    fontSize: 17,
    color: 'black'
  },
  subheader1: {
    paddingBottom: 15,
    fontSize: 20,
    color: 'black',
    fontWeight: 400
  },
  btn: {
    backgroundColor: 'red',
    '& :hover': {
      backgroundColor: 'red'
    },
    '& > *': {
      color: 'white'
    }
  }
}));

const ProductPage: React.FC<ILandingProps> = ({}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<any>([]);
  const [value, setvalue] = React.useState<any>();

  const fetch = React.useMemo(
    () =>
      throttle(
        (request: { name: string }, callback: (results: any) => void) => {
          axios
            .post(
              'https://staging.vogelme.com/api/privacy/v0.2/appstore/suggest',
              {
                app_name: 'facebook'
              },
              {
                headers: {
                  'x-lmd-api-key': '1f03dbf95ae642abbc66dd5cfb5797e5'
                }
              }
            )
            .then(({ data }) => callback(data))
            .catch((err) => console.error(err));
        },
        200
      ),
    []
  );
  React.useEffect(() => {
    let active = true;

    fetch({ name: inputValue }, (results?: any[]) => {
      if (active) {
        let newOptions = [] as any[];

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
      setOptions([]);
    };
  }, [inputValue, fetch]);
  const { app } = useSelector((state: RootState) => state.app);
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box p={5} elevation={2} component={Paper}>
        <Box mt={3} mb={4}>
          <Typography>{app?.app_name}</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid xs={5} item>
            <Typography className={classes.header}>Overall</Typography>
          </Grid>
          <Grid xs={6} item>
            <Button variant={'contained'} className={classes.btn}>
              <Typography className={classes.header}>
                {app?.privacyRating[0]?.grade}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={5} item>
            <Typography className={classes.header}>
              Data types used for tracking
            </Typography>
          </Grid>
          <Grid xs={6} item>
            <Typography className={classes.header}>
              {app?.privacyInfo[0]?.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={5} item>
            <Typography className={classes.header}>
              Top three data types that contribute most to privacy risk
            </Typography>
          </Grid>
          <Grid xs={6} item>
            <Typography className={classes.header}>
              {app?.privacyInfo &&
                app?.privacyInfo[0]?.dataCategories &&
                app?.privacyInfo[0]?.dataCategories
                  .slice(0, 3)
                  .map((item: any) => item?.dataCategory)
                  .join(', ')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={5} item>
            <Typography className={classes.header}>
              Number of data types linked to you that are collected for reasons
              other than app functionality/product personalization
            </Typography>
          </Grid>
          <Grid xs={6} item>
            {console.log(app)}
            <Typography className={classes.header}>
              {app?.privacyRating[0]?.data_types_linked_to_you_count}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default container(ProductPage);
