import config from '../agent.config.json';
export const agent = config;
export const phoneHref = `tel:${config.phone.replace(/[^+\d]/g, '')}`;
