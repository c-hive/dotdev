import settings from "../../../settings/settings.json";

const getProxyURL = url => {
  return `${settings.proxyURL}/${url}`;
};

export default getProxyURL;
