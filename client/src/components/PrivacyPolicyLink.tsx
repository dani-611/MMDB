import { Link } from '@mui/material';

export const PrivacyPolicyLink = () => {
  return (
    <>
      <Link
        href="https://www.imdb.com/privacy/?ref_=hm_ftr"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      >
        Privacy Policy
      </Link>
    </>
  );
};
