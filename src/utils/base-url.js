import { getSystemInfo } from './system';

let ENV = 'prod';


export const getBaseMCUrl = async () => {
  if (!ENV) {
    const { app } = await getSystemInfo();
    ENV = app === 'Tiki' ? 'prod' : 'dev';
  }

  return {
    dev: 'https://quangnt1702.ml/api/v1/',
    prod: 'https://quangnt1702.ml/api/v1/',
  }[ENV];
};
export const getBaseUrl = async () => {
  if (!ENV) {
    const { app } = await getSystemInfo();
    ENV = app === 'Tiki' ? 'prod' : 'dev';
  }

  return {
    dev: 'https://api.tala.xyz/tiniapp-open-api',
    prod: 'https://api.tiki.vn/tiniapp-open-api',
  }[ENV];
};

export const getGraphqlBaseUrl = async () => {
  if (!ENV) {
    const { app } = await getSystemInfo();
    ENV = app === 'Tiki' ? 'prod' : 'dev';
  }

  return {
    dev: 'https://api.tala.xyz/tiniapp-open-api',
    prod: 'https://api.tiki.vn/tiniapp-open-api',
  }[ENV];
};
