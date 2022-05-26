// The idea is to redefine hcaptcha.render method
// The best way to do that is to inject a script when a new page/frame is created
// You can do that with Page.addScriptToEvaluateOnNewDocument method
// https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnNewDocument
// Browser automation frameworks can have convenient wrappers for that, for example:
// https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-pageevaluateonnewdocumentpagefunction-args


// every 100 ms we check if hcaptcha object is defined
window.myInterval = setInterval(() => {
    if (window.hcaptcha) {
        console.log('hcaptcha available, lets redefine render method')
        // if hcaptcha object is defined, we save the original render method into window.originalRender
        window.originalRender = hcaptcha.render
        // then we redefine hcaptcha.render method with our function
        window.hcaptcha.render = (container, params) => {
            console.log(container)
            console.log(params)
            // storing hcaptcha callback globally
            window.hcaptchaCallback = params.callback 
            // returning the original render method call
            return window.originalRender(container, params)
        }
        clearInterval(window.myInterval)
    } else {
        console.log('hcaptcha not available yet')
    }
}, 100)

// from now we can execute the callback function like window.hcaptchaCallback('TOKEN')
// https://www.dropbox.com/s/k18somx4dkuyicl/hcaptcha.callback.mp4?dl=0
