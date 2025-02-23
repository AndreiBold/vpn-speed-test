import { exec } from "child_process";
import { promises as fs } from "fs";
import { INPUT_FILE_PATH, OUTPUT_FILE_PATH } from "./constants";
import { VpnLocation } from "./types";

// execute shell command asyncronously
export async function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(stderr || error.message);
      else resolve(stdout.trim());
    });
  });
}

// Read and validate input JSON file
export async function readInputFile(): Promise<VpnLocation[]> {
  try {
    const data = await fs.readFile(INPUT_FILE_PATH, { encoding: "utf8" });
    const jsonData = JSON.parse(data);

    // Ensure `locations` exists and is an array
    if (!jsonData || !Array.isArray(jsonData.locations)) {
      throw new Error(
        'Invalid input file format: "locations" key is missing or not an array'
      );
    }

    // Validate each location object
    return jsonData.locations.map((loc: any) => {
      if (
        typeof loc !== "object" ||
        typeof loc.country !== "string" ||
        typeof loc.city !== "string"
      ) {
        throw new Error(
          "Invalid location format: Each location must have country and city."
        );
      }
      return { country: loc.country, city: loc.city } as VpnLocation;
    });
  } catch (error) {
    console.error("Error reading input file:", error);
    return [];
  }
}

// Write JSON results to the output file
export async function writeOutputFile(data: any): Promise<void> {
  try {
    await fs.writeFile(OUTPUT_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing output file:", error);
  }
}
