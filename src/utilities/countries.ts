export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: any; // You'll need to add these flag images to your assets
}

export const countries: Country[] = [
  {
    code: 'UK',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: require('../assets/Images/UK.png'),
  },
  {
    code: 'PK',
    name: 'Pakistan',
    dialCode: '+92',
    flag: require('../assets/Images/Flag_of_Pakistan.svg.webp'),
  },
  {
    code: 'ML',
    name: 'Malta',
    dialCode: '+356',
    flag: require('../assets/Images/malta.png'),
  },
];

export const defaultCountry = countries[0];