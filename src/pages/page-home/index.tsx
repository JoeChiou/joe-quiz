import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { $percentage, getQuestions } from '../../../services';
import { QuestionCard } from '../../components';
import { makeStyles } from '@material-ui/styles';

export const PageHome = () => {
  useQueryClient();
  const [currectAnswered, setCurrectAnswered] = useState(0);
  const [answered, setAnswered] = useState(0);
  const { data, refetch, isFetched, isFetching, isLoading, error, isRefetching } = useQuery(['todos'], getQuestions)
  const classes = useStyles();

  const refetchHandler = () => {
    setAnswered(prev => prev + 1);
    refetch();
  };

  const answerCurrect = () => {
    setCurrectAnswered(prev => prev + 1);
  }
  const queryOptions = { refetchHandler, isFetched, isFetching, isLoading, error, isRefetching };
  return (
    <Container >
      <Stack className={classes.stack}>
        <Typography variant='h6' sx={{ textAlign: 'right' }}>Currect: {currectAnswered}</Typography>
        <Typography variant='h6' sx={{ textAlign: 'right' }}>Total answered: {answered}</Typography>
        <Typography variant='h6'>{$percentage(currectAnswered / answered)}</Typography>
      </Stack>

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
  stack: {
    justifyContent: 'flex-end',
    textAlign: 'right'
  }
})