import { SPEEDTEST_CMD } from "./utils/constants";
import { SpeedTestResult } from "./utils/types";
import { execCommand } from "./utils/operations";

// run a single speed test
export async function runSpeedTest(
  retries: number = 3
): Promise<SpeedTestResult> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const stdout = await execCommand(SPEEDTEST_CMD);
      const result = JSON.parse(stdout);
      return {
        download: result.download / 1000000, // convert bits to Mbps
        upload: result.upload / 1000000,
        ping: result.ping,
      };
    } catch (error) {
      console.error(
        `Speedtest failed (Attempt ${attempt} of ${retries}):`,
        error
      );
      if (attempt === retries) {
        console.error("Speedtest failed after all retries.");
      }
    }
    // Wait 3 seconds before retrying
    if (attempt < retries)
      await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  return { download: 0, upload: 0, ping: 0 };
}

// run multiple speed tests and return average results
export async function runAverageSpeedTest(
  times: number = 5
): Promise<SpeedTestResult> {
  const tests = Array(times)
    .fill(null)
    .map(() => runSpeedTest());
  const results = await Promise.all(tests); // Run all tests at once

  let totalDownload = 0,
    totalUpload = 0,
    totalPing = 0;

  results.forEach(({ download, upload, ping }) => {
    totalDownload += download;
    totalUpload += upload;
    totalPing += ping;
  });

  return {
    download: totalDownload / times,
    upload: totalUpload / times,
    ping: totalPing / times,
  };
}
