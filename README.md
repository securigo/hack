# Hack.co.il Private Tools Hub

A Vite + React static website for privacy-first browser utilities. The app has no backend: PDF, image, text, encoding, hashing, and QR workflows run locally with browser APIs and client-side libraries.

## Routes

- `/tools/pdf-merge`
- `/tools/pdf-split`
- `/tools/image-convert`
- `/tools/json-formatter`
- `/tools/base64`
- `/tools/hash-generator`
- `/tools/qr-generator`
- `/tools/text-diff`

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to AWS S3 + CloudFront

Create an S3 bucket configured for static hosting and a CloudFront distribution that points at the bucket (or an Origin Access Control protected bucket). Then run:

```bash
AWS_S3_BUCKET=your-bucket-name \
AWS_CLOUDFRONT_DISTRIBUTION_ID=YOUR_DISTRIBUTION_ID \
npm run deploy:s3
```

The deployment script uploads long-lived hashed assets, uploads `index.html` with `no-cache`, and creates a CloudFront invalidation for single-page app routing.
