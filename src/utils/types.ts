export interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
}

export interface VpnLocation {
  country: string;
  city: string;
}

export interface OutputResult {
  machineName: string;
  os: string;
  withoutVpn: string;
  vpnStats: {
    locationName: string;
    connectionTime: string;
    vpnSpeed: string;
  }[];
}
