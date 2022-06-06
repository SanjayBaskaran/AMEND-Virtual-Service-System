import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, servicetype, serviceprovider, amount) {
  return { id, date, name, servicetype, serviceprovider, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2022',
    'Elvis Presley',
    'Electricals',
    'Khani Radios',
    312.44,
  ),
  createData(
    1,
    '19 Mar, 2022',
    'Paul McCartney',
    'Software',
    'Kovai Computers',
    866.99,
  ),
  createData(2, '18 Mar, 2022', 'Tom Scholz', 'Electronics', 'Saravana Electronics', 100.81),
  createData(
    3,
    '16 May, 2022',
    'Michael Jackson',
    'Automobile',
    'Pressana Honda',
    654.39,
  ),
  createData(
    4,
    '22 May, 2022',
    'Bruce Springsteen',
    'Plumbing',
    'Finolex pipes',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Service Type</TableCell>
            <TableCell>Service Provider</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.servicetype}</TableCell>
              <TableCell>{row.serviceprovider}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}