import { ExternalLink } from 'lucide-react';

export function OriginalArticleLink({ link }: { link: string }) {
  return (
    <div className="border-t pt-4">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        Original Article
        <ExternalLink className="ml-1 w-4 h-4" />
      </a>
    </div>
  );
}
