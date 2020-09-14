const { Helper } = codeceptjs;

class BandIdHelper extends Helper {

  waitForFrame(page, framename) {
    let fulfill;
    const promise = new Promise(x => fulfill = x);
    checkFrame();
    return promise;

    function checkFrame() {
      const frame = page.frames().find(f => f.name() === framename);
      if (frame) {
        fulfill(frame);
      } else {
        page.once('frameattached', checkFrame);
      }
    }
  }

  async getAttributeOf(frame, selector, attr) {
    return frame.$eval(selector, (el, attribute) => el.getAttribute(attribute), attr);
  }

  async loginWithBankId() {
    const page = this.helpers['Puppeteer'].page;

    // click & wait for nav - avoids race condition with promise.all
    let firstIframePromise;
    await Promise.all([
      page.waitForNavigation({waitUntil: ["networkidle0", "domcontentloaded"]}),
      firstIframePromise = this.waitForFrame(page, 'bankidredirect'),
      await page.click('#BankIDEkstern')
    ]);

    // find first iframe
    const firstIframe = await firstIframePromise;
    await page.waitForSelector('#bankidredirect', {visible: true});


    // find innermost frame
    await firstIframe.waitForSelector('#iframewrapper > iframe');
    const innerFrame = await firstIframe.childFrames()[0];

    // selectors & xpath for elements of interest
    const fnrLabelXPath = "//html/body/div[3]/div/main/div/div[5]/div/form/div[1]/label";    // label with text 'Fødselsnummer'
    const fnrLabelSelector    = "body > div.full_width_height > div > main > div > div.lm_view.padding.block_vertical_center.lm_center > div > form > div.row.label > label";    // label with text 'Fødselsnummer'

    const otpLabelXPath = "//html/body/div[3]/div/main/div/div[7]/div/form/div[1]/label";  // label with text 'Engangskode'
    const otpLabelSelector    = "body > div.full_width_height > div > main > div > div.lm_view.padding.block_vertical_center.lm_center > div > form > div.row.label > label";   // label with text 'Engangskode'
    const otpAnimDivXPath =  "//html/body/div[3]/div/main/div/div[5]"; // div that contains transition animation classes

    const pwdLabelXPath = "//html/body/div[3]/div/main/div/div[9]/div/form/div[1]/label";  // label with text 'Personlig passord'
    const pwdLabelSelector    = "body > div.full_width_height > div > main > div > div.lm_view.padding.block_vertical_center.lm_center > div > form > div.row.label > label";  // label with text 'Personlig passord'
    const pwdAnimDivXPath =  "//html/body/div[3]/div/main/div/div[7]"; // div that contains transition animation classes


    // fnr
    await innerFrame.waitForXPath(fnrLabelXPath + '[contains(string(), "Fødselsnummer")]', {visible: true});
    const fnrInputFieldId = await this.getAttributeOf(innerFrame, fnrLabelSelector, 'for');
    await innerFrame.waitForSelector('#' + fnrInputFieldId, {visible: true}); // wait for input field to be visible
    await innerFrame.type('#' + fnrInputFieldId, process.env.SP_WEB_IDPORTEN_USERNAME);

    await Promise.all([ // wait for transition animation to start and end
        innerFrame.waitForXPath(otpAnimDivXPath + "[contains(@class, 'lm_animate')]"), // animation start
        innerFrame.waitForXPath(otpAnimDivXPath + "[not(contains(@class, 'lm_animate'))]"), // animation end
        await page.keyboard.press('Enter') // trigger animation by submitting form
    ]);


    // one time password
    await innerFrame.waitForXPath(otpLabelXPath + '[contains(string(), "Engangskode")]', {visible: true});
    const otpInputFieldId = await this.getAttributeOf(innerFrame, otpLabelSelector, 'for');
    await innerFrame.waitForXPath('//*[@id="' + otpInputFieldId + '"][not(@disabled)]', {visible: true}); // wait for input field to be visible & enabled
    await innerFrame.type('#' + otpInputFieldId, process.env.SP_WEB_IDPORTEN_OTP);

    await Promise.all([ // wait for transition animation to start and end
      innerFrame.waitForXPath(pwdAnimDivXPath + "[contains(@class, 'lm_animate')]"),
      innerFrame.waitForXPath(pwdAnimDivXPath + "[not(contains(@class, 'lm_animate'))]"),
      await page.keyboard.press('Enter')
    ]);


    // password
    await innerFrame.waitForXPath(pwdLabelXPath + '[contains(string(), "Personlig passord")]', {visible: true});
    const pwdInputFieldId = await this.getAttributeOf(innerFrame, pwdLabelSelector, 'for');
    await innerFrame.waitForXPath('//*[@id="' + pwdInputFieldId + '"][not(@disabled)]', {visible: true}); // wait for input field to be visible & enabled
    await innerFrame.type('#' + pwdInputFieldId, process.env.SP_WEB_IDPORTEN_PASSWORD);
    await page.keyboard.press('Enter');

  }


}

module.exports = BandIdHelper;
