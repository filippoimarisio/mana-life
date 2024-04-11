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

export const privacyStatement = `Privacy Policy

Effective Date: 08/04/2024

This Privacy Policy describes how Filippo Imarisio (hereinafter referred to as "we", "us", or "our") collects, uses, and shares information when you use our mobile application (the "App"). By accessing or using the App, you agree to the terms of this Privacy Policy.

1. Information We Collect:

    a. Information Collected Automatically: When you use the App, we may automatically collect certain information about your device, including but not limited to your device model, operating system version, unique device identifiers, IP address, mobile network information, and information about how you use the App.

    b. Cookies and Similar Technologies: We may use cookies and similar tracking technologies to provide and improve the App and to deliver and analyze advertisements. You can control cookies through your browser settings and other tools.

2. Use of Information:

    a. We may use the information collected to provide and maintain the App, to improve and personalize the user experience, to analyze usage trends and preferences, and to deliver relevant advertisements.

    b. We may also use the information to comply with legal obligations, to respond to requests or inquiries from users, and to protect our rights, property, or safety or that of others.

3. Sharing of Information:

    a. We may share the information collected with third-party service providers who assist us in providing, maintaining, and analyzing the App.

    b. We may also share the information with advertising partners to deliver targeted advertisements. Please note that these third parties may use cookies and similar tracking technologies to collect information about your activity across different websites and online services.

    c. We may disclose information in response to legal process, to comply with applicable laws, to enforce our policies, to respond to claims that content violates the rights of others, or to protect the rights, property, or safety of us, our users, or the public.

4. Data Retention:

    We will retain the information collected for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

5. Third-Party Links and Services:

    The App may contain links to third-party websites, services, and advertisements that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of these third parties before providing any information to them.

6. Children's Privacy:

    The App is not directed to children under the age of 13, and we do not knowingly collect personal information from children under the age of 13. If you believe that we have collected personal information from a child under the age of 13, please contact us at the email address provided below.

7. Contact Us:

    If you have any questions or concerns about this Privacy Policy or our privacy practices, you may contact us at imarisiof@gmail.com.

8. Changes to this Privacy Policy:

    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

By using the App, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.`;

export const ColorIdentities = {
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
  temur: ['island','mountain','forest'],
  grixis: ['island','mountain','swamp'],
  jeskai: ['island','mountain','plains'],
  jund: ['swamp','forest','mountain'],
  sultai: ['swamp','forest', 'island'],
  abzan: ['swamp','forest', 'plains'],
  esper: ['island','swamp','plains'],
  mardu: ['mountain','plains','swamp'],
  naya: ['mountain','plains','forest'],
  bant: ['island','forest','plains'],
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
  temur: require('./assets/temur-background.png'),
  grixis: require('./assets/grixis-background.png'),
  jeskai: require('./assets/jeskai-background.png'),
  jund: require('./assets/jund-background.png'),
  sultai: require('./assets/sultai-background.png'),
  abzan: require('./assets/abzan-background.png'),
  esper: require('./assets/esper-background.png'),
  mardu: require('./assets/mardu-background.png'),
  naya: require('./assets/naya-background.png'),
  bant: require('./assets/bant-background.png'),
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

export const findKeyByValue = (obj, value) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key;
    }
  }
  return null; // Return null if the value is not found in the object
}

export function findColorIdentity(colors) {
  for (let key in ColorIdentities) {
    if (ColorIdentities.hasOwnProperty(key)) {
      const identity = ColorIdentities[key];
      if (arraysMatch(identity, colors)) {
        return key;
      }
    }
  }
  return null; // Return null if no match is found
}

function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      return false;
    }
  }
  return true;
}
