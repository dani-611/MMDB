import { Link } from '@mui/material';

export const TermsOfUseLink = () => {
  return (
    <>
      <Link
        href="https://www.imdb.com/conditions/?ref_=hm_ftr"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        Terms Of Use
      </Link>
    </>
  );
};
