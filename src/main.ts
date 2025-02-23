import { runAverageSpeedTest } from "./speedTest";
import { HOSTNAME_INFO_CMD, OS_INFO_CMD } from "./utils/constants";
import {
  execCommand,
  readInputFile,
  writeOutputFile,
} from "./utils/operations";
import { OutputResult, VpnLocation } from "./utils/types";
import { connectToVpn, disconnectFromVpn } from "./vpn";

// Get machine details
async function getMachineInfo(): Promise<{ name: string; os: string }> {
  return {
    name: await execCommand(HOSTNAME_INFO_CMD),
    os: await execCommand(OS_INFO_CMD),
  };
}

// main function
async function main() {
  console.log("Starting VPN Speed Test...");

  const locations: VpnLocation[] = await readInputFile();
  const { name: machineName, os } = await getMachineInfo();

  console.log("Testing speed without VPN...");
  const withoutVPN = await runAverageSpeedTest();

  let results: OutputResult = {
    machineName,
    os,
    withoutVpn: `${withoutVPN.download.toFixed(2)} Mbps`,
    vpnStats: [],
  };

  for (const location of locations) {
    const locationName = `${location.country}-${location.city}`;
    console.log(`Testing VPN Speed for ${locationName}...`);

    // connect to VPN
    const connectionTime = await connectToVpn(location.country);

    // run 5 speed tests while connected and take average
    const vpnSpeed = await runAverageSpeedTest();

    // disconnect VPN
    await disconnectFromVpn();

    results.vpnStats.push({
      locationName,
      connectionTime: `${connectionTime} sec`,
      vpnSpeed: `${vpnSpeed.download.toFixed(2)} Mbps`,
    });
  }

  await writeOutputFile(results);
  console.log("Test completed. Results saved in results.json");
}

main().catch(async (error) => {
  console.error("Error executing script:", error);
});
