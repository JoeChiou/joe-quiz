import * as React from 'react';
import { useState } from "react";
import {
  Box, Paper,
  Stack,
  Typography,
  FormControl, FormControlLabel,
  FormHelperText,
  RadioGroup, Radio,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Chip,
} from '@mui/material';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { makeStyles } from '@material-ui/styles';
import { IQuestion } from '../../../services/model';

interface IQueryOptions {
  refetchHandler?: () => void,
  isFetched?: boolean,
  isFetching?: boolean,
  isLoading?: boolean,
  isRefetching?: boolean,
  error?: any
}

const Timer = ({ queryOptions, value, submit, }: { queryOptions: IQueryOptions, value: string, submit: (timeout: boolean) => void }) => {
  const classes = useStyles();
  const isPlaying = !queryOptions.isRefetching && queryOptions.isFetched && !value;

  const renderRemainingTime = ({ remainingTime, color }: { remainingTime: number, color: string }) => (
    <Box className={classes.remainingtimeBox} sx={{ color: color }}>
      <Typography variant='h4'>{remainingTime}</Typography>
    </Box>
  )
  
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={15}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[10, 6, 3, 0]}
      initialRemainingTime={15}
      onComplete={() => {
        submit(true);
        setTimeout(() => {
          queryOptions.refetchHandler();
        }, 1500);
        return ({ shouldRepeat: true, delay: 1.5 })
      }}>
      {renderRemainingTime}
    </CountdownCircleTimer >
  )
};

export const QuestionCard = (
  { question, queryOptions, answerCurrect }
    : { question: IQuestion, queryOptions: IQueryOptions, answerCurrect: () => void; }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Choose wisely');
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles({ mobile });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = (event.target as HTMLInputElement).value
    setValue(answer);
    handleSubmit(false, answer);
    setTimeout(() => {
      queryOptions.refetchHandler();
      setHelperText(' ');
      setError(false);
    }, 1500);
  };

  const handleSubmit = (timeout: boolean = false, answer?: string) => {
    if (timeout) {
      setHelperText('Timeout!')
      setValue('timeout');
      setError(true);
      return;
    }
    if (answer === question.correct_answer) {
      setHelperText('Currect!');
      answerCurrect();
      setError(false);
    } else {
      setHelperText('Wrong answer!');
      setError(true);
    }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <Stack direction={mobile ? 'column-reverse' : 'row'} spacing={2} >
        <Box className={classes.question}>
          {
            queryOptions.isRefetching ?
              <Box className={classes.progressBox}>
                <CircularProgress />
              </Box>
              :
              <>
                <Chip className={classes.chipTag} label={question.category} component={Typography} sx={{ mb: 2 }} />
                <Typography variant='h5' className={classes.questionText}>
                  {question.question}
                </Typography>
                <form >
                  <FormControl error={error} variant="standard" fullWidth>
                    <RadioGroup
                      name="quiz"
                      value={value}
                      onChange={handleRadioChange}>
                      {
                        question.answers.map((answer) =>
                          <FormControlLabel
                            key={answer}
                            disabled={!!value}
                            sx={{
                              color: value ? answer === question.correct_answer ? '#0cbd1b' : 'red' : 'inherit',
                            }}
                            value={answer}
                            control={<Radio />}
                            label={<Typography fontWeight={'bold'}>{answer}</Typography>} />
                        )
                      }
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                  </FormControl>
                </form>
              </>
          }
        </Box>
        <Box className={classes.timerBox}>
          <Timer queryOptions={queryOptions} submit={handleSubmit} value={value} />
        </Box>
      </Stack>
    </Paper >
  )
};

const useStyles = makeStyles({
  remainingtimeBox: {
    textAlign: 'center',
  },
  paper: {
    padding: '24px',
    '&.MuiPaper-root': {
      borderRadius: '30px',
      background: 'linear-gradient(to bottom, #fff, #b1d8f5 );',
    },
  },
  question: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  progressBox: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:'20vh'
  },
  chipTag: {
    width: 'fit-content',
    marginBottom: '100px',
    border: '1px solid red'
  },
  questionText: {
    textShadow: '1px 1px 2px pink'
  },
  timerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})