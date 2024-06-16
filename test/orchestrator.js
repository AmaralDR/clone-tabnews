import retry from 'async-retry';

async function waitForAllServices() {

  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage);
    async function fetchStatusPage() {
      const response = await fetch(`${getBaseUrl()}/api/v1/status`);
      await response.json();
    }
  }
}
function getBaseUrl() {
  return process.env.APP_BASE_URL || 'http://localhost:3000';
}


export default {
  waitForAllServices,
  getBaseUrl,
}
