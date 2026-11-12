export function getMacroTitle(macro, language) {
  return (
    macro.title[language] ??
    macro.title.it
  );
}

export function getMacroPlainTitle(macro, language) {
  const { lead, italic } = getMacroTitle(
    macro,
    language
  );

  return [lead, italic]
    .filter(Boolean)
    .join(" ");
}
