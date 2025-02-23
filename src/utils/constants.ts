import path from "path";

export const SPEEDTEST_CMD = "speedtest --json";
export const EXPRESSVPN_CONNECT_CMD = "expressvpnctl connect";
export const EXPRESSVPN_DISCONNECT_CMD = "expressvpnctl disconnect";
export const EXPRESSVPN_STATUS_CMD = "expressvpnctl status";
export const INPUT_FILE_PATH = path.resolve(__dirname, "../../locations.json");
export const OUTPUT_FILE_PATH = path.resolve(__dirname, "../../results.json");
export const HOSTNAME_INFO_CMD = "hostname";
export const OS_INFO_CMD = "lsb_release -ds";
