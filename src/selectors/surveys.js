const getVisibleSurveys = (surveys, { text, author }) => {
  return surveys.filter((survey) => {
    const textMatch = survey.title.toLowerCase().includes(text.toLowerCase());
    if (author) {
      const authorMatch = (survey.author === author)
      return textMatch && authorMatch
    }
    return textMatch;
  })
};

export default getVisibleSurveys;
