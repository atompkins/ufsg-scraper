create table if not exists creature (
  id integer primary key,
  name text null,
  class text null,
  level integer null,
  attack integer null,
  defense integer null,
  armor integer null,
  damage integer null,
  hp integer null,
  lastSeen datetime null
);