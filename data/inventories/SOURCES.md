# Inventory data sources

Every entry here is used commercially. The attribution below is a licence
obligation, not a courtesy. The attributions page in the application is
generated from this file.

## CEFR-J Vocabulary Profile 1.5

- File: `cefrj-vocabulary-profile-1.5.csv`
- Rows: 7,799 (levels A1–B2)
- Copyright: Tono Laboratory, Tokyo University of Foreign Studies (TUFS)
- Licence: free for research and commercial use, with proper citation
- Source: https://github.com/openlanguageprofiles/olp-en-cefrj
- Required citation: Tono, Y. (ed.) CEFR-J Wordlist Version 1.5.
  Compiled by Yukio Tono, Tokyo University of Foreign Studies.

## Octanove Vocabulary Profile C1/C2 1.0

- File: `octanove-vocabulary-profile-c1c2-1.0.csv`
- Rows: 2,136 (levels C1–C2)
- Copyright: Octanove Labs
- Licence: CC BY-SA 4.0
- Note: share-alike. Used as an internal reference lookup only — never
  republished as a dataset, and never used as the basis of an adapted work.
  See spec §3.7 on why CC BY-SA is restricted to separable use.

## CEFR-J Grammar Profile 2018-03-15

- File: `cefrj-grammar-profile-20180315.csv`
- Rows: 500
- Copyright: Tono Laboratory, TUFS
- Licence: as CEFR-J above
- Known limitation: partially translated from Japanese. 330 of 500 rows have a
  blank primary level and require the fallback cascade in `load-grammar.ts`;
  484 of 500 resolve to a level from some column.

## WordNet 3.1 (via the `wordnet-db` package)

- Used for: multi-word verb inventory (2,838 entries)
- Copyright: Princeton University
- Licence: permits commercial use provided the copyright notice is retained
- Note: WordNet supplies the phrases but **not** CEFR levels. Levels for these
  entries are derived by this project and marked `levelSource: 'derived'` with
  a confidence below 1. They are estimates, not evidence.

## Methodology note

CEFR levels for words are not defined by the CEFR itself, which describes what
learners can *do* rather than which words they know. They are measured.

CEFR-J derived its levels from English textbooks used in Japan, China and
Korea — words appearing in all three regions' beginner textbooks became the
lowest level, then that set was subtracted and the process repeated upward.
The result was then checked against the Cambridge English Vocabulary Profile
and B1–B2 adjusted to align.

Cambridge's own method differs: it reads 50 million words of real exam scripts
from learners whose level is known, and assigns a word the level at which
learners actually start using it.

Levels are therefore evidence-based approximations, and different sources
legitimately disagree. Nothing here is a definition.
