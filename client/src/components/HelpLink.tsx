import { Link } from '@mui/material';

export const HelpLink = () => {
  return (
    <>
      <Link
        href="https://help.imdb.com/imdb"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        Help
      </Link>
    </>
  );
};
