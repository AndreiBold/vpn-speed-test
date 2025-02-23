import { runSpeedTest, runAverageSpeedTest } from "../src/speedTest";

jest.mock("../src/utils/operations", () => ({
  execCommand: jest.fn(async () =>
    JSON.stringify({
      download: 50000000, // 50 Mbps in bits
      upload: 10000000, // 10 Mbps in bits
      ping: 20,
    })
  ),
}));

test("runSpeedTest should return correct Mbps values", async () => {
  const result = await runSpeedTest();
  expect(result.download).toBeCloseTo(50); // 50 Mbps
  expect(result.upload).toBeCloseTo(10); // 10 Mbps
  expect(result.ping).toBe(20);
});

test("runAverageSpeedTest should correctly average results", async () => {
  const result = await runAverageSpeedTest(3);
  expect(result.download).toBeCloseTo(50);
  expect(result.upload).toBeCloseTo(10);
  expect(result.ping).toBe(20);
});
