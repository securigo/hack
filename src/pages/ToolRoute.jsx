import { useParams } from 'react-router-dom';
import { getTool } from '../data/tools';
import { ToolFrame } from '../components/ToolFrame';
import { PdfMerge } from '../tools/PdfMerge';
import { PdfSplit } from '../tools/PdfSplit';
import { ImageConvert } from '../tools/ImageConvert';
import { JsonFormatter } from '../tools/JsonFormatter';
import { Base64Tool } from '../tools/Base64Tool';
import { HashGenerator } from '../tools/HashGenerator';
import { QrGenerator } from '../tools/QrGenerator';
import { TextDiff } from '../tools/TextDiff';

const components = {
  'pdf-merge': PdfMerge,
  'pdf-split': PdfSplit,
  'image-convert': ImageConvert,
  'json-formatter': JsonFormatter,
  base64: Base64Tool,
  'hash-generator': HashGenerator,
  'qr-generator': QrGenerator,
  'text-diff': TextDiff,
};

export function ToolRoute() {
  const { slug } = useParams();
  const tool = getTool(slug);
  const Component = components[slug];

  if (!tool || !Component) {
    return <ToolFrame tool={{ name: 'Tool not found', short: 'Return home and choose a tool.', icon: '？', category: 'Missing' }} />;
  }

  return (
    <ToolFrame tool={tool}>
      <Component />
    </ToolFrame>
  );
}
