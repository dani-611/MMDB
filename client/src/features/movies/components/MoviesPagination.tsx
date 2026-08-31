import { Pagination } from '@mui/material';

export const MoviesPagination = ({
  page,
  count,
  onChange,
}: {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) => {
  return (
    <>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        defaultPage={1}
        variant="outlined"
        shape="rounded"
        color="primary"
        boundaryCount={1}
        siblingCount={1}
        sx={{
          '& .MuiPaginationItem-root': {
            margin: '0 4px',
          },
          '& .MuiPaginationItem-root.Mui-disabled': {
            backgroundColor: '#bbbbbb',
            border: 'none',
            opacity: 1,
            color: '#ffffff',
            '& .MuiSvgIcon-root': {
              fill: '#ffffff',
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            padding: '2px 6px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '32px',
            minWidth: '32px',
            margin: '0 4px',
          },
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
        }}
      />
    </>
  );
};
