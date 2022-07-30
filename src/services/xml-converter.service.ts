export const xml2json = (xmlString: any) => {
  const jsonData = {} as any;
  for (const result of xmlString.matchAll(
    /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm
  )) {
    const key = result[1] || result[3];
    const value = result[2] && xml2json(result[2]); //recusrion
    jsonData[key] =
      (value && Object.keys(value).length ? value : result[2]) || null;
  }
  return jsonData;
};
