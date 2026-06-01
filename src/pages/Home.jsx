import { ToolCard } from '../components/ToolCard';
import { tools } from '../data/tools';

const pillars = [
  ['Local by default', 'Files stay in memory in your browser. The app has no upload API, database, or tracking backend.'],
  ['Fast static delivery', 'Built with Vite and ready for S3 plus CloudFront edge caching.'],
  ['One hub, many jobs', 'PDF, image, text, encoding, QR, and developer utilities share a consistent workspace.'],
];

export function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Privacy-first browser tools</p>
          <h1>Handle everyday file and developer tasks without handing over your data.</h1>
          <p className="hero-lede">
            Hack.co.il is a static tools hub with a polished, security-minded interface. Open a utility, process the input locally, and download the result from your own device.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#tools">Explore tools</a>
            <a className="button ghost" href="#privacy">How privacy works</a>
          </div>
          <div className="trust-row" aria-label="Key platform facts">
            <span>0 servers processing files</span>
            <span>8 local utilities</span>
            <span>Static AWS-ready build</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Hack.co.il tool dashboard preview">
          <div className="visual-toolbar"><span /> <span /> <span /></div>
          <div className="scan-card">
            <small>Current session</small>
            <strong>Local-only workspace</strong>
            <p>PDF merge queued 3 files. No upload target configured.</p>
          </div>
          <div className="floating-card one">JSON ✓ valid</div>
          <div className="floating-card two">SHA-256 ready</div>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="section-heading">
          <p className="eyebrow">Tool library</p>
          <h2>Choose a private workspace</h2>
          <p>Every utility is a reusable React route designed to work offline after assets are cached by the browser.</p>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </section>

      <section className="section split-section" id="privacy">
        <div>
          <p className="eyebrow">Privacy model</p>
          <h2>Your browser does the work</h2>
          <p>
            The website ships as static HTML, CSS, and JavaScript. Tool logic uses browser APIs such as Canvas, Web Crypto, and local file readers, so sensitive files never need to leave the device.
          </p>
        </div>
        <div className="pillar-stack">
          {pillars.map(([title, body]) => (
            <article key={title} className="pillar-card">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section deploy-panel" id="deploy">
        <p className="eyebrow">Deployment</p>
        <h2>Ready for S3 + CloudFront</h2>
        <p>Run the Vite production build, sync the generated dist folder to S3, and invalidate CloudFront for domain delivery on Hack.co.il.</p>
        <code>npm run build && AWS_S3_BUCKET=your-bucket AWS_CLOUDFRONT_DISTRIBUTION_ID=ABC123 npm run deploy:s3</code>
      </section>
    </>
  );
}
