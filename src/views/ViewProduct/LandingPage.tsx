import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { setApp } from '@store/app.action';
import axios from 'axios';
import { throttle } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import container from './LandingPage.container';

export interface ILandingProps {}
const useStyles = makeStyles((theme: any) => ({
  header: {
    fontSize: '30px',
    letterSpacing: '0.5px',
    color: '#023473',
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
  }
}));

const LandingPage: React.FC<ILandingProps> = ({}) => {
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
                app_name: request.name
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
        1000
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
  const dispatch = useDispatch();
  const router = useRouter();
  React.useEffect(() => {
    if (value) {
      dispatch(setApp(value));
      router.push(`/app/${value.app_id}?name=${value.app_name}`);
    }
  }, [value]);

  return (
    <Container maxWidth={'md'}>
      <Typography className={classes.header} variant={'h1'}>
        What data does your favorite app collect about you?
      </Typography>

      <Typography className={classes.subheader}>
        Search the apps you use frequently below to get a better look at just
        how they are using your data and your risk associated with sharing your
        private information.
      </Typography>
      <Box>
        <Typography className={classes.subheader1}>
          Lookup privacy details
        </Typography>
        <Autocomplete
          id="autocomplete-box"
          options={options}
          value={inputValue}
          getOptionLabel={(option: any) =>
            typeof option === 'string' ? option : option.app_name
          }
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setvalue(newValue);
          }}
          onInputChange={(e, inputValue) => {
            console.log(inputValue);
            setInputValue(inputValue);
          }}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Suggestion" variant="outlined" />
          )}
        />
      </Box>
    </Container>
  );
};

export default container(LandingPage);
