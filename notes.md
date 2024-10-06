### Issues encountered

#### Memory exhaustion

- Running out of memory because the XML gets parsed faster than the pages + links get saved into the
  database, resulting in promises in the Parser.promise chain piling up. Fixed by applying back
  pressure to the XML parser.

#### Index size error from PostgreSQL

- `index row size 2984 exceeds btree version 4 maximum 2704 for index "Link_to_idx"`

- Turned out to be because Wikipedia has interactive maps and such, containing elements with
  geometric coordinates that are a) long and b) trigger the regex for detecting links in a page.
  This resulted in these coordinate sequences getting saved in the DB as links, and Postgres would
  throw an error because the link was too long to store in a regular btree index. Solved by removing
  the coordinate sequences from the page text before extracting links.
