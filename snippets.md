### PostgreSQL

Connect to database via CLI:

`psql -h postgres -U postgres -d wiki-tracer-ts`

### Prisma

Create database and set up the schema:

`npx prisma migrate dev`

### Parse

`npm run parse data/simplewiki-20240801-pages-articles.xml`
