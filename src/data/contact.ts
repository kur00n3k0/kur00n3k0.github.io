import type { CodeLine } from './articles'

const prompt = (x: string): CodeLine => ({ t: 'prompt', x })

export const PGP_LINES: CodeLine[] = [
  '-----BEGIN PGP PUBLIC KEY BLOCK-----',
  'mDMEajss/RYJKwYBBAHaRw8BAQdASMiqtQFJHFfSXfXCh5xYrBGgHpRjLzxWkj8b',
  'jUe19Ua0IWt1cjBuM2swIDxtNHNoMWxvQHByb3Rvbm1haWwuY29tPoiWBBMWCgA+',
  'FiEENih+laM/HZaphdYYrShd5YelweIFAmo7LP0CGwMFCQWjmoAFCwkIBwIGFQoJ',
  'CAsCBBYCAwECHgECF4AACgkQrShd5YelweIi0gEAtDbSwt+R6QA540gAsGhlYYmA',
  'AWLye4IwmQNDRn+AXRkA/0i4EEhomqdMBdNbovBy+Xz7q3z5PfMuXTqIAF/PWCEM',
  'uDgEajss/RIKKwYBBAGXVQEFAQEHQCaE4b8serfo+8xhiMtk5WlZ0ZthVcUVQodr',
  'lWXZK9w3AwEIB4h+BBgWCgAmFiEENih+laM/HZaphdYYrShd5YelweIFAmo7LP0C',
  'GwwFCQWjmoAACgkQrShd5YelweIauQD/dnm6QEtMtLrAaggaO/0hOXeQJT/2+yRd',
  '2lyD6TTtoT0A/iJd4VxtF69LRH53NAgMfOhNRAIakaG/GwTDp3eSQ28F',
  '=ihWi',
  '-----END PGP PUBLIC KEY BLOCK-----',
].map(prompt)

export const MONERO_LINES: CodeLine[] = [
  'Please donate to us so we can keep working',
  'For now we only accept donations in Monero and not planning on taking other crypto',
  '',
  'Monero wallet address:',
  '4ASANdSLMzHMPM9QWKXs7jbhhEFbdSrAaW4g8HLuDJnVSanhnQhMFM2EfuhKQ2jpG9YVBAmW4CYyVNXNNXHGzewtTXeKdRY',
].map(prompt)
