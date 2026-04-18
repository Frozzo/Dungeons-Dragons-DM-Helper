export type SpellKind = "cantrip" | "spell";

export interface SpellInfo {
  name: string;
  kind: SpellKind;
  level?: number;
  school: string;
  range: string;
  castingTime: string;
  damage?: string;
  saveOrAttack?: string;
  effect: string;
  concentration?: boolean;
  notes?: string;
}

const SPELLS: SpellInfo[] = [
  { name: "Vicious Mockery", kind: "cantrip", school: "Enchantment", castingTime: "1 action", range: "60 ft", saveOrAttack: "WIS save", damage: "1d4 psychic", effect: "Target takes psychic damage and has disadvantage on the next attack roll before the end of its next turn." },
  { name: "Minor Illusion", kind: "cantrip", school: "Illusion", castingTime: "1 action", range: "30 ft", effect: "Create a small sound or image. Great for distractions, cover, and deception; no damage." },
  { name: "Mage Hand", kind: "cantrip", school: "Conjuration", castingTime: "1 action", range: "30 ft", effect: "Summon a spectral hand to interact with objects at a distance; no damage." },
  { name: "Friends", kind: "cantrip", school: "Enchantment", castingTime: "1 action", range: "Self", concentration: true, effect: "Gain advantage on Charisma checks against one creature for the duration; it usually becomes hostile afterward." },
  { name: "Message", kind: "cantrip", school: "Transmutation", castingTime: "1 action", range: "120 ft", effect: "Whisper a message to a target you can see; they hear it only and can reply quietly." },
  { name: "Sacred Flame", kind: "cantrip", school: "Evocation", castingTime: "1 action", range: "60 ft", saveOrAttack: "DEX save", damage: "1d8 radiant", effect: "Target takes radiant damage on a failed save; cover does not help." },
  { name: "Guidance", kind: "cantrip", school: "Divination", castingTime: "1 action", range: "Touch", concentration: true, effect: "Touched creature adds 1d4 to one ability check of its choice before the spell ends." },
  { name: "Thaumaturgy", kind: "cantrip", school: "Transmutation", castingTime: "1 action", range: "30 ft", effect: "Minor supernatural effects: booming voice, harmless tremors, flickering flames, and other flavor effects." },
  { name: "Spare the Dying", kind: "cantrip", school: "Necromancy", castingTime: "1 action", range: "Touch", effect: "A living creature at 0 HP becomes stable." },
  { name: "Light", kind: "cantrip", school: "Evocation", castingTime: "1 action", range: "Touch", effect: "Object sheds bright light for 20 feet and dim light for 20 more." },
  { name: "Produce Flame", kind: "cantrip", school: "Conjuration", castingTime: "1 action", range: "Self", damage: "1d8 fire", saveOrAttack: "ranged spell attack", effect: "Light a flame in your hand or throw it to deal fire damage at range." },
  { name: "Shillelagh", kind: "cantrip", school: "Transmutation", castingTime: "1 bonus action", range: "Self", effect: "A club or quarterstaff becomes magical and uses your spellcasting ability for attack and damage, dealing 1d8 bludgeoning." },
  { name: "Mending", kind: "cantrip", school: "Transmutation", castingTime: "1 minute", range: "Touch", effect: "Repairs a single break or tear in an object; no combat damage." },
  { name: "Poison Spray", kind: "cantrip", school: "Conjuration", castingTime: "1 action", range: "10 ft", saveOrAttack: "CON save", damage: "1d12 poison", effect: "A puff of poisonous gas deals poison damage on a failed save." },
  { name: "Fire Bolt", kind: "cantrip", school: "Evocation", castingTime: "1 action", range: "120 ft", damage: "1d10 fire", saveOrAttack: "ranged spell attack", effect: "Hurl a bolt of fire at a target." },
  { name: "Ray of Frost", kind: "cantrip", school: "Evocation", castingTime: "1 action", range: "60 ft", damage: "1d8 cold", saveOrAttack: "ranged spell attack", effect: "Deal cold damage and reduce the target's speed by 10 ft until your next turn." },
  { name: "Prestidigitation", kind: "cantrip", school: "Transmutation", castingTime: "1 action", range: "10 ft", effect: "Small magical tricks, flavor, cleaning, warming/cooling, and harmless sensory effects." },
  { name: "Acid Splash", kind: "cantrip", school: "Conjuration", castingTime: "1 action", range: "60 ft", saveOrAttack: "DEX save", damage: "1d6 acid", effect: "Two creatures within 5 feet of each other take acid damage on a failed save." },
  { name: "Eldritch Blast", kind: "cantrip", school: "Evocation", castingTime: "1 action", range: "120 ft", damage: "1d10 force", saveOrAttack: "ranged spell attack", effect: "Fire one or more beams of force; at level 1 it deals one beam of force damage." },
  { name: "Chill Touch", kind: "cantrip", school: "Necromancy", castingTime: "1 action", range: "120 ft", damage: "1d8 necrotic", saveOrAttack: "ranged spell attack", effect: "A skeletal hand deals necrotic damage and prevents healing until your next turn." },

  { name: "Healing Word", kind: "spell", level: 1, school: "Evocation", castingTime: "1 bonus action", range: "60 ft", effect: "A creature regains 1d4 + spellcasting ability modifier hit points." },
  { name: "Dissonant Whispers", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 action", range: "60 ft", saveOrAttack: "WIS save", damage: "3d6 psychic", effect: "Failed save deals psychic damage and forces the target to use its reaction to move away." },
  { name: "Faerie Fire", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "60 ft", saveOrAttack: "DEX save", effect: "Creatures in a 20-ft cube are outlined; attacks against them have advantage while the spell lasts.", concentration: true },
  { name: "Charm Person", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 action", range: "30 ft", saveOrAttack: "WIS save", effect: "Attempts to charm a humanoid target for 1 hour." },
  { name: "Thunderwave", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "Self", saveOrAttack: "CON save", damage: "2d8 thunder", effect: "A 15-foot cube of force pushes creatures away on a failed save." },
  { name: "Bless", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 action", range: "30 ft", concentration: true, effect: "Up to three creatures add 1d4 to attack rolls and saving throws while the spell lasts." },
  { name: "Cure Wounds", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "Touch", effect: "A creature regains 1d8 + spellcasting ability modifier hit points." },
  { name: "Guiding Bolt", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "120 ft", saveOrAttack: "ranged spell attack", damage: "4d6 radiant", effect: "On a hit, the next attack roll against the target before your next turn has advantage." },
  { name: "Command", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 action", range: "60 ft", saveOrAttack: "WIS save", effect: "You issue a one-word command that can force movement or action." },
  { name: "Sanctuary", kind: "spell", level: 1, school: "Abjuration", castingTime: "1 bonus action", range: "30 ft", effect: "Protect a target; enemies must save to attack it.", concentration: true },
  { name: "Inflict Wounds", kind: "spell", level: 1, school: "Necromancy", castingTime: "1 action", range: "Touch", saveOrAttack: "melee spell attack", damage: "3d10 necrotic", effect: "A melee touch attack deals heavy necrotic damage." },
  { name: "Detect Magic", kind: "spell", level: 1, school: "Divination", castingTime: "1 action", range: "Self", concentration: true, effect: "Sense magic in the area and learn its school." },
  { name: "Entangle", kind: "spell", level: 1, school: "Conjuration", castingTime: "1 action", range: "90 ft", saveOrAttack: "STR save", effect: "Plants restrain creatures in a 20-ft square until they escape or the spell ends.", concentration: true },
  { name: "Goodberry", kind: "spell", level: 1, school: "Transmutation", castingTime: "1 action", range: "Touch", effect: "Create berries that restore 1 HP each and can feed creatures." },
  { name: "Healing Word", kind: "spell", level: 1, school: "Evocation", castingTime: "1 bonus action", range: "60 ft", effect: "A creature regains 1d4 + spellcasting ability modifier hit points." },
  { name: "Barkskin", kind: "spell", level: 2, school: "Transmutation", castingTime: "1 action", range: "Touch", concentration: true, effect: "Target's AC can't be less than 16." },
  { name: "Moonbeam", kind: "spell", level: 2, school: "Evocation", castingTime: "1 action", range: "120 ft", damage: "2d10 radiant", saveOrAttack: "CON save", effect: "A pillar of light damages shapechangers and other creatures." },
  { name: "Pass without Trace", kind: "spell", level: 2, school: "Abjuration", castingTime: "1 action", range: "Self", concentration: true, effect: "You and allies near you gain +10 to Stealth checks." },
  { name: "Spike Growth", kind: "spell", level: 2, school: "Transmutation", castingTime: "1 action", range: "150 ft", concentration: true, effect: "Area becomes painful difficult terrain that deals piercing damage." },
  { name: "Shield of Faith", kind: "spell", level: 1, school: "Abjuration", castingTime: "1 bonus action", range: "60 ft", effect: "Target gains +2 AC for the duration.", concentration: true },
  { name: "Wrathful Smite", kind: "spell", level: 1, school: "Evocation", castingTime: "1 bonus action", range: "Self", damage: "1d6 psychic", effect: "Your next melee weapon hit deals psychic damage and can frighten the target." },
  { name: "Hunter's Mark", kind: "spell", level: 1, school: "Divination", castingTime: "1 bonus action", range: "90 ft", concentration: true, effect: "Your weapon hits deal +1d6 damage to the marked target and tracking becomes easier." },
  { name: "Hail of Thorns", kind: "spell", level: 1, school: "Conjuration", castingTime: "1 bonus action", range: "Self", damage: "1d10 piercing", saveOrAttack: "DEX save (area)", effect: "After a weapon hit, thorny bursts damage the target and nearby creatures on a failed save.", concentration: true },
  { name: "Ensnaring Strike", kind: "spell", level: 1, school: "Conjuration", castingTime: "1 bonus action", range: "Self", concentration: true, effect: "Your hit roots the target and deals extra damage over time." },
  { name: "Speak with Animals", kind: "spell", level: 1, school: "Divination", castingTime: "1 action", range: "Self", effect: "You can communicate simple ideas with beasts." },
  { name: "Shield", kind: "spell", level: 1, school: "Abjuration", castingTime: "1 reaction", range: "Self", effect: "Gain +5 AC until the start of your next turn, including against the triggering attack." },
  { name: "Magic Missile", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "120 ft", damage: "3 darts of 1d4 + 1 force", effect: "Each dart hits automatically; damage is split among targets or focused on one." },
  { name: "Sleep", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 action", range: "90 ft", effect: "Creatures with the lowest current hit points fall asleep until the total pool is used up or the spell ends." },
  { name: "Chromatic Orb", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "90 ft", saveOrAttack: "ranged spell attack", damage: "3d8 chosen damage type", effect: "Choose acid, cold, fire, lightning, poison, or thunder when you cast it." },
  { name: "Burning Hands", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "Self", saveOrAttack: "DEX save", damage: "3d6 fire", effect: "A cone of fire scorches creatures in front of you." },
  { name: "Mage Armor", kind: "spell", level: 1, school: "Abjuration", castingTime: "1 action", range: "Touch", effect: "A willing creature's AC becomes 13 + Dexterity modifier." },
  { name: "Find Familiar", kind: "spell", level: 1, school: "Conjuration", castingTime: "1 hour", range: "10 ft", effect: "Summon a spirit in animal form to scout and assist." },
  { name: "Mirror Image", kind: "spell", level: 2, school: "Illusion", castingTime: "1 action", range: "Self", effect: "Illusory duplicates make you harder to hit." },
  { name: "Misty Step", kind: "spell", level: 2, school: "Conjuration", castingTime: "1 bonus action", range: "Self", effect: "Teleport up to 30 feet to an unoccupied space." },
  { name: "Invisibility", kind: "spell", level: 2, school: "Illusion", castingTime: "1 action", range: "Touch", concentration: true, effect: "A creature becomes invisible until the spell ends or it attacks/casts." },
  { name: "Identify", kind: "spell", level: 1, school: "Divination", castingTime: "1 minute", range: "Touch", effect: "Learn the magical properties of a touched object or creature." },
  { name: "Feather Fall", kind: "spell", level: 1, school: "Transmutation", castingTime: "1 reaction", range: "60 ft", effect: "Slow the fall of up to five creatures so they descend safely." },
  { name: "Web", kind: "spell", level: 2, school: "Conjuration", castingTime: "1 action", range: "60 ft", concentration: true, effect: "Create sticky webs that restrain creatures in the area." },
  { name: "Hold Person", kind: "spell", level: 2, school: "Enchantment", castingTime: "1 action", range: "60 ft", concentration: true, effect: "Humanoid target is paralyzed on a failed save." },
  { name: "Tasha's Hideous Laughter", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 action", range: "30 ft", saveOrAttack: "WIS save", concentration: true, effect: "A creature falls prone and becomes incapacitated with laughter." },
  { name: "Divine Favor", kind: "spell", level: 1, school: "Evocation", castingTime: "1 bonus action", range: "Self", concentration: true, effect: "Your weapon attacks deal extra radiant damage." },
  { name: "Aid", kind: "spell", level: 2, school: "Abjuration", castingTime: "1 action", range: "30 ft", effect: "Increase max HP and current HP of up to three creatures." },
  { name: "Lesser Restoration", kind: "spell", level: 2, school: "Abjuration", castingTime: "1 action", range: "Touch", effect: "End one disease or condition like blinded or paralyzed." },
  { name: "Magic Weapon", kind: "spell", level: 2, school: "Transmutation", castingTime: "1 bonus action", range: "Touch", concentration: true, effect: "A weapon becomes magical and gains a bonus to attack and damage." },
  { name: "Wrathful Smite", kind: "spell", level: 1, school: "Evocation", castingTime: "1 bonus action", range: "Self", damage: "1d6 psychic", effect: "Your next melee weapon hit deals psychic damage and can frighten the target." },
  { name: "Charm Person", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 action", range: "30 ft", saveOrAttack: "WIS save", effect: "Attempts to charm a humanoid target for 1 hour." },
  { name: "Hold Person", kind: "spell", level: 2, school: "Enchantment", castingTime: "1 action", range: "60 ft", concentration: true, effect: "Humanoid target is paralyzed on a failed save." },
  { name: "Darkness", kind: "spell", level: 2, school: "Evocation", castingTime: "1 action", range: "60 ft", concentration: true, effect: "Creates a sphere of magical darkness that blocks sight." },
  { name: "Witch Bolt", kind: "spell", level: 1, school: "Evocation", castingTime: "1 action", range: "30 ft", concentration: true, damage: "1d12 lightning", saveOrAttack: "ranged spell attack", effect: "A crackling beam continues while you maintain concentration." },
  { name: "Hellish Rebuke", kind: "spell", level: 1, school: "Evocation", castingTime: "1 reaction", range: "60 ft", saveOrAttack: "DEX save", damage: "2d10 fire", effect: "When you are hit, you can lash back with fire; half damage on a successful save." },
  { name: "Armor of Agathys", kind: "spell", level: 1, school: "Abjuration", castingTime: "1 action", range: "Self", effect: "Gain temporary hit points; melee attackers take cold damage when they hit you." },
  { name: "Shield of Faith", kind: "spell", level: 1, school: "Abjuration", castingTime: "1 bonus action", range: "60 ft", effect: "Target gains +2 AC for the duration.", concentration: true },
  { name: "Hex", kind: "spell", level: 1, school: "Enchantment", castingTime: "1 bonus action", range: "90 ft", concentration: true, damage: "+1d6 necrotic on hit", effect: "The marked target takes extra necrotic damage from your hits and has disadvantage on one chosen ability type of checks." },
  { name: "Acid Splash", kind: "cantrip", school: "Conjuration", castingTime: "1 action", range: "60 ft", saveOrAttack: "DEX save", damage: "1d6 acid", effect: "Two creatures within 5 feet of each other take acid damage on a failed save." }
];

export const SPELL_LIBRARY: Record<string, SpellInfo> = SPELLS.reduce((acc, spell) => {
  acc[spell.name] = spell;
  return acc;
}, {} as Record<string, SpellInfo>);

export function getSpellInfo(name: string): SpellInfo | undefined {
  return SPELL_LIBRARY[name];
}

export function formatSpellSummary(name: string, locale: "en" | "it"): string {
  const spell = getSpellInfo(name);
  if (!spell) return name;

  const parts: string[] = [];
  if (spell.kind === "cantrip") {
    parts.push(locale === "it" ? "Trucchetto" : "Cantrip");
  } else if (spell.level) {
    parts.push(locale === "it" ? `Livello ${spell.level}` : `Level ${spell.level}`);
  }
  parts.push(spell.school);
  parts.push(spell.range);
  if (spell.damage) parts.push(spell.damage);
  if (spell.saveOrAttack) parts.push(spell.saveOrAttack);
  return parts.join(" · ");
}
