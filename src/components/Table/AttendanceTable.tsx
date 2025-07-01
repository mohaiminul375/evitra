import React from 'react';
import { TableCell, TableRow } from '../ui/table';

const AttendanceTable = ({ idx, list }) => {
    const { name, email, createdAt } = list;
    return (
        <TableRow className='border-b-2 border-foreground'>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium text-center">{name} <br /> {email}</TableCell>
            <TableCell className="font-medium text-center text-base">
                {new Date(createdAt).toLocaleString()}
            </TableCell>

        </TableRow>
    );
};

export default AttendanceTable;