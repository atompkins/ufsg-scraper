const sqlite3 = require('sqlite3').verbose();

let db;
let statement;

const toParam = ([key, value]) => [`$${key}`, value];

function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS item (
      id               integer primary key
    , name             text    null
    , rarity           text    null
    , Type             text    null
    , Level            integer null
    , Attack           integer null
    , Defense          integer null
    , Armor            integer null
    , Damage           integer null
    , HP               integer null
    , XPGain           integer null
    , Stamina          integer null
    , StaminaGain      integer null
    , GoldGain         integer null
    , Banishment       integer null
    , BeastSlayer      integer null
    , Breaker          integer null
    , CriticalHit      integer null
    , Disarm           integer null
    , Dodge            integer null
    , Duelist          integer null
    , EliteHunter      integer null
    , FirstStrike      integer null
    , FuryCaster       integer null
    , GlorySeeker      integer null
    , GreenskinSlayer  integer null
    , Holy             integer null
    , Hypnotize        integer null
    , MasterBlacksmith integer null
    , MasterCrafter    integer null
    , MasterInventor   integer null
    , MasterThief      integer null
    , Nullify          integer null
    , Oceanic          integer null
    , PiercingStrike   integer null
    , ProtectGold      integer null
    , Protection       integer null
    , ReinforcedArmor  integer null
    , Soulless         integer null
    , Sustain          integer null
    , TemporalShift    integer null
    , Thievery         integer null
    , craftAttack      integer null
    , craftDefense     integer null
    , craftArmor       integer null
    , craftDamage      integer null
    , craftHP          integer null
    , craftXPGain      integer null
    , craftStamina     integer null
    , craftGoldGain    integer null
    , setName          text    null
    , setAttack        integer null
    , setDefense       integer null
    , setArmor         integer null
    , setDamage        integer null
    , setHP            integer null
    , setXPGain        integer null
    , setStamina       integer null
    , setStaminaGain   integer null
    , setGoldGain      integer null
    , setBanishment       integer null
    , setBeastSlayer      integer null
    , setBreaker          integer null
    , setCriticalHit      integer null
    , setDisarm           integer null
    , setDodge            integer null
    , setDuelist          integer null
    , setEliteHunter      integer null
    , setFirstStrike      integer null
    , setFuryCaster       integer null
    , setGlorySeeker      integer null
    , setGreenskinSlayer  integer null
    , setHoly             integer null
    , setHypnotize        integer null
    , setMasterBlacksmith integer null
    , setMasterCrafter    integer null
    , setMasterInventor   integer null
    , setMasterThief      integer null
    , setNullify          integer null
    , setOceanic          integer null
    , setPiercingStrike   integer null
    , setProtectGold      integer null
    , setProtection       integer null
    , setReinforcedArmor  integer null
    , setSoulless         integer null
    , setSustain          integer null
    , setTemporalShift    integer null
    , setThievery         integer null
    , lastSeen            datetime null
  )`);
}

function prepareStmt() {
  statement = db.prepare(`REPLACE INTO item (
      id
    , name
    , rarity
    , Type
    , Level
    , Attack
    , Defense
    , Armor
    , Damage
    , HP
    , XPGain
    , Stamina
    , StaminaGain
    , GoldGain
    , Banishment
    , BeastSlayer
    , Breaker
    , CriticalHit
    , Disarm
    , Dodge
    , Duelist
    , EliteHunter
    , FirstStrike
    , FuryCaster
    , GlorySeeker
    , GreenskinSlayer
    , Holy
    , Hypnotize
    , MasterBlacksmith
    , MasterCrafter
    , MasterInventor
    , MasterThief
    , Nullify
    , Oceanic
    , PiercingStrike
    , ProtectGold
    , Protection
    , ReinforcedArmor
    , Soulless
    , Sustain
    , TemporalShift
    , Thievery
    , craftAttack
    , craftDefense
    , craftArmor
    , craftDamage
    , craftHP
    , craftXPGain
    , craftStamina
    , craftGoldGain
    , setName
    , setAttack
    , setDefense
    , setArmor
    , setDamage
    , setHP
    , setXPGain
    , setStamina
    , setStaminaGain
    , setGoldGain
    , setBanishment
    , setBeastSlayer
    , setBreaker
    , setCriticalHit
    , setDisarm
    , setDodge
    , setDuelist
    , setEliteHunter
    , setFirstStrike
    , setFuryCaster
    , setGlorySeeker
    , setGreenskinSlayer
    , setHoly
    , setHypnotize
    , setMasterBlacksmith
    , setMasterCrafter
    , setMasterInventor
    , setMasterThief
    , setNullify
    , setOceanic
    , setPiercingStrike
    , setProtectGold
    , setProtection
    , setReinforcedArmor
    , setSoulless
    , setSustain
    , setTemporalShift
    , setThievery
    , lastSeen
  )
  VALUES (
      $id
    , $name
    , $rarity
    , $Type
    , $Level
    , $Attack
    , $Defense
    , $Armor
    , $Damage
    , $HP
    , $XPGain
    , $Stamina
    , $StaminaGain
    , $GoldGain
    , $Banishment
    , $BeastSlayer
    , $Breaker
    , $CriticalHit
    , $Disarm
    , $Dodge
    , $Duelist
    , $EliteHunter
    , $FirstStrike
    , $FuryCaster
    , $GlorySeeker
    , $GreenskinSlayer
    , $Holy
    , $Hypnotize
    , $MasterBlacksmith
    , $MasterCrafter
    , $MasterInventor
    , $MasterThief
    , $Nullify
    , $Oceanic
    , $PiercingStrike
    , $ProtectGold
    , $Protection
    , $ReinforcedArmor
    , $Soulless
    , $Sustain
    , $TemporalShift
    , $Thievery
    , $craftAttack
    , $craftDefense
    , $craftArmor
    , $craftDamage
    , $craftHP
    , $craftXPGain
    , $craftStamina
    , $craftGoldGain
    , $setName
    , $setAttack
    , $setDefense
    , $setArmor
    , $setDamage
    , $setHP
    , $setXPGain
    , $setStamina
    , $setStaminaGain
    , $setGoldGain
    , $setBanishment
    , $setBeastSlayer
    , $setBreaker
    , $setCriticalHit
    , $setDisarm
    , $setDodge
    , $setDuelist
    , $setEliteHunter
    , $setFirstStrike
    , $setFuryCaster
    , $setGlorySeeker
    , $setGreenskinSlayer
    , $setHoly
    , $setHypnotize
    , $setMasterBlacksmith
    , $setMasterCrafter
    , $setMasterInventor
    , $setMasterThief
    , $setNullify
    , $setOceanic
    , $setPiercingStrike
    , $setProtectGold
    , $setProtection
    , $setReinforcedArmor
    , $setSoulless
    , $setSustain
    , $setTemporalShift
    , $setThievery
    , current_timestamp
  )`);
}

function initSql() {
  db = new sqlite3.Database('data.sqlite');
  db.serialize(() => {
    createTable();
    prepareStmt();
  });
}

function sqlWriter(parsedItem) {
  statement.run(Object.fromEntries(Object.entries(parsedItem).map(toParam)));
}

function closeSql() {
  statement.finalize();
  db.close();
}

module.exports = { closeSql, initSql, sqlWriter };
