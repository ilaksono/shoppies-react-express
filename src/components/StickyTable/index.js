import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatNum } from 'helpers';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Title', minWidth: 100 },
  { id: 'code', label: 'Country', minWidth: 100 },
  {
    id: 'population',
    label: 'Box Office',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Votes',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

];

function createData(name, code, population, size, imdb) {
  return { name, code, population, size, imdb };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    overflowY: 'hidden'
  },
  container: {
    maxHeight: "95%",
    overflowY: 'scroll'
  },
});

export default function StickyHeadTable({ data,
  getMovieDetails, resetDetails }) {
  const classes = useStyles();
  let rows = [];
  if(data.length) {
    rows = data.map(each => createData(each.title, each.country, each.revenue_usd, each.total))
  }

  const history = useHistory();
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow
                  onClick={() => {
                    resetDetails();
                    getMovieDetails(row.imdb);
                    history.push(`/films/${row.imdb}`);
                  }}
                  style={{
                    cursor: 'pointer'
                  }}
                  hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? formatNum(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}