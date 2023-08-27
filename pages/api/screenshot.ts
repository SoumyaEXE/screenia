import type { NextApiRequest, NextApiResponse } from "next";
import chromium from "chrome-aws-lambda";

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    // running locally
    const puppeteer = require("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1920,
      height: 1000,
    },
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { url, type = "png", download = false, fullscreen = false } = req.query;

  const outPut = { type, fullPage: fullscreen };

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }
  let browser = null;

  try {
    browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.goto(url as string);
    await delay(6000); // Delay of 3 seconds before taking the screenshot
    const screenshot = await page.screenshot(outPut);

    if (download) {
      res.status(200).send(screenshot);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", `image/${type}`);
      res.end(screenshot);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}