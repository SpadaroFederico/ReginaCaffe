import { getMacroTitle } from "./menuText";

/*
 * Titolo di una carta: parte iniziale in
 * tondo, parola chiave in italic, come i
 * titoli del sito ("Le notti in piazza").
 */

export default function MenuTitle({
  macro,
  language,
}) {
  const { lead, italic } = getMacroTitle(
    macro,
    language
  );

  return (
    <>
      {lead && (
        <span className="not-italic">
          {lead}{" "}
        </span>
      )}

      <span className="italic">
        {italic}
      </span>
    </>
  );
}
