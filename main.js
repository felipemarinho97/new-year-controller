const express = require('express')
const app = express()
const port = 3000
const { Builder, By, Key, promise, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

var os = require( 'os' );

var fs = require('fs');
var index = fs.readFileSync('index.html');
var controller = fs.readFileSync('controller.js', 'utf8');

var networkInterfaces = os.networkInterfaces( );
var ip = networkInterfaces['enp3s0'][0]['address'] 

let driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(/* ... */)
    .build();

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
})

app.get('/controller.js', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/javascript'});    
    res.end(controller.replace(/localhost/g, ip));
})

app.get('/pesquisar', (req, res) => {
    driver.get(`https://www.youtube.com/results?search_query=${req.param('query')}&sp=EgIQAQ%253D%253D`)

    fillResultsVideosWithNumbers(3000)

    return res.send({ status: 'OK' })
})

app.get('/escolher', (req, res) => {
    const videoSuggestions= `/html[1]/body[1]/ytd-app[1]/div[1]/ytd-page-manager[1]/ytd-watch-flexy[1]/div[3]/div[2]/div[1]/div[2]/ytd-watch-next-secondary-results-renderer[1]/div[2]/ytd-compact-video-renderer[${req.param('num')}]/div[1]/a[1]/h3[1]/span[1]`
    const searchResults = `/html[1]/body[1]/ytd-app[1]/div[1]/ytd-page-manager[1]/ytd-search[1]/div[1]/ytd-two-column-search-results-renderer[1]/div[1]/ytd-section-list-renderer[1]/div[2]/ytd-item-section-renderer[1]/div[2]/ytd-video-renderer[${req.param('num')}]/div[1]`;

    element = driver.findElement(By.xpath(searchResults))
    element.click()

    element = driver.findElement(By.xpath(videoSuggestions))
    element.click()

    fillSugestionVideosWithNumbers(3000);

    return res.send({ status: 'OK' })
})

app.get('/tela-cheia', (req, res) => {

    try {
        driver.switchTo().frame(driver.findElement(
            By.xpath('//iframe[starts-with(@src, "https://www.youtube.com/embed")]')))
            .catch((err) => console.log("erro"))
    } catch (e) {
    }

    driver.findElement(By.xpath(`//button[@class='ytp-fullscreen-button ytp-button']`))
      .then(function (element) {
        driver.wait(function () {
            return element.isDisplayed().then(function (displayed) {
                if (!displayed)
                    return false;
    
                return element.isEnabled();
            });
        });
        // element.sendKeys('webdriver');
        // console.log("clicavel");
        
    });

    driver.wait(until.elementLocated(
        By.xpath(`//button[@class='ytp-fullscreen-button ytp-button']`)
    )).then((el) => {

            // element = driver.findElement(
            //     By.xpath(
            //         `//button[@class='ytp-fullscreen-button ytp-button']`))
                
            el.click();
        })
    

    return res.send({ status: 'OK' })
})

app.get('/prox', (req, res) => {

    try {
    driver.switchTo().frame(driver.findElement(
        By.xpath('//iframe[starts-with(@src, "https://www.youtube.com/embed")]')))
    } catch (e) {
        
    }

    driver.findElement(By.xpath(`//div[@class='ytp-left-controls']//a[@class='ytp-next-button ytp-button']`))
      .then(function (element) {
        driver.wait(function () {
            return element.isDisplayed().then(function (displayed) {
                if (!displayed)
                    return false;
    
                return element.isEnabled();
            });
        });
        // element.sendKeys('webdriver');
        // console.log("clicavel");
        
    });

    driver.wait(until.elementLocated(
        By.xpath(`//div[@class='ytp-left-controls']//a[@class='ytp-next-button ytp-button']`)
    )).then((el) => {

            // element = driver.findElement(
            //     By.xpath(
            //         `//button[@class='ytp-fullscreen-button ytp-button']`))
                
            el.click();
        })
    

    return res.send({ status: 'OK' })
})

app.get('/proximo', (req, res) => {
    
    element = driver.findElement(
        By.xpath(
            `/html[1]/body[1]/ytd-app[1]/div[1]/ytd-page-manager[1]/ytd-watch-flexy[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/ytd-player[1]/div[1]/div[1]/div[23]/div[2]/div[1]/a[2]`))
        
    element.click()

    return res.send({ status: 'OK' })
})

app.get('/scroll', (req, res) => {
    let direction = req.param('direction') === 'up' ? '-' : '+';
    
    driver.executeScript(`window.scrollBy(0,${direction}150)`)

    return res.send({ status: 'OK' })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!\nRunning on network ${ip}`))
function fillSugestionVideosWithNumbers(timeout) {
    driver.sleep(timeout).then(() => {
        for (let i = 0; i < 11; i++) {
            const indicator = `<span style="background: #ff5959;width: 30px;height: 24px;position: absolute;border-radius: 1em;text-align: center;color: white;font-weight: bold;left: 5px;top: 5px;padding-top: 6px;">${i}</span>`
            const videoSuggestion = `/html[1]/body[1]/ytd-app[1]/div[1]/ytd-page-manager[1]/ytd-watch-flexy[1]/div[3]/div[2]/div[1]/div[2]/ytd-watch-next-secondary-results-renderer[1]/div[2]/ytd-compact-video-renderer[${i}]/div[1]/a[1]/h3[1]/span[1]`;
            let timeElement = driver.findElement(By.xpath(videoSuggestion));
            timeElement.getAttribute('title').then((value) => {
                driver.executeScript(`arguments[0].innerHTML = '${indicator + value}';`, timeElement);
            });
        }
    });
}

function fillResultsVideosWithNumbers(timeout) {
    driver.sleep(timeout).then(() => {
        for (let i = 0; i < 11; i++) {
            const indicator = `<span style="background: #ff5959;width: 30px;height: 24px;position: absolute;border-radius: 1em;text-align: center;color: white;font-weight: bold;left: 5px;top: 5px;padding-top: 6px;">${i}</span>`
            const resultVideo = `/html[1]/body[1]/ytd-app[1]/div[1]/ytd-page-manager[1]/ytd-search[1]/div[1]/ytd-two-column-search-results-renderer[1]/div[1]/ytd-section-list-renderer[1]/div[2]/ytd-item-section-renderer[1]/div[2]/ytd-video-renderer[${i}]/div[1]/div[1]/div[1]/div[1]/h3[1]/a[1]`;
            let timeElement = driver.findElement(By.xpath(resultVideo));
            timeElement.getAttribute('title').then((value) => {
                driver.executeScript(`arguments[0].innerHTML = '${indicator + value}';`, timeElement);
            });
        }
    });
}
