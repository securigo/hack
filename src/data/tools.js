export const tools = [
  {
    slug: 'pdf-merge',
    name: 'PDF merge',
    short: 'Combine multiple PDFs into one local file.',
    category: 'PDF',
    icon: '📎',
  },
  {
    slug: 'pdf-split',
    name: 'PDF split',
    short: 'Extract selected pages from a PDF in your browser.',
    category: 'PDF',
    icon: '✂️',
  },
  {
    slug: 'image-convert',
    name: 'Image convert',
    short: 'Convert images to PNG, JPEG, or WebP with canvas.',
    category: 'Media',
    icon: '🖼️',
  },
  {
    slug: 'json-formatter',
    name: 'JSON formatter',
    short: 'Format, minify, and validate JSON instantly.',
    category: 'Developer',
    icon: '{}',
  },
  {
    slug: 'base64',
    name: 'Base64 encoder / decoder',
    short: 'Encode and decode text without a network request.',
    category: 'Encoding',
    icon: '🔐',
  },
  {
    slug: 'hash-generator',
    name: 'Hash generator',
    short: 'Create SHA-1, SHA-256, SHA-384, or SHA-512 digests.',
    category: 'Security',
    icon: '#',
  },
  {
    slug: 'qr-generator',
    name: 'QR generator',
    short: 'Generate downloadable QR codes from any text or URL.',
    category: 'Sharing',
    icon: '▦',
  },
  {
    slug: 'text-diff',
    name: 'Text diff',
    short: 'Compare two blocks of text line-by-line locally.',
    category: 'Developer',
    icon: '⇄',
  },
];

export const getTool = (slug) => tools.find((tool) => tool.slug === slug);
