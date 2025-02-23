import { readInputFile, writeOutputFile } from "../src/utils/operations";
import { promises as fs } from "fs";

jest.mock("fs", () => ({
  promises: {
    readFile: jest.fn(async () =>
      JSON.stringify({
        locations: [{ country: "Netherlands", city: "Amsterdam" }],
      })
    ),
    writeFile: jest.fn(async () => Promise.resolve()),
  },
}));

test("readInputFile should return valid locations", async () => {
  const locations = await readInputFile();
  expect(locations).toHaveLength(1);
  expect(locations[0]).toHaveProperty("country", "Netherlands");
});

test("writeOutputFile should save data without error", async () => {
  await expect(writeOutputFile({ test: "data" })).resolves.toBeUndefined();
});
