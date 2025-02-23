import {
  EXPRESSVPN_CONNECT_CMD,
  EXPRESSVPN_DISCONNECT_CMD,
  EXPRESSVPN_STATUS_CMD,
} from "./utils/constants";
import { execCommand } from "./utils/operations";

export async function connectToVpn(
  location: string,
  maxRetries: number = 3
): Promise<number> {
  const startTime = Date.now();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Connecting to VPN (${location})... Attempt ${attempt}/${maxRetries}`
      );

      await execCommand(`${EXPRESSVPN_CONNECT_CMD} ${location}`);

      // Wait 2 seconds before checking status (VPN may take time to establish)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Verify if VPN is actually connected
      const status = await execCommand(EXPRESSVPN_STATUS_CMD);
      if (status.includes("Connected")) {
        console.log(
          `VPN connected successfully to ${location} on attempt ${attempt}`
        );
        return (Date.now() - startTime) / 1000; // Return connection time in seconds
      } else {
        console.warn(
          `VPN status check failed, retrying... (${attempt}/${maxRetries})`
        );
      }
    } catch (error) {
      console.error(
        `VPN connection failed for ${location} (Attempt ${attempt}/${maxRetries}):`,
        error
      );
    }

    // Wait 3 seconds before retrying
    if (attempt < maxRetries)
      await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  console.error(
    `Failed to connect to VPN (${location}) after ${maxRetries} attempts.`
  );
  return 15; // Return a default timeout value if VPN fails
}

// disconnect from VPN
export async function disconnectFromVpn(): Promise<void> {
  try {
    await execCommand(EXPRESSVPN_DISCONNECT_CMD);
  } catch (error) {
    console.error("Failed to disconnect from VPN:", error);
  }
}
