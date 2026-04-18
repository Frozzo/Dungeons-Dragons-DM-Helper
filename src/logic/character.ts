import { ALIGNMENTS, BACKGROUNDS, CLASS_SPELL_OPTIONS, CLASSES, RACES, SKILLS, SUBCLASSES, getLocalizedLabel } from "../data/characterOptions";
import { formatSpellSummary, getSpellInfo } from "../data/spellLibrary";
import { getClassCantripCount, getClassSpellCount, getClassTraitsForLevel, getSubclassTraitsForLevel } from "../data/levelProgression";
import type { Locale } from "../i18n/uiText";
import type { AbilityKey, AbilityModifiers, AbilityScores, Character, CharacterWizardDraft } from "../types/character";
import type { Player } from "../types/entity";

export const ABILITY_LABELS: Record<AbilityKey, { en: string; it: string }> = {
  str: { en: "Strength", it: "Forza" },
  dex: { en: "Dexterity", it: "Destrezza" },
  con: { en: "Constitution", it: "Costituzione" },
  int: { en: "Intelligence", it: "Intelligenza" },
  wis: { en: "Wisdom", it: "Saggezza" },
  cha: { en: "Charisma", it: "Carisma" }
};

export const ABILITY_ORDER: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];

export interface SpellSelectionRules {
  cantripsMax: number;
  spellsMax: number;
  kindLabel: string;
  note: string;
}

export interface AbilitySummaryEntry {
  ability: AbilityKey;
  score: number;
  modifier: number;
  label: string;
}

export interface StatSummaryEntry {
  label: string;
  total: number;
  modifier: number;
  proficient: boolean;
  source: string;
}

export interface SpellSummaryEntry {
  name: string;
  detail: string;
  effect: string;
  kind: "cantrip" | "spell";
}

export interface LevelUpResult {
  character: Character;
  gainedLevel: number;
  gainedHp: number;
  gainedCantrips: string[];
  gainedSpells: string[];
  gainedTraits: string[];
}

export interface CharacterSummary {
  abilityScores: AbilitySummaryEntry[];
  savingThrows: StatSummaryEntry[];
  skillChecks: StatSummaryEntry[];
  resistances: string[];
  immunities: string[];
  vulnerabilities: string[];
  advantageNotes: string[];
  disadvantageNotes: string[];
  featureNotes: string[];
  spellNotes: SpellSummaryEntry[];
}

export function makeId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function calculateAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function calculateAbilityModifiers(scores: AbilityScores): AbilityModifiers {
  return {
    str: calculateAbilityModifier(scores.str),
    dex: calculateAbilityModifier(scores.dex),
    con: calculateAbilityModifier(scores.con),
    int: calculateAbilityModifier(scores.int),
    wis: calculateAbilityModifier(scores.wis),
    cha: calculateAbilityModifier(scores.cha)
  };
}

export function calculateProficiencyBonus(level: number): number {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
}

const POINT_BUY_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9
};

const TERM_TRANSLATIONS: Record<string, { en: string; it: string }> = {
  Strength: { en: "Strength", it: "Forza" },
  Dexterity: { en: "Dexterity", it: "Destrezza" },
  Constitution: { en: "Constitution", it: "Costituzione" },
  Intelligence: { en: "Intelligence", it: "Intelligenza" },
  Wisdom: { en: "Wisdom", it: "Saggezza" },
  Charisma: { en: "Charisma", it: "Carisma" },
  Common: { en: "Common", it: "Comune" },
  Draconic: { en: "Draconic", it: "Draconico" },
  Dwarvish: { en: "Dwarvish", it: "Nanico" },
  Elvish: { en: "Elvish", it: "Elfico" },
  Gnomish: { en: "Gnomish", it: "Gnomesco" },
  Infernal: { en: "Infernal", it: "Infernale" },
  Orc: { en: "Orc", it: "Orchesco" },
  Halfling: { en: "Halfling", it: "Halfling" },
  "One extra language": { en: "One extra language", it: "Una lingua extra" },
  "One of your choice": { en: "One of your choice", it: "Una a scelta" },
  "Two of your choice": { en: "Two of your choice", it: "Due a scelta" },
  "Disguise kit": { en: "Disguise kit", it: "Kit del camuffamento" },
  "Forgery kit": { en: "Forgery kit", it: "Kit del falsario" },
  "Thieves' tools": { en: "Thieves' tools", it: "Attrezzi da scasso" },
  "One type of musical instrument": { en: "One type of musical instrument", it: "Uno strumento musicale a scelta" },
  "One type of artisan's tools": { en: "One type of artisan's tools", it: "Un tipo di attrezzi da artigiano" },
  "Land vehicles": { en: "Land vehicles", it: "Veicoli terrestri" },
  "Herbalism kit": { en: "Herbalism kit", it: "Kit da erborista" },
  "One type of gaming set": { en: "One type of gaming set", it: "Un set da gioco a scelta" },
  "Navigator's tools": { en: "Navigator's tools", it: "Strumenti da navigatore" },
  "Vehicles (water)": { en: "Vehicles (water)", it: "Veicoli acquatici" },
  "Vehicles (land)": { en: "Vehicles (land)", it: "Veicoli terrestri" },
  "Draconic Ancestry": { en: "Draconic Ancestry", it: "Ascendenza draconica" },
  "Breath Weapon": { en: "Breath Weapon", it: "Soffio" },
  "Damage Resistance": { en: "Damage Resistance", it: "Resistenza ai danni" },
  Darkvision: { en: "Darkvision", it: "Scurovisione" },
  "Dwarven Resilience": { en: "Dwarven Resilience", it: "Resilienza nanica" },
  "Dwarven Combat Training": { en: "Dwarven Combat Training", it: "Addestramento bellico nanico" },
  "Dwarven Toughness": { en: "Dwarven Toughness", it: "Robustezza nanica" },
  "Wisdom bonus": { en: "Wisdom bonus", it: "Bonus Saggezza" },
  "Dwarven Armor Training": { en: "Dwarven Armor Training", it: "Addestramento alle armature naniche" },
  "Strength bonus": { en: "Strength bonus", it: "Bonus Forza" },
  "Fey Ancestry": { en: "Fey Ancestry", it: "Ascendenza fatata" },
  Trance: { en: "Trance", it: "Trance" },
  Cantrip: { en: "Cantrip", it: "Trucchetto" },
  "Extra language": { en: "Extra language", it: "Lingua extra" },
  "Mask of the Wild": { en: "Mask of the Wild", it: "Maschera della natura" },
  "Fleet of Foot": { en: "Fleet of Foot", it: "Passo rapido" },
  "Superior Darkvision": { en: "Superior Darkvision", it: "Scurovisione superiore" },
  "Sunlight Sensitivity": { en: "Sunlight Sensitivity", it: "Sensibilita alla luce solare" },
  "Gnome Cunning": { en: "Gnome Cunning", it: "Astuzia gnomesca" },
  "Minor Illusion": { en: "Minor Illusion", it: "Illusione minore" },
  "Speak with Small Beasts": { en: "Speak with Small Beasts", it: "Parlare con piccole bestie" },
  "Artificer's Lore": { en: "Artificer's Lore", it: "Sapienza dell'artificiere" },
  Tinker: { en: "Tinker", it: "Riparatore" },
  "Skill Versatility": { en: "Skill Versatility", it: "Versatilita nelle competenze" },
  "Relentless Endurance": { en: "Relentless Endurance", it: "Tenacia implacabile" },
  "Savage Attacks": { en: "Savage Attacks", it: "Attacchi feroci" },
  Lucky: { en: "Lucky", it: "Fortunato" },
  Brave: { en: "Brave", it: "Coraggioso" },
  "Halfling Nimbleness": { en: "Halfling Nimbleness", it: "Agilita halfling" },
  "Naturally Stealthy": { en: "Naturally Stealthy", it: "Naturalmente furtivo" },
  "Stout Resilience": { en: "Stout Resilience", it: "Resilienza robusta" },
  Versatile: { en: "Versatile", it: "Versatile" },
  "Hellish Resistance": { en: "Hellish Resistance", it: "Resistenza infernale" },
  "Infernal Legacy": { en: "Infernal Legacy", it: "Retaggio infernale" },
  Rage: { en: "Rage", it: "Ira" },
  "Unarmored Defense": { en: "Unarmored Defense", it: "Difesa senza armatura" },
  "Reckless Attack": { en: "Reckless Attack", it: "Attacco spericolato" },
  "Bardic Inspiration": { en: "Bardic Inspiration", it: "Ispirazione bardica" },
  Spellcasting: { en: "Spellcasting", it: "Lancio di incantesimi" },
  "Jack of All Trades": { en: "Jack of All Trades", it: "Tuttofare" },
  "Divine Domain": { en: "Divine Domain", it: "Dominio divino" },
  "Channel Divinity": { en: "Channel Divinity", it: "Canalizzare divinita" },
  Druidic: { en: "Druidic", it: "Druidico" },
  "Wild Shape": { en: "Wild Shape", it: "Forma selvatica" },
  "Fighting Style": { en: "Fighting Style", it: "Stile di combattimento" },
  "Second Wind": { en: "Second Wind", it: "Secondo Soffio" },
  "Action Surge": { en: "Action Surge", it: "Azione impetuosa" },
  "Martial Arts": { en: "Martial Arts", it: "Arti marziali" },
  Ki: { en: "Ki", it: "Ki" },
  "Unarmored Movement": { en: "Unarmored Movement", it: "Movimento senza armatura" },
  "Divine Sense": { en: "Divine Sense", it: "Senso divino" },
  "Lay on Hands": { en: "Lay on Hands", it: "Imposizione delle mani" },
  "Divine Smite": { en: "Divine Smite", it: "Punizione divina" },
  "Favored Enemy": { en: "Favored Enemy", it: "Nemico prescelto" },
  "Natural Explorer": { en: "Natural Explorer", it: "Esploratore naturale" },
  "Sneak Attack": { en: "Sneak Attack", it: "Attacco furtivo" },
  "Thieves' Cant": { en: "Thieves' Cant", it: "Gergo dei ladri" },
  "Cunning Action": { en: "Cunning Action", it: "Azione scaltra" },
  "Sorcerous Origin": { en: "Sorcerous Origin", it: "Origine stregonesca" },
  "Font of Magic": { en: "Font of Magic", it: "Fonte di magia" },
  Metamagic: { en: "Metamagic", it: "Metamagia" },
  "Otherworldly Patron": { en: "Otherworldly Patron", it: "Patrono ultraterreno" },
  "Pact Magic": { en: "Pact Magic", it: "Magia del patto" },
  "Eldritch Invocations": { en: "Eldritch Invocations", it: "Invocazioni occulte" },
  "Arcane Recovery": { en: "Arcane Recovery", it: "Recupero arcano" },
  "Arcane Tradition": { en: "Arcane Tradition", it: "Tradizione arcana" }
};

function normalizeSkillName(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

const SKILL_ID_BY_NORMALIZED_NAME: Record<string, string> = SKILLS.reduce((acc, skill) => {
  acc[normalizeSkillName(skill.label.en)] = skill.id;
  acc[normalizeSkillName(skill.label.it)] = skill.id;
  return acc;
}, {} as Record<string, string>);

const SKILL_ABILITY_MAP: Record<string, AbilityKey> = {
  acrobatics: "dex",
  animalHandling: "wis",
  arcana: "int",
  athletics: "str",
  deception: "cha",
  history: "int",
  insight: "wis",
  intimidation: "cha",
  investigation: "int",
  medicine: "wis",
  nature: "int",
  perception: "wis",
  performance: "cha",
  persuasion: "cha",
  religion: "int",
  sleightOfHand: "dex",
  stealth: "dex",
  survival: "wis"
};

const ABILITY_ID_BY_NORMALIZED_NAME: Record<string, AbilityKey> = {
  strength: "str",
  forza: "str",
  dexterity: "dex",
  destrezza: "dex",
  constitution: "con",
  costituzione: "con",
  intelligence: "int",
  intelligenza: "int",
  wisdom: "wis",
  saggezza: "wis",
  charisma: "cha",
  carisma: "cha"
};

const SPELLCASTING_ABILITY_BY_CLASS: Record<string, AbilityKey> = {
  bard: "cha",
  cleric: "wis",
  druid: "wis",
  paladin: "cha",
  ranger: "wis",
  sorcerer: "cha",
  warlock: "cha",
  wizard: "int"
};

const TRAIT_EXPLANATIONS: Record<string, { en: string; it: string }> = {
  Darkvision: { en: "See in dim light as if it were bright light, and in darkness as if it were dim light.", it: "Vedi nella luce fioca come fosse luce piena e nel buio come luce fioca." },
  "Dwarven Resilience": { en: "You have advantage on saving throws against poison and resistance to poison damage.", it: "Hai vantaggio ai tiri salvezza contro il veleno e resistenza ai danni da veleno." },
  "Dwarven Combat Training": { en: "You are proficient with battleaxe, handaxe, light hammer, and warhammer.", it: "Hai competenza con ascia bipenne, ascia, martello leggero e martello da guerra." },
  "Dwarven Toughness": { en: "Your hit point maximum increases by 1, and again by 1 whenever you gain a level.", it: "Il tuo massimo di punti ferita aumenta di 1, e di nuovo di 1 a ogni livello ottenuto." },
  "Dwarven Armor Training": { en: "You are proficient with light and medium armor.", it: "Hai competenza con armature leggere e medie." },
  "Fey Ancestry": { en: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.", it: "Hai vantaggio ai tiri salvezza contro l'essere ammaliato e la magia non puo' addormentarti." },
  Trance: { en: "You can complete a long rest in 4 hours and remain semiconscious.", it: "Puoi completare un riposo lungo in 4 ore e resti semicosciente." },
  Cantrip: { en: "You learn one extra cantrip from the wizard spell list.", it: "Impari un trucchetto extra dalla lista del mago." },
  "Extra language": { en: "You learn one extra language.", it: "Impari una lingua extra." },
  "Mask of the Wild": { en: "You can attempt to hide even when only lightly obscured by natural phenomena.", it: "Puoi nasconderti anche se sei solo leggermente oscurato da fenomeni naturali." },
  "Fleet of Foot": { en: "Your base walking speed becomes 35 feet.", it: "La tua velocita' base a piedi diventa 35 piedi." },
  "Superior Darkvision": { en: "You can see in dim light within 120 feet as if it were bright light.", it: "Puoi vedere nella luce fioca fino a 120 piedi come se fosse luce piena." },
  "Sunlight Sensitivity": { en: "You have disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight while you, the target, or what you try to perceive is in direct sunlight.", it: "Hai svantaggio ai tiri per colpire e alle prove di Saggezza (Percezione) che si basano sulla vista quando sei in luce solare diretta." },
  "Gnome Cunning": { en: "You have advantage on Intelligence, Wisdom, and Charisma saving throws against magic.", it: "Hai vantaggio ai tiri salvezza di Intelligenza, Saggezza e Carisma contro la magia." },
  "Minor Illusion": { en: "You learn the minor illusion cantrip.", it: "Impari il trucchetto illusione minore." },
  "Speak with Small Beasts": { en: "You can communicate simple ideas with Small or smaller beasts.", it: "Puoi comunicare idee semplici con bestie Piccole o piu' piccole." },
  "Artificer's Lore": { en: "You add double your proficiency bonus to checks related to history of magic items, alchemy, and technology.", it: "Raddoppi il bonus di competenza per prove su oggetti magici, alchimia e tecnologia." },
  Tinker: { en: "You can spend time and tools to create Tiny clockwork devices.", it: "Puoi creare piccoli congegni meccanici grazie ai tuoi attrezzi." },
  "Skill Versatility": { en: "You gain proficiency in two skills of your choice.", it: "Ottieni competenza in due abilita' a scelta." },
  "Relentless Endurance": { en: "When reduced to 0 hit points, you can drop to 1 hit point instead once per long rest.", it: "Quando scendi a 0 PF, puoi invece restare a 1 PF una volta per riposo lungo." },
  "Savage Attacks": { en: "When you score a critical hit with a melee weapon attack, you roll one extra weapon damage die.", it: "Quando fai un critico con un attacco in mischia, tiri un dado danno arma extra." },
  Lucky: { en: "You can reroll a 1 on an attack roll, ability check, or saving throw.", it: "Puoi ritirare un 1 su un tiro per colpire, prova o tiro salvezza." },
  Brave: { en: "You have advantage on saving throws against being frightened.", it: "Hai vantaggio ai tiri salvezza contro l'essere spaventato." },
  "Halfling Nimbleness": { en: "You can move through the space of any creature that is of a size larger than yours.", it: "Puoi attraversare lo spazio di creature piu' grandi di te." },
  "Naturally Stealthy": { en: "You can attempt to hide behind a creature that is at least one size larger than you.", it: "Puoi tentare di nasconderti dietro una creatura almeno di una taglia piu' grande." },
  "Stout Resilience": { en: "You have advantage on saving throws against poison, and resistance to poison damage.", it: "Hai vantaggio ai tiri salvezza contro il veleno e resistenza al danno da veleno." },
  Versatile: { en: "Humans gain an extra language in this app.", it: "Gli umani ottengono una lingua extra in questa app." },
  "Hellish Resistance": { en: "You have resistance to fire damage.", it: "Hai resistenza ai danni da fuoco." },
  "Infernal Legacy": { en: "You know the thaumaturgy cantrip; later features unlock infernal spells.", it: "Conosci il trucchetto thaumaturgy; i tratti successivi sbloccano incantesimi infernali." },
  Rage: { en: "While raging, you deal extra melee damage and gain resistance to bludgeoning, piercing, and slashing damage.", it: "Quando sei in ira infliggi danni extra in mischia e hai resistenza a contundenti, perforanti e taglienti." },
  "Unarmored Defense": { en: "Your AC can be calculated from class features instead of armor.", it: "La tua CA puo' essere calcolata tramite i tratti di classe invece dell'armatura." },
  "Reckless Attack": { en: "You can gain advantage on melee weapon attacks on your turn, but attacks against you have advantage until your next turn.", it: "Puoi ottenere vantaggio agli attacchi in mischia nel tuo turno, ma i tiri contro di te hanno vantaggio fino al tuo prossimo turno." },
  "Bardic Inspiration": { en: "You can grant an ally a bonus die to add to a check, attack roll, or saving throw.", it: "Puoi dare a un alleato un dado bonus da aggiungere a prove, tiri per colpire o tiri salvezza." },
  Spellcasting: { en: "You can cast the selected cantrips and spells if you meet the class rules.", it: "Puoi lanciare i trucchetti e gli incantesimi selezionati se rispetti le regole di classe." },
  "Jack of All Trades": { en: "You add half your proficiency bonus to ability checks you are not proficient with.", it: "Aggiungi meta' del bonus competenza alle prove in cui non sei competente." },
  "Divine Domain": { en: "Your domain grants a set of domain spells and features.", it: "Il tuo dominio concede incantesimi e capacita' di dominio." },
  "Channel Divinity": { en: "You can channel divine power for domain-specific effects.", it: "Puoi incanalare potere divino per effetti specifici del dominio." },
  Druidic: { en: "You know the secret language of druids.", it: "Conosci la lingua segreta dei druidi." },
  "Wild Shape": { en: "You can transform into beasts using your class feature.", it: "Puoi trasformarti in bestie grazie al tratto di classe." },
  "Fighting Style": { en: "You gain a combat style benefit such as Defense or Archery.", it: "Ottieni un beneficio di stile di combattimento come Difesa o Tiro con l'Arco." },
  "Second Wind": { en: "Heal yourself as a bonus action.", it: "Ti curi con un'azione bonus." },
  "Action Surge": { en: "Take one extra action on your turn.", it: "Ottieni una azione extra nel tuo turno." },
  "Martial Arts": { en: "You can make unarmed strikes as a bonus action and use Dexterity for monk weapons.", it: "Puoi fare colpi senz'armi come azione bonus e usare Destrezza per le armi da monaco." },
  Ki: { en: "You spend ki points on monk techniques.", it: "Spendi punti ki per le tecniche del monaco." },
  "Unarmored Movement": { en: "Your movement speed increases while unarmored.", it: "La tua velocita' aumenta quando non indossi armatura." },
  "Divine Sense": { en: "Detect celestial, fiend, or undead presences.", it: "Individui la presenza di celestiali, immondi o non morti." },
  "Lay on Hands": { en: "Heal yourself or others with a pool of divine power.", it: "Curi te stesso o altri con una riserva di potere divino." },
  "Divine Smite": { en: "Spend spell slots to add radiant burst damage on a hit.", it: "Spendi slot incantesimo per aggiungere danni radianti esplosivi a un colpo." },
  "Favored Enemy": { en: "You gain tracking and lore benefits against chosen enemies.", it: "Ottieni benefici di tracciamento e conoscenza contro nemici scelti." },
  "Natural Explorer": { en: "You are especially effective when traveling in favored environments.", it: "Sei particolarmente efficace nel viaggio nei territori preferiti." },
  "Sneak Attack": { en: "Once per turn, you deal extra damage when you have advantage or an ally is nearby.", it: "Una volta per turno infliggi danni extra quando hai vantaggio o un alleato e' vicino." },
  "Thieves' Cant": { en: "You know the thieves' secret sign language.", it: "Conosci il linguaggio segreto dei ladri." },
  "Cunning Action": { en: "Dash, Disengage, or Hide as a bonus action.", it: "Scatta, Disingaggia o Nasconditi come azione bonus." },
  "Sorcerous Origin": { en: "Your origin grants magical bloodline features.", it: "La tua origine concede tratti di stirpe magica." },
  "Font of Magic": { en: "You gain sorcery points to fuel metamagic.", it: "Ottieni punti stregoneria per alimentare la metamagia." },
  Metamagic: { en: "You can modify spells with metamagic options.", it: "Puoi modificare gli incantesimi con opzioni di metamagia." },
  "Otherworldly Patron": { en: "Your patron grants pact features and spell flavor.", it: "Il tuo patrono concede tratti di patto e potere occulto." },
  "Pact Magic": { en: "Your spell slots recharge on a short rest.", it: "I tuoi slot si recuperano con un riposo breve." },
  "Eldritch Invocations": { en: "Choose supernatural upgrades that modify your warlock powers.", it: "Scegli potenziamenti soprannaturali che modificano i poteri del warlock." },
  "Arcane Recovery": { en: "Recover some spell slots on a short rest.", it: "Recuperi alcuni slot incantesimo con un riposo breve." },
  "Arcane Tradition": { en: "Your wizard school grants themed spell features.", it: "La tua scuola di magia concede tratti tematici." },
  "Draconic Ancestry": { en: "Choose a draconic lineage; it determines your breath and resistance theme.", it: "Scegli una discendenza draconica; determina il tema del soffio e della resistenza." },
  "Breath Weapon": { en: "You can exhale destructive energy in a cone or line, forcing a save.", it: "Puoi esalare energia distruttiva in cono o linea, costringendo a un tiro salvezza." },
  "Damage Resistance": { en: "You gain resistance to a damage type tied to your ancestry.", it: "Ottieni resistenza a un tipo di danno legato alla tua discendenza." },
  "Background Feature": { en: "Your background grants a narrative advantage and a social or exploration benefit.", it: "Il background concede un vantaggio narrativo e un beneficio sociale o esplorativo." },
  "Shelter of the Faithful": { en: "Temples of your faith give you support and shelter.", it: "I templi della tua fede ti offrono supporto e ospitalita'." },
  "False Identity": { en: "You maintain a second identity complete with documents and contacts.", it: "Mantieni una seconda identita' completa di documenti e contatti." },
  "Criminal Contact": { en: "You know how to reach the criminal underworld for information or favors.", it: "Sai come contattare il sottobosco criminale per informazioni o favori." },
  "By Popular Demand": { en: "You can usually find food and lodging among common people who admire you.", it: "Di solito trovi cibo e alloggio tra la gente comune che ti apprezza." },
  "Rustic Hospitality": { en: "Common folk tend to shelter and feed you when you are in need.", it: "La gente comune tende a offrirti rifugio e cibo quando sei in difficolta'." },
  "Guild Membership": { en: "Your guild can provide lodging, support, and professional access.", it: "La tua gilda puo' offrirti alloggio, supporto e accesso professionale." },
  Discovery: { en: "You uncovered a secret or truth that drives your story.", it: "Hai scoperto un segreto o una verita' che guida la tua storia." },
  "Position of Privilege": { en: "People of high social standing usually treat you as one of their own.", it: "Le persone di alto rango sociale ti trattano di solito come uno di loro." },
  Wanderer: { en: "You have excellent memory for terrain and can find food and water in the wild.", it: "Hai memoria eccellente dei terreni e sai trovare cibo e acqua nella natura." },
  Researcher: { en: "You know where to find lore and who to ask for it.", it: "Sai dove trovare il sapere e a chi chiederlo." },
  "Ship's Passage": { en: "You can usually secure passage on a ship for yourself and companions.", it: "Di solito puoi ottenere il passaggio su una nave per te e i tuoi compagni." },
  "Military Rank": { en: "Soldiers and allied ranks recognize your authority and status.", it: "Soldati e ranghi alleati riconoscono la tua autorita' e il tuo status." },
  "City Secrets": { en: "You know the hidden routes and contacts of urban life.", it: "Conosci i percorsi nascosti e i contatti della vita cittadina." }
};

function getModifierText(value: number): string {
  return `${value >= 0 ? "+" : ""}${value}`;
}

function getTraitExplanation(trait: string, locale: Locale): string {
  return TRAIT_EXPLANATIONS[trait]?.[locale] ?? localizeTerm(trait, locale);
}

export function resolveSkillId(skillName: string): string | null {
  return SKILL_ID_BY_NORMALIZED_NAME[normalizeSkillName(skillName)] ?? null;
}

export function resolveClassSkillOptionIds(classId: string): string[] {
  const classOption = CLASSES.find((item) => item.id === classId);
  if (!classOption) return [];
  if (classOption.skillChoices.some((choice) => choice.toLowerCase().includes("any"))) {
    return SKILLS.map((skill) => skill.id);
  }
  return classOption.skillChoices
    .map((choice) => resolveSkillId(choice))
    .filter((value): value is string => Boolean(value));
}

export function resolveBackgroundSkillIds(backgroundId: string): string[] {
  const background = BACKGROUNDS.find((item) => item.id === backgroundId);
  if (!background) return [];
  return background.skills
    .map((skillName) => resolveSkillId(skillName))
    .filter((value): value is string => Boolean(value));
}

export function getClassSkillChoiceCount(classId: string): number {
  return CLASSES.find((item) => item.id === classId)?.skillChoiceCount ?? 2;
}

export function getSubclassesForClass(classId: string) {
  return SUBCLASSES.filter((item) => item.classId === classId);
}

export function getSpellOptionsForClass(classId: string) {
  return CLASS_SPELL_OPTIONS[classId] ?? { cantrips: [], spells: [] };
}

export function getSpellSelectionRules(classId: string, level: number, modifiers: AbilityModifiers, locale: Locale = "en"): SpellSelectionRules {
  const spellcastingAbility = SPELLCASTING_ABILITY_BY_CLASS[classId];
  const spellMod = spellcastingAbility ? modifiers[spellcastingAbility] : 0;
  const cantripMax = getClassCantripCount(classId, level);
  const spellMax = getClassSpellCount(classId, level);

  if (classId === "bard") {
    return {
      cantripsMax: cantripMax,
      spellsMax: spellMax,
      kindLabel: "known",
      note: locale === "it" ? "Il bardo conosce 2 trucchetti e 4 incantesimi di 1° livello al 1° livello." : "Bards know 2 cantrips and 4 1st-level spells at level 1."
    };
  }
  if (classId === "cleric") {
    return {
      cantripsMax: cantripMax,
      spellsMax: Math.max(1, level + spellMod),
      kindLabel: "prepared",
      note: locale === "it" ? "Il chierico prepara gli incantesimi ogni giorno dalla lista del chierico; al 1° livello ha 3 trucchetti e prepara un numero di incantesimi pari a livello + modificatore di Saggezza." : "Clerics prepare spells each day from the cleric list; level 1 gives 3 cantrips and a prepared spell count based on level + Wisdom modifier."
    };
  }
  if (classId === "druid") {
    return {
      cantripsMax: cantripMax,
      spellsMax: Math.max(1, level + spellMod),
      kindLabel: "prepared",
      note: locale === "it" ? "Il druido prepara gli incantesimi ogni giorno dalla lista del druido; al 1° livello ha 2 trucchetti e prepara un numero di incantesimi pari a livello + modificatore di Saggezza." : "Druids prepare spells each day from the druid list; level 1 gives 2 cantrips and a prepared spell count based on level + Wisdom modifier."
    };
  }
  if (classId === "paladin") {
    return { cantripsMax: 0, spellsMax: 0, kindLabel: "none", note: locale === "it" ? "Il paladino non lancia incantesimi al 1° livello." : "Paladins do not cast spells at level 1." };
  }
  if (classId === "ranger") {
    return { cantripsMax: 0, spellsMax: 0, kindLabel: "none", note: locale === "it" ? "Il ranger non lancia incantesimi al 1° livello." : "Rangers do not cast spells at level 1." };
  }
  if (classId === "sorcerer") {
    return { cantripsMax: cantripMax, spellsMax: spellMax, kindLabel: "known", note: locale === "it" ? "Lo stregone conosce 4 trucchetti e 2 incantesimi di 1° livello al 1° livello." : "Sorcerers know 4 cantrips and 2 1st-level spells at level 1." };
  }
  if (classId === "warlock") {
    return { cantripsMax: cantripMax, spellsMax: spellMax, kindLabel: "known", note: locale === "it" ? "Il warlock conosce 2 trucchetti e 2 incantesimi al 1° livello." : "Warlocks know 2 cantrips and 2 spells at level 1." };
  }
  if (classId === "wizard") {
    return {
      cantripsMax: cantripMax,
      spellsMax: spellMax,
      kindLabel: "spellbook",
      note: locale === "it" ? "Il mago parte con 3 trucchetti e 6 incantesimi nel libro degli incantesimi al 1° livello; gli incantesimi preparati dipendono ancora dall'Intelligenza ogni giorno." : "Wizards start with 3 cantrips and 6 spells in the spellbook at level 1; the prepared count still depends on Intelligence each day."
    };
  }

  return { cantripsMax: 0, spellsMax: 0, kindLabel: "none", note: locale === "it" ? "Questa classe non usa la selezione di incantesimi al 1° livello." : "This class does not use spell selection at level 1." };
}

export function getCharacterSummary(character: Character, locale: Locale): CharacterSummary {
  const skillProficiencyIds = new Set(character.skillProficiencies.map((item) => resolveSkillId(item)).filter((value): value is string => Boolean(value)));
  const savingThrowIds = new Set(character.savingThrows.map((item) => ABILITY_ID_BY_NORMALIZED_NAME[normalizeSkillName(item)]).filter((value): value is AbilityKey => Boolean(value)));

  const abilityScores = ABILITY_ORDER.map((ability) => ({
    ability,
    score: character.abilityScores[ability],
    modifier: character.abilityModifiers[ability],
    label: ABILITY_LABELS[ability][locale]
  }));

  const savingThrows = ABILITY_ORDER.map((ability) => ({
    label: ABILITY_LABELS[ability][locale],
    total: character.abilityModifiers[ability] + (savingThrowIds.has(ability) ? character.proficiencyBonus : 0),
    modifier: character.abilityModifiers[ability],
    proficient: savingThrowIds.has(ability),
    source: savingThrowIds.has(ability) ? `+${character.proficiencyBonus}` : ""
  }));

  const skillChecks = SKILLS.map((skill) => {
    const ability = SKILL_ABILITY_MAP[skill.id];
    const proficient = skillProficiencyIds.has(skill.id);
    const total = character.abilityModifiers[ability] + (proficient ? character.proficiencyBonus : 0);
    return {
      label: skill.label[locale],
      total,
      modifier: character.abilityModifiers[ability],
      proficient,
      source: `${ABILITY_LABELS[ability][locale]} ${getModifierText(character.abilityModifiers[ability])}${proficient ? `, ${locale === "it" ? "competenza" : "proficient"} ${getModifierText(character.proficiencyBonus)}` : ""}`
    };
  });

  const spellNames = [...character.cantrips.map((name) => ({ name, kind: "cantrip" as const })), ...character.spells.map((name) => ({ name, kind: "spell" as const }))];
  const spellNotes = spellNames.map(({ name, kind }) => {
    const spell = getSpellInfo(name);
    return {
      name,
      kind,
      detail: spell ? formatSpellSummary(name, locale) : name,
      effect: spell ? spell.effect : ""
    };
  });

  const featureSources = [...character.raceTraits, ...character.classTraits, ...character.subclassTraits, character.backgroundFeature].filter(Boolean);
  const featureNotes = [...new Set(featureSources.map((trait) => getTraitExplanation(trait, locale)).filter(Boolean))];

  const resistances = featureNotes.filter((note) => /resist/i.test(note) || /resistenza/i.test(note));
  const immunities = featureNotes.filter((note) => /can't put you to sleep/i.test(note) || /non puo'? addormentarti/i.test(note));
  const vulnerabilities = featureNotes.filter((note) => /vulnerab/i.test(note));
  const advantageNotes = featureNotes.filter((note) => /advantage|vantaggio/i.test(note));
  const disadvantageNotes = featureNotes.filter((note) => /disadvantage|svantaggio/i.test(note));

  return {
    abilityScores,
    savingThrows,
    skillChecks,
    resistances,
    immunities,
    vulnerabilities,
    advantageNotes,
    disadvantageNotes,
    featureNotes,
    spellNotes
  };
}

function fillToLimit(current: string[], pool: string[], limit: number): string[] {
  if (limit <= 0) return [];
  const selected = [...current];
  for (const option of pool) {
    if (selected.length >= limit) break;
    if (!selected.includes(option)) {
      selected.push(option);
    }
  }
  return selected.slice(0, limit);
}

function getNewEntries(previous: string[], next: string[]): string[] {
  return next.filter((item) => !previous.includes(item));
}

export function levelUpCharacter(character: Character, _locale: Locale): LevelUpResult {
  const nextLevel = Math.min(5, character.level + 1);
  if (nextLevel === character.level) {
    return {
      character,
      gainedLevel: character.level,
      gainedHp: 0,
      gainedCantrips: [],
      gainedSpells: [],
      gainedTraits: []
    };
  }

  const classOption = CLASSES.find((item) => item.id === character.classId);
  const abilityModifiers = character.abilityModifiers;
  const newProficiencyBonus = calculateProficiencyBonus(nextLevel);
  const newHitDie = classOption?.hitDie ?? character.hitDie;
  const oldHpMax = character.hpMax;
  const newHpMax = calculateLevelHitPoints(nextLevel, newHitDie, abilityModifiers.con);
  const gainedHp = Math.max(1, newHpMax - oldHpMax);
  const oldCantrips = character.cantrips;
  const oldSpells = character.spells;
  const cantripLimit = getClassCantripCount(character.classId, nextLevel);
  const spellLimit = getClassSpellCount(character.classId, nextLevel);
  const cantripPool = getSpellOptionsForClass(character.classId).cantrips;
  const spellPool = getSpellOptionsForClass(character.classId).spells;

  const nextCantrips = fillToLimit(oldCantrips, cantripPool, cantripLimit);
  const nextSpells = fillToLimit(oldSpells, spellPool, spellLimit);

  const nextClassTraits = getClassTraitsForLevel(character.classId, nextLevel);
  const nextSubclassTraits = getSubclassTraitsForLevel(character.subclassId, nextLevel);
  const gainedTraits = getNewEntries([...character.classTraits, ...character.subclassTraits], [...nextClassTraits, ...nextSubclassTraits]);
  const armorClass = calculateArmorClassForDraft(
    {
      classId: character.classId,
      armorSlot: character.armorSlot,
      hasShield: character.hasShield
    } as CharacterWizardDraft,
    abilityModifiers
  );

  const nextCharacter: Character = {
    ...character,
    level: nextLevel,
    hitDie: newHitDie,
    proficiencyBonus: newProficiencyBonus,
    armorClass,
    hpMax: newHpMax,
    hpCurrent: character.hpCurrent + gainedHp,
    cantrips: nextCantrips,
    spells: nextSpells,
    classTraits: nextClassTraits,
    subclassTraits: nextSubclassTraits,
    updatedAt: new Date().toISOString()
  };

  return {
    character: nextCharacter,
    gainedLevel: nextLevel,
    gainedHp,
    gainedCantrips: getNewEntries(oldCantrips, nextCantrips),
    gainedSpells: getNewEntries(oldSpells, nextSpells),
    gainedTraits
  };
}

export function getSkillLabel(skillId: string, locale: Locale): string {
  const skill = SKILLS.find((item) => item.id === skillId);
  return skill ? skill.label[locale] : skillId;
}

export function localizeTerm(value: string, locale: Locale): string {
  if (TERM_TRANSLATIONS[value]) {
    return TERM_TRANSLATIONS[value][locale];
  }
  return value;
}

export function calculatePointBuySpent(scores: AbilityScores): number {
  return ABILITY_ORDER.reduce((total, key) => {
    const score = scores[key];
    const clamped = Math.max(8, Math.min(15, score));
    return total + (POINT_BUY_COST[clamped] ?? 0);
  }, 0);
}

export function clampPointBuyScore(value: number): number {
  if (Number.isNaN(value)) return 8;
  return Math.max(8, Math.min(15, value));
}

function parseHitDie(hitDie: string): number {
  const parsed = Number(hitDie.toLowerCase().replace("d", ""));
  return Number.isNaN(parsed) ? 8 : parsed;
}

function calculateLevelHitPoints(level: number, hitDie: string, conMod: number): number {
  const die = parseHitDie(hitDie);
  const firstLevel = die + conMod;
  if (level <= 1) {
    return Math.max(1, firstLevel);
  }
  const averagePerLevel = Math.floor(die / 2) + 1 + conMod;
  return Math.max(1, firstLevel + (level - 1) * averagePerLevel);
}

function calculateArmorClassForDraft(draft: CharacterWizardDraft, mods: AbilityModifiers): number {
  const armor = draft.armorSlot;
  const baseFromArmor =
    armor === "light" ? 11 + mods.dex
      : armor === "medium" ? 14 + Math.min(mods.dex, 2)
        : armor === "heavy" ? 16
          : draft.classId === "barbarian" ? 10 + mods.dex + mods.con
            : draft.classId === "monk" ? 10 + mods.dex + mods.wis
              : 10 + mods.dex;

  return baseFromArmor + (draft.hasShield ? 2 : 0);
}

export function createPlayerFromCharacter(character: Character): Player {
  return {
    id: `player-${character.id}`,
    characterId: character.id,
    name: character.name,
    classLabel: CLASSES.find((item) => item.id === character.classId)?.label.en ?? character.classId,
    subclassLabel: character.subclassName,
    armorClass: character.armorClass,
    primaryWeapon: character.primaryWeapon,
    secondaryWeapon: character.secondaryWeapon,
    initiative: 0,
    hpCurrent: character.hpCurrent,
    hpMax: character.hpMax,
    lastRoll: "",
    notes: character.notes,
    condition: "",
    healthState: "ok"
  };
}

export function buildCharacterFromDraft(draft: CharacterWizardDraft, locale: Locale): Character {
  const race = RACES.find((item) => item.id === draft.raceId);
  const subrace = race?.subraces?.find((item) => item.id === draft.subraceId);
  const classOption = CLASSES.find((item) => item.id === draft.classId);
  const subclassOption = SUBCLASSES.find((item) => item.id === draft.subclassId && item.classId === draft.classId);
  const background = BACKGROUNDS.find((item) => item.id === draft.backgroundId);

  const abilityModifiers = calculateAbilityModifiers(draft.abilityScores);
  const proficiencyBonus = calculateProficiencyBonus(draft.level);
  const armorClass = calculateArmorClassForDraft(draft, abilityModifiers);
  const hpMax = calculateLevelHitPoints(draft.level, classOption?.hitDie ?? "d8", abilityModifiers.con);
  const classTraits = getClassTraitsForLevel(draft.classId, draft.level);
  const subclassTraits = getSubclassTraitsForLevel(subclassOption?.id, draft.level);
  const spellRules = getSpellSelectionRules(draft.classId, draft.level, abilityModifiers);

  const backgroundSkillIds = resolveBackgroundSkillIds(draft.backgroundId);
  const classSkillIds = [...draft.classSkillChoices];
  const allSkillIds = [...new Set([...backgroundSkillIds, ...classSkillIds])];
  const skillProficiencies = allSkillIds.map((skillId) => getSkillLabel(skillId, locale));

  const languages = [
    ...(race?.languages ?? []).map((item) => localizeTerm(item, locale)),
    ...(background?.languages ?? []).map((item) => localizeTerm(item, locale)),
    ...draft.customLanguages.filter((item) => item.trim())
  ];

  const traits = [...(race?.traits ?? []), ...(subrace?.traits ?? [])];

  return {
    id: makeId("char"),
    name: draft.name,
    raceId: draft.raceId,
    subraceId: draft.subraceId || undefined,
    classId: draft.classId,
    backgroundId: draft.backgroundId,
    alignmentId: draft.alignmentId,
    level: draft.level,
    subclassId: subclassOption?.id,
    subclassName: subclassOption ? getLocalizedLabel(subclassOption.label, locale) : undefined,
    size: getLocalizedLabel(race?.size ?? { en: "Medium", it: "Media" }, locale),
    speed: race?.speed ?? 30,
    armorClass,
    hpCurrent: hpMax,
    hpMax,
    hitDie: classOption?.hitDie ?? "d8",
    proficiencyBonus,
    armorSlot: draft.armorSlot,
    hasShield: draft.hasShield,
    primaryWeapon: draft.primaryWeapon,
    secondaryWeapon: draft.secondaryWeapon,
    inventoryNotes: draft.inventoryNotes,
    abilityScores: draft.abilityScores,
    abilityModifiers,
    savingThrows: (classOption?.savingThrows ?? []).map((item) => localizeTerm(item, locale)),
    classSkillChoices: classSkillIds.map((skillId) => getSkillLabel(skillId, locale)),
    backgroundSkills: backgroundSkillIds.map((skillId) => getSkillLabel(skillId, locale)),
    skillProficiencies,
    tools: (background?.tools ?? []).map((item) => localizeTerm(item, locale)),
    languages,
    customLanguages: draft.customLanguages,
    raceTraits: traits.map((item) => localizeTerm(item, locale)),
    classTraits: classTraits.map((item) => localizeTerm(item, locale)),
    subclassTraits: subclassTraits.map((item) => localizeTerm(item, locale)),
    backgroundFeature: background ? getLocalizedLabel(background.feature, locale) : "",
    cantrips: draft.selectedCantrips.slice(0, spellRules.cantripsMax),
    spells: draft.selectedSpells.slice(0, spellRules.spellsMax),
    notes: draft.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function getLocalizedOptionLabel(option: { label: { en: string; it: string } }, locale: Locale): string {
  return option.label[locale];
}

export function getLocalizedAlignmentLabel(alignmentId: string, locale: Locale): string {
  const alignment = ALIGNMENTS.find((item) => item.id === alignmentId);
  return alignment ? alignment.label[locale] : alignmentId;
}
