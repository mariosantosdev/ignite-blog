type Content = {
  heading: string;
  body: {
    text: string;
  }[];
};

export function countWords(content: Content[]): number {
  const words = content.reduce((acc, curr) => {
    return (
      acc +
      curr.heading.split(' ').length +
      curr.body.reduce((accBody, currBody) => {
        return accBody + currBody.text.split(' ').length;
      }, 0)
    );
  }, 0);

  return words;
}

export function calculateReading(wordsLength: number): number {
  return Math.ceil(wordsLength / 200);
}
