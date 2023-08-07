const openai = require('./openaiWrapper.js');

const requestHandler = function (req, res) {

    setCORSHeaders(res);
    // res.setHeader('Content-Type', 'application/json');
  
    try {
        if (req.method === 'GET') {
            handleGETRequests(req, res);
        }
        else if (req.method === 'POST') {

            handlePOSTRequests(req, res);
        }
        else { throw new Error("UNKNOWN_REQUEST_ERROR"); } 
    } catch(error) {
        if (error.message == "UNKNOWN_REQUEST_ERROR") {
            sendResponse(res, 404, `API NOT FOUND`);
        } else {
            sendResponse(res, 500, `SERVER ERROR`);
        }
    }
  }

function sendResponse(res, responseCode, responseMessage) {
    res.writeHead(responseCode, { 'Content-Type': 'text/plain' });
    res.end(responseMessage);
}

function handlePOSTRequests(req, res) {
    let body = getRequestBody(req);

    switch (req.url) {
        case '/':
            req.on('end', () => {
                sendResponse(res, 200, 
                    `POST /: API ACTIVE.\n Payload: ${body}`
                    );
            });
            break;
        case '/chat':
            req.on('end', async () => {
                const chatGPTResponse = await openai.interactWithChatGPT(body);
                sendResponse(res, 200, 
                    `openAI response: ${chatGPTResponse}`
                    );
            });
            break;
        default:
            throw new Error("UNKNOWN_REQUEST_ERROR");
    }
}

function handleGETRequests(req, res) {
    switch (req.url) {
        case '/':
            sendResponse(res, 200, 
                `GET /: API ACTIVE.`
                );
            break;
        default:
            throw new Error("UNKNOWN_REQUEST_ERROR");
    }
}

function getRequestBody(req) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    return body;
}

function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = {
    requestHandler: requestHandler
};