### Issues encountered

- Running out of memory because the XML gets parsed faster than the pages + links get saved into
  the database, resulting in promises in the Parser.promise chain piling up. Fixed by applying
  back pressure to the XML parser.

- `index row size 2984 exceeds btree version 4 maximum 2704 for index "Link_to_idx"`
