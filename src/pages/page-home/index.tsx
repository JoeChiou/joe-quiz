import * as React from 'react';
import { useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box, Container,
  List, ListItem,
  Stack,
  Skeleton,
  SxProps,
  Typography,
  useMediaQuery, useTheme
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Check, QuestionAnswer, Functions } from '@mui/icons-material';
import { $percentage, getQuestions } from '../../../services';
import { QuestionCard } from '../../components';

const REFETCH_DELAY = 3000

const Summary = ({ currectAnswered, answered }: { currectAnswered: number, answered: number }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles({ mobile });
  const listItemSx: SxProps = { py: mobile ? 0 : 1 }
  return (
    <Box className={classes.summary} >
      <List sx={{ width: mobile ? '100%' : '25%' }}>
        <ListItem sx={listItemSx}>
          <Typography variant='h6' className={classes.listItemText}>
            <Check color='success' />&ensp;
            Currect:
          </Typography>
          <Typography variant='h6' color={theme.palette.success.main}>{currectAnswered}</Typography>
        </ListItem>
        <ListItem sx={listItemSx}>
          <Typography variant='h6' className={classes.listItemText}>
            <QuestionAnswer color='info' />&ensp;
            Total:
          </Typography>
          <Typography variant='h6' color={theme.palette.info.main}>{answered}</Typography>
        </ListItem>
        <ListItem sx={listItemSx}>
          <Typography variant='h6' className={classes.listItemText}>
            <Functions color='warning' />&ensp;
            Accuracy:
          </Typography>
          <Typography variant='h6' color={theme.palette.warning.main}>{$percentage(currectAnswered / answered)}</Typography>
        </ListItem>
      </List>
    </Box >
  )
}

export const PageHome = () => {
  const [currectAnswered, setCurrectAnswered] = useState(0);
  const [answered, setAnswered] = useState(0);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles({ mobile });

  useQueryClient();
  const { data, refetch, isFetched, isFetching, isLoading, error, isRefetching } = useQuery(['todos'], getQuestions)

  const refetchHandler = () => {
    setAnswered(prev => prev + 1);
    setTimeout(() => refetch(), REFETCH_DELAY)
  };

  const answeredCurrect = () => setCurrectAnswered(prev => prev + 1);

  const queryOptions = { refetchHandler, isFetched, isFetching, isLoading, error, isRefetching };

  return (
    <Container>
      <Summary currectAnswered={currectAnswered} answered={answered} />
      {
        isLoading ?
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={60} animation="wave" />
            <Skeleton variant="rounded" height={150} animation="wave" />
          </Stack>
          :
          !!data && data.map((question) =>
            <QuestionCard key={question.question} question={question} queryOptions={queryOptions} answeredCurrect={answeredCurrect} />
          )
      }
    </Container>
  )
};

const useStyles = makeStyles({
  summary: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'flex-end'
  },
  listItem: {
    '&.MuiListItem-root': {
      border: '1px solid blue',
      paddingTop: (mobile) => mobile ? 0 : '50px',
      paddingBottom: (mobile) => mobile ? 0 : '50px',
    }
  },
  listItemText: {
    display: 'flex',
    alignItems: 'center',
  }
})