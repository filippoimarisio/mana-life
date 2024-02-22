export enum Mana {
  mountain = 'mountain',
  swamp = 'swamp',
  forest = 'forest',
  plains = 'plains',
  island = 'island',
  colorless = 'colorless'
}

export const colorCodes = {
  mountain: 'rgb(235, 159, 130)',
  mountain_logo: 'rgb(211, 32, 42)',
  swamp: 'rgb(166,159,157)',
  swamp_logo: 'rgb(21,11,0)',
  forest: 'rgb(196,211,202)',
  forest_logo: 'rgb(0, 115, 62)',
  plains: 'rgb(248,231,185)',
  plains_logo: 'rgb(249, 250, 244)',
  island: 'rgb(179, 206, 234)',
  island_logo: 'rgb(14, 104, 171)',
  colorless: 'rgb(215, 208, 205)',
  colorless_logo: 'rgb(215, 208, 205)'
}

export enum CounterTypes {
  life = 'life',
  poison = 'poison',
  edh = 'edh',
  storm = 'storm'
}

export enum Operations {
  plus = 'plus',
  minus = 'minus'
}

export const privacyStatement = "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits. <br/> Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits. <br/> Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits."

const ColorIdentities = {
  plains: ['plains'],
  swamp: ['swamp'],
  mountain: ['mountain'],
  island: ['island'],
  forest: ['forest'],
  dimir: ['island', 'swamp'],
  gruul: ['forest', 'mountain'],
  azorius: ['island','plains'],
  simic: ['island','forest'],
  orzhov: ['plains', 'swamp'],
  rakdos: ['swamp', 'mountain'],
  selesnya: ['plains','forest'],
  boros: ['plains','mountain'],
  golgari: ['swamp','forest'],
  izzet: ['island','mountain',],
}

export const BackgroundImages = {
  plains: require('./assets/plains-background.png'),
  swamp: require('./assets/swamp-background.png'),
  mountain: require('./assets/mountain-background.png'),
  island: require('./assets/island-background.png'),
  forest: require('./assets/forest-background.png'),
  dimir: require('./assets/dimir-background.png'),
  gruul: require('./assets/gruul-background.png'),
  azorius: require('./assets/azorius-background.png'),
  simic: require('./assets/simic-background.png'),
  orzhov: require('./assets/orzhov-background.png'),
  rakdos: require('./assets/rakdos-background.png'),
  selesnya: require('./assets/selesnya-background.png'),
  boros: require('./assets/boros-background.png'),
  golgari: require('./assets/golgari-background.png'),
  izzet: require('./assets/izzet-background.png'),
}

export const fetchBackgroundImageKey = (selectedColors: string[]) => {
  for (const key in ColorIdentities) {
    if (ColorIdentities.hasOwnProperty(key)) {
      const colorIdentity = ColorIdentities[key];
      if (selectedColors.every(color => colorIdentity.includes(color))) {
        return key;
      }
    }
  }
  return 'plains';
};

type ValueOf<T> = T[keyof T];

export enum Size {
  small = 'small',
  medium = 'medium'
}

export const scaleSize = (value: number|string, size: ValueOf<typeof Size>): number => {
  if (size === Size.medium) return Number(value)
  if (typeof value === 'string') return Math.round((Number(value) / 2))
  return Math.round(value / 2)
}
