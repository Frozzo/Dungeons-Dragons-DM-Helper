import type { Locale } from "../i18n/uiText";

export type LocalizedLabel = {
  en: string;
  it: string;
};

export interface RaceOption {
  id: string;
  label: LocalizedLabel;
  size: LocalizedLabel;
  speed: number;
  traits: string[];
  languages: string[];
  subraces?: Array<{
    id: string;
    label: LocalizedLabel;
    traits: string[];
  }>;
}

export interface ClassOption {
  id: string;
  label: LocalizedLabel;
  hitDie: string;
  savingThrows: string[];
  skillChoices: string[];
  skillChoiceCount: number;
  traits: string[];
}

export interface SubclassOption {
  id: string;
  classId: string;
  label: LocalizedLabel;
  traits: string[];
}

export interface BackgroundOption {
  id: string;
  label: LocalizedLabel;
  skills: string[];
  tools: string[];
  languages: string[];
  feature: LocalizedLabel;
}

export interface AlignmentOption {
  id: string;
  label: LocalizedLabel;
}

export interface SkillOption {
  id: string;
  label: LocalizedLabel;
}

export const SKILLS: SkillOption[] = [
  { id: "acrobatics", label: { en: "Acrobatics", it: "Acrobazia" } },
  { id: "animalHandling", label: { en: "Animal Handling", it: "Addestrare Animali" } },
  { id: "arcana", label: { en: "Arcana", it: "Arcano" } },
  { id: "athletics", label: { en: "Athletics", it: "Atletica" } },
  { id: "deception", label: { en: "Deception", it: "Inganno" } },
  { id: "history", label: { en: "History", it: "Storia" } },
  { id: "insight", label: { en: "Insight", it: "Intuizione" } },
  { id: "intimidation", label: { en: "Intimidation", it: "Intimidire" } },
  { id: "investigation", label: { en: "Investigation", it: "Indagare" } },
  { id: "medicine", label: { en: "Medicine", it: "Medicina" } },
  { id: "nature", label: { en: "Nature", it: "Natura" } },
  { id: "perception", label: { en: "Perception", it: "Percezione" } },
  { id: "performance", label: { en: "Performance", it: "Intrattenere" } },
  { id: "persuasion", label: { en: "Persuasion", it: "Persuasione" } },
  { id: "religion", label: { en: "Religion", it: "Religione" } },
  { id: "sleightOfHand", label: { en: "Sleight of Hand", it: "Rapidita di Mano" } },
  { id: "stealth", label: { en: "Stealth", it: "Furtivita" } },
  { id: "survival", label: { en: "Survival", it: "Sopravvivenza" } }
];

export const ALIGNMENTS: AlignmentOption[] = [
  { id: "lawfulGood", label: { en: "Lawful Good", it: "Legale Buono" } },
  { id: "neutralGood", label: { en: "Neutral Good", it: "Neutrale Buono" } },
  { id: "chaoticGood", label: { en: "Chaotic Good", it: "Caotico Buono" } },
  { id: "lawfulNeutral", label: { en: "Lawful Neutral", it: "Legale Neutrale" } },
  { id: "trueNeutral", label: { en: "True Neutral", it: "Neutrale" } },
  { id: "chaoticNeutral", label: { en: "Chaotic Neutral", it: "Caotico Neutrale" } },
  { id: "lawfulEvil", label: { en: "Lawful Evil", it: "Legale Malvagio" } },
  { id: "neutralEvil", label: { en: "Neutral Evil", it: "Neutrale Malvagio" } },
  { id: "chaoticEvil", label: { en: "Chaotic Evil", it: "Caotico Malvagio" } }
];

export const RACES: RaceOption[] = [
  {
    id: "dragonborn",
    label: { en: "Dragonborn", it: "Draconide" },
    size: { en: "Medium", it: "Media" },
    speed: 30,
    traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
    languages: ["Common", "Draconic"]
  },
  {
    id: "dwarf",
    label: { en: "Dwarf", it: "Nano" },
    size: { en: "Medium", it: "Media" },
    speed: 25,
    traits: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training"],
    languages: ["Common", "Dwarvish"],
    subraces: [
      { id: "hill-dwarf", label: { en: "Hill Dwarf", it: "Nano delle Colline" }, traits: ["Dwarven Toughness", "Wisdom bonus"] },
      { id: "mountain-dwarf", label: { en: "Mountain Dwarf", it: "Nano delle Montagne" }, traits: ["Dwarven Armor Training", "Strength bonus"] }
    ]
  },
  {
    id: "elf",
    label: { en: "Elf", it: "Elfo" },
    size: { en: "Medium", it: "Media" },
    speed: 30,
    traits: ["Darkvision", "Fey Ancestry", "Trance"],
    languages: ["Common", "Elvish"],
    subraces: [
      { id: "high-elf", label: { en: "High Elf", it: "Alto Elfo" }, traits: ["Cantrip", "Extra language"] },
      { id: "wood-elf", label: { en: "Wood Elf", it: "Elfo dei Boschi" }, traits: ["Mask of the Wild", "Fleet of Foot"] },
      { id: "drow", label: { en: "Drow", it: "Drow" }, traits: ["Superior Darkvision", "Sunlight Sensitivity"] }
    ]
  },
  {
    id: "gnome",
    label: { en: "Gnome", it: "Gnomo" },
    size: { en: "Small", it: "Piccola" },
    speed: 25,
    traits: ["Darkvision", "Gnome Cunning"],
    languages: ["Common", "Gnomish"],
    subraces: [
      { id: "forest-gnome", label: { en: "Forest Gnome", it: "Gnomo dei Boschi" }, traits: ["Minor Illusion", "Speak with Small Beasts"] },
      { id: "rock-gnome", label: { en: "Rock Gnome", it: "Gnomo delle Rocce" }, traits: ["Artificer's Lore", "Tinker"] }
    ]
  },
  {
    id: "half-elf",
    label: { en: "Half-Elf", it: "Mezzelfo" },
    size: { en: "Medium", it: "Media" },
    speed: 30,
    traits: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
    languages: ["Common", "Elvish", "One extra language"]
  },
  {
    id: "half-orc",
    label: { en: "Half-Orc", it: "Mezzorco" },
    size: { en: "Medium", it: "Media" },
    speed: 30,
    traits: ["Darkvision", "Relentless Endurance", "Savage Attacks"],
    languages: ["Common", "Orc"]
  },
  {
    id: "halfling",
    label: { en: "Halfling", it: "Halfling" },
    size: { en: "Small", it: "Piccola" },
    speed: 25,
    traits: ["Lucky", "Brave", "Halfling Nimbleness"],
    languages: ["Common", "Halfling"],
    subraces: [
      { id: "lightfoot-halfling", label: { en: "Lightfoot Halfling", it: "Halfling Cuoreleggero" }, traits: ["Naturally Stealthy"] },
      { id: "stout-halfling", label: { en: "Stout Halfling", it: "Halfling Robusto" }, traits: ["Stout Resilience"] }
    ]
  },
  {
    id: "human",
    label: { en: "Human", it: "Umano" },
    size: { en: "Medium", it: "Media" },
    speed: 30,
    traits: ["Versatile", "Extra language"],
    languages: ["Common", "One extra language"]
  },
  {
    id: "tiefling",
    label: { en: "Tiefling", it: "Tiefling" },
    size: { en: "Medium", it: "Media" },
    speed: 30,
    traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
    languages: ["Common", "Infernal"]
  }
];

export const CLASSES: ClassOption[] = [
  {
    id: "barbarian",
    label: { en: "Barbarian", it: "Barbaro" },
    hitDie: "d12",
    savingThrows: ["Strength", "Constitution"],
    skillChoices: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],
    skillChoiceCount: 2,
    traits: ["Rage", "Unarmored Defense"]
  },
  {
    id: "bard",
    label: { en: "Bard", it: "Bardo" },
    hitDie: "d8",
    savingThrows: ["Dexterity", "Charisma"],
    skillChoices: ["Any three"],
    skillChoiceCount: 3,
    traits: ["Bardic Inspiration", "Spellcasting"]
  },
  {
    id: "cleric",
    label: { en: "Cleric", it: "Chierico" },
    hitDie: "d8",
    savingThrows: ["Wisdom", "Charisma"],
    skillChoices: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
    skillChoiceCount: 2,
    traits: ["Spellcasting", "Divine Domain"]
  },
  {
    id: "druid",
    label: { en: "Druid", it: "Druido" },
    hitDie: "d8",
    savingThrows: ["Intelligence", "Wisdom"],
    skillChoices: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],
    skillChoiceCount: 2,
    traits: ["Druidic", "Spellcasting"]
  },
  {
    id: "fighter",
    label: { en: "Fighter", it: "Guerriero" },
    hitDie: "d10",
    savingThrows: ["Strength", "Constitution"],
    skillChoices: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],
    skillChoiceCount: 2,
    traits: ["Fighting Style", "Second Wind"]
  },
  {
    id: "monk",
    label: { en: "Monk", it: "Monaco" },
    hitDie: "d8",
    savingThrows: ["Strength", "Dexterity"],
    skillChoices: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],
    skillChoiceCount: 2,
    traits: ["Martial Arts", "Unarmored Defense"]
  },
  {
    id: "paladin",
    label: { en: "Paladin", it: "Paladino" },
    hitDie: "d10",
    savingThrows: ["Wisdom", "Charisma"],
    skillChoices: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],
    skillChoiceCount: 2,
    traits: ["Divine Sense", "Lay on Hands"]
  },
  {
    id: "ranger",
    label: { en: "Ranger", it: "Ranger" },
    hitDie: "d10",
    savingThrows: ["Strength", "Dexterity"],
    skillChoices: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],
    skillChoiceCount: 3,
    traits: ["Favored Enemy", "Natural Explorer"]
  },
  {
    id: "rogue",
    label: { en: "Rogue", it: "Ladro" },
    hitDie: "d8",
    savingThrows: ["Dexterity", "Intelligence"],
    skillChoices: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"],
    skillChoiceCount: 4,
    traits: ["Sneak Attack", "Thieves' Cant"]
  },
  {
    id: "sorcerer",
    label: { en: "Sorcerer", it: "Stregone" },
    hitDie: "d6",
    savingThrows: ["Constitution", "Charisma"],
    skillChoices: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],
    skillChoiceCount: 2,
    traits: ["Spellcasting", "Sorcerous Origin"]
  },
  {
    id: "warlock",
    label: { en: "Warlock", it: "Warlock" },
    hitDie: "d8",
    savingThrows: ["Wisdom", "Charisma"],
    skillChoices: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],
    skillChoiceCount: 2,
    traits: ["Otherworldly Patron", "Pact Magic"]
  },
  {
    id: "wizard",
    label: { en: "Wizard", it: "Mago" },
    hitDie: "d6",
    savingThrows: ["Intelligence", "Wisdom"],
    skillChoices: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"],
    skillChoiceCount: 2,
    traits: ["Spellcasting", "Arcane Recovery"]
  }
];

export const BACKGROUNDS: BackgroundOption[] = [
  { id: "acolyte", label: { en: "Acolyte", it: "Accolito" }, skills: ["Insight", "Religion"], tools: [], languages: ["Two of your choice"], feature: { en: "Shelter of the Faithful", it: "Rifugio dei Fedeli" } },
  { id: "charlatan", label: { en: "Charlatan", it: "Ciarlatano" }, skills: ["Deception", "Sleight of Hand"], tools: ["Disguise kit", "Forgery kit"], languages: [], feature: { en: "False Identity", it: "Falsa Identita" } },
  { id: "criminal", label: { en: "Criminal", it: "Criminale" }, skills: ["Deception", "Stealth"], tools: ["Thieves' tools"], languages: [], feature: { en: "Criminal Contact", it: "Contatto Criminale" } },
  { id: "entertainer", label: { en: "Entertainer", it: "Intrattenitore" }, skills: ["Acrobatics", "Performance"], tools: ["Disguise kit", "One type of musical instrument"], languages: [], feature: { en: "By Popular Demand", it: "Richiesta Popolare" } },
  { id: "folk-hero", label: { en: "Folk Hero", it: "Eroe Popolare" }, skills: ["Animal Handling", "Survival"], tools: ["One type of artisan's tools", "Land vehicles"], languages: [], feature: { en: "Rustic Hospitality", it: "Ospitalita Rustica" } },
  { id: "guild-artisan", label: { en: "Guild Artisan", it: "Artigiano di Gilda" }, skills: ["Insight", "Persuasion"], tools: ["One type of artisan's tools"], languages: ["One of your choice"], feature: { en: "Guild Membership", it: "Appartenenza alla Gilda" } },
  { id: "hermit", label: { en: "Hermit", it: "Eremita" }, skills: ["Medicine", "Religion"], tools: ["Herbalism kit"], languages: ["One of your choice"], feature: { en: "Discovery", it: "Scoperta" } },
  { id: "noble", label: { en: "Noble", it: "Nobile" }, skills: ["History", "Persuasion"], tools: ["One type of gaming set"], languages: ["One of your choice"], feature: { en: "Position of Privilege", it: "Posizione di Privilegio" } },
  { id: "outlander", label: { en: "Outlander", it: "Selvaggio" }, skills: ["Athletics", "Survival"], tools: ["One type of musical instrument"], languages: ["One of your choice"], feature: { en: "Wanderer", it: "Viandante" } },
  { id: "sage", label: { en: "Sage", it: "Saggio" }, skills: ["Arcana", "History"], tools: [], languages: ["Two of your choice"], feature: { en: "Researcher", it: "Ricercatore" } },
  { id: "sailor", label: { en: "Sailor", it: "Marinaio" }, skills: ["Athletics", "Perception"], tools: ["Navigator's tools", "Vehicles (water)"], languages: [], feature: { en: "Ship's Passage", it: "Passaggio sulla Nave" } },
  { id: "soldier", label: { en: "Soldier", it: "Soldato" }, skills: ["Athletics", "Intimidation"], tools: ["One type of gaming set", "Vehicles (land)"], languages: [], feature: { en: "Military Rank", it: "Grado Militare" } },
  { id: "urchin", label: { en: "Urchin", it: "Monello" }, skills: ["Sleight of Hand", "Stealth"], tools: ["Disguise kit", "Thieves' tools"], languages: [], feature: { en: "City Secrets", it: "Segreti della Citta" } }
];

export const SUBCLASSES: SubclassOption[] = [
  { id: "berserker", classId: "barbarian", label: { en: "Path of the Berserker", it: "Sentiero del Berserker" }, traits: ["Frenzy"] },
  { id: "totem-warrior", classId: "barbarian", label: { en: "Path of the Totem Warrior", it: "Sentiero del Guerriero Totemico" }, traits: ["Spirit Seeker", "Totem Spirit"] },
  { id: "college-lore", classId: "bard", label: { en: "College of Lore", it: "Collegio del Sapere" }, traits: ["Bonus Proficiencies", "Cutting Words"] },
  { id: "college-valor", classId: "bard", label: { en: "College of Valor", it: "Collegio del Valore" }, traits: ["Bonus Proficiencies", "Combat Inspiration"] },
  { id: "life-domain", classId: "cleric", label: { en: "Life Domain", it: "Dominio della Vita" }, traits: ["Disciple of Life", "Channel Divinity: Preserve Life"] },
  { id: "light-domain", classId: "cleric", label: { en: "Light Domain", it: "Dominio della Luce" }, traits: ["Warding Flare", "Channel Divinity: Radiance of the Dawn"] },
  { id: "moon-circle", classId: "druid", label: { en: "Circle of the Moon", it: "Circolo della Luna" }, traits: ["Combat Wild Shape", "Circle Forms"] },
  { id: "land-circle", classId: "druid", label: { en: "Circle of the Land", it: "Circolo della Terra" }, traits: ["Bonus Cantrip", "Natural Recovery"] },
  { id: "champion", classId: "fighter", label: { en: "Champion", it: "Campione" }, traits: ["Improved Critical"] },
  { id: "battle-master", classId: "fighter", label: { en: "Battle Master", it: "Maestro di Battaglia" }, traits: ["Combat Superiority", "Student of War"] },
  { id: "open-hand", classId: "monk", label: { en: "Way of the Open Hand", it: "Via della Mano Aperta" }, traits: ["Open Hand Technique"] },
  { id: "shadow", classId: "monk", label: { en: "Way of Shadow", it: "Via dell'Ombra" }, traits: ["Shadow Arts"] },
  { id: "devotion", classId: "paladin", label: { en: "Oath of Devotion", it: "Giuramento di Devozione" }, traits: ["Sacred Weapon", "Turn the Unholy"] },
  { id: "vengeance", classId: "paladin", label: { en: "Oath of Vengeance", it: "Giuramento di Vendetta" }, traits: ["Abjure Enemy", "Vow of Enmity"] },
  { id: "hunter", classId: "ranger", label: { en: "Hunter", it: "Cacciatore" }, traits: ["Hunter's Prey"] },
  { id: "beast-master", classId: "ranger", label: { en: "Beast Master", it: "Signore delle Bestie" }, traits: ["Ranger's Companion"] },
  { id: "thief", classId: "rogue", label: { en: "Thief", it: "Ladro" }, traits: ["Fast Hands", "Second-Story Work"] },
  { id: "assassin", classId: "rogue", label: { en: "Assassin", it: "Assassino" }, traits: ["Assassinate", "Infiltration Expertise"] },
  { id: "draconic", classId: "sorcerer", label: { en: "Draconic Bloodline", it: "Discendenza Draconica" }, traits: ["Dragon Ancestor", "Draconic Resilience"] },
  { id: "wild-magic", classId: "sorcerer", label: { en: "Wild Magic", it: "Magia Selvaggia" }, traits: ["Wild Magic Surge", "Tides of Chaos"] },
  { id: "fiend", classId: "warlock", label: { en: "The Fiend", it: "Il Demone" }, traits: ["Dark One's Blessing"] },
  { id: "great-old-one", classId: "warlock", label: { en: "The Great Old One", it: "Il Grande Antico" }, traits: ["Awakened Mind"] },
  { id: "evocation", classId: "wizard", label: { en: "School of Evocation", it: "Scuola di Invocazione" }, traits: ["Sculpt Spells"] },
  { id: "illusion", classId: "wizard", label: { en: "School of Illusion", it: "Scuola di Illusione" }, traits: ["Improved Minor Illusion"] }
];

export const CLASS_SPELL_OPTIONS: Record<string, { cantrips: string[]; spells: string[] }> = {
  bard: { cantrips: ["Vicious Mockery", "Minor Illusion", "Mage Hand", "Friends", "Message"], spells: ["Healing Word", "Dissonant Whispers", "Faerie Fire", "Charm Person", "Thunderwave", "Cure Wounds", "Sleep", "Tasha's Hideous Laughter"] },
  cleric: { cantrips: ["Sacred Flame", "Guidance", "Thaumaturgy", "Spare the Dying", "Light"], spells: ["Bless", "Cure Wounds", "Guiding Bolt", "Command", "Sanctuary", "Healing Word", "Detect Magic", "Inflict Wounds", "Spiritual Weapon", "Lesser Restoration"] },
  druid: { cantrips: ["Produce Flame", "Shillelagh", "Guidance", "Mending", "Poison Spray"], spells: ["Entangle", "Faerie Fire", "Cure Wounds", "Goodberry", "Healing Word", "Thunderwave", "Barkskin", "Moonbeam", "Pass without Trace", "Spike Growth"] },
  paladin: { cantrips: [], spells: ["Bless", "Shield of Faith", "Wrathful Smite", "Cure Wounds", "Divine Favor", "Aid", "Lesser Restoration", "Magic Weapon"] },
  ranger: { cantrips: [], spells: ["Hunter's Mark", "Cure Wounds", "Hail of Thorns", "Ensnaring Strike", "Speak with Animals", "Pass without Trace", "Lesser Restoration", "Spike Growth"] },
  sorcerer: { cantrips: ["Fire Bolt", "Ray of Frost", "Prestidigitation", "Acid Splash", "Light"], spells: ["Shield", "Magic Missile", "Chromatic Orb", "Burning Hands", "Sleep", "Mage Armor", "Mirror Image", "Misty Step", "Scorching Ray"] },
  warlock: { cantrips: ["Eldritch Blast", "Mage Hand", "Minor Illusion", "Chill Touch", "Poison Spray"], spells: ["Hex", "Armor of Agathys", "Hellish Rebuke", "Witch Bolt", "Charm Person", "Hold Person", "Darkness", "Misty Step"] },
  wizard: { cantrips: ["Fire Bolt", "Mage Hand", "Minor Illusion", "Light", "Ray of Frost"], spells: ["Shield", "Magic Missile", "Sleep", "Mage Armor", "Detect Magic", "Find Familiar", "Burning Hands", "Chromatic Orb", "Mirror Image", "Misty Step", "Invisibility", "Identify", "Feather Fall", "Web", "Hold Person"] }
};

export const getLocalizedLabel = (label: LocalizedLabel, locale: Locale) => label[locale];
