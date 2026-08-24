import { Link } from '@mui/material';

export const AboutLink = () => {
  return (
    <>
      <Link
        href="https://www.imdb.com/pressroom/about/"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        About
      </Link>
    </>
  );
};
