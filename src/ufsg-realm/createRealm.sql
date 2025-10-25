create table if not exists realm (
  realm_id integer not null,
  realm_name text null,
  level integer null,
  creature_id integer not null,
  creature_name text null,
  creature_class text null,
  lastSeen datetime null,
  primary key (realm_id, creature_id)
);