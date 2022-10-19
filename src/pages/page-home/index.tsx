import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Container, List, ListItem, Skeleton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { $percentage, getQuestions } from '../../../services';
import { QuestionCard } from '../../components';
import { makeStyles } from '@material-ui/styles';


const Summary = ({ currectAnswered, answered }: { currectAnswered: number, answered: number }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles({ mobile });
  return (
    <Box className={classes.summary} >
      <List sx={{ width: mobile ? '100%' : '15%' }}>
        <ListItem >
          <Typography variant='h6'>Currect:</Typography>
          <Typography variant='h6'>{currectAnswered}</Typography>
        </ListItem>
        <ListItem >
          <Typography variant='h6'>Total:</Typography>
          <Typography variant='h6'>{answered}</Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: 'flex-end' }}>
          <Typography variant='h6'>{$percentage(currectAnswered / answered)}</Typography>
        </ListItem>
      </List>
    </Box >
  )
}

export const PageHome = () => {
  useQueryClient();
  const [currectAnswered, setCurrectAnswered] = useState(0);
  const [answered, setAnswered] = useState(0);
  const { data, refetch, isFetched, isFetching, isLoading, error, isRefetching } = useQuery(['todos'], getQuestions)

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles({ mobile });

  const refetchHandler = () => {
    setAnswered(prev => prev + 1);
    refetch();
  };

  const answerCurrect = () => {
    setCurrectAnswered(prev => prev + 1);
  }
  const queryOptions = { refetchHandler, isFetched, isFetching, isLoading, error, isRefetching };
  return (
    <Container className={classes.container}>
      <Summary currectAnswered={currectAnswered} answered={answered} />
      {
        isLoading ?
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={60} animation="wave" />
            <Skeleton variant="rounded" height={150} animation="wave" />
          </Stack>
          :
          !!data && data.map((question) =>
            <QuestionCard key={question.question} question={question} queryOptions={queryOptions} answerCurrect={answerCurrect} />
          )
      }
    </Container>
  )
};

const useStyles = makeStyles({
  container: {
  },
  summary: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'flex-end'
  },
})