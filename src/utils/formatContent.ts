import { RichText } from 'prismic-dom';

type Content = {
  heading: string;
  body: {
    text: string;
  }[];
};

export function formatContent(
  content: Content[]
): Array<[heading: string, body: string]> {
  return content.map(item => {
    return [item.heading, RichText.asHtml(item.body)];
  });
}
