const puppeteer = require('puppeteer');
const GIFEncoder = require('gif-encoder-2');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

async function capturePresentation() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set viewport to a good presentation size
    await page.setViewport({ width: 1280, height: 720 });

    // Load the HTML file
    const htmlPath = path.join(__dirname, 'product_reveal.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    console.log('Page loaded, starting capture...');

    const frames = [];
    const frameRate = 10; // frames per second
    const totalDuration = 28000; // 28 seconds total
    const frameInterval = 1000 / frameRate;
    const totalFrames = Math.ceil(totalDuration / frameInterval);

    // Capture frames
    for (let i = 0; i < totalFrames; i++) {
        const screenshot = await page.screenshot({ type: 'png' });
        frames.push(screenshot);

        if (i % 10 === 0) {
            console.log(`Captured frame ${i + 1}/${totalFrames}`);
        }

        await new Promise(resolve => setTimeout(resolve, frameInterval));
    }

    console.log('All frames captured, encoding GIF...');

    await browser.close();

    // Create GIF
    const encoder = new GIFEncoder(1280, 720, 'neuquant', true);
    const outputPath = path.join(__dirname, 'product_reveal.gif');

    encoder.setDelay(frameInterval);
    encoder.setRepeat(0); // 0 = loop forever
    encoder.setQuality(10); // lower = better quality

    const writeStream = fs.createWriteStream(outputPath);
    encoder.createReadStream().pipe(writeStream);
    encoder.start();

    for (let i = 0; i < frames.length; i++) {
        const png = PNG.sync.read(frames[i]);
        encoder.addFrame(png.data);

        if (i % 20 === 0) {
            console.log(`Encoding frame ${i + 1}/${frames.length}`);
        }
    }

    encoder.finish();

    console.log(`GIF saved to: ${outputPath}`);
}

capturePresentation().catch(console.error);
