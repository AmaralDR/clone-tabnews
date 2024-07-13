import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1_000,
    });
    async function fetchStatusPage() {
      try {
        console.time("fetchStatusPage");
        const response = await fetch(`${getBaseUrl()}/api/v1/status`);

        if (!response.ok) {
          throw new Error("Server Not OK");
        }
      } catch (error) {
        throw error;
      } finally {
        console.timeEnd("fetchStatusPage");
      }
    }
  }
}
function getBaseUrl() {
  return process.env.APP_BASE_URL || "http://localhost:3000";
}

export default {
  waitForAllServices,
  getBaseUrl,
};
