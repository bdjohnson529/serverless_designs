var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-west-2" });

exports.handler = async function (event, context) {
  var source = "bdjohnson529@gmail.com";
  var destination = "bdjohnson529@gmail.com";
  var subject = "Test email from AWS";
  var body_text = JSON.parse(event.body).body_text;
  var body_html = JSON.parse(event.body).body_html;

  var params = constructEmailParams(source, destination, subject, body_text, body_html);
 
  await ses.sendEmail(params).promise();

  const response = {
      statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST"
        },
      body: JSON.stringify("Succesfully sent email")
  };
  
  return response;
}

function constructEmailParams(source, destination, subject, body_text, body_html) {
  if(body_html) {
    var body = { Text: { Data: body_text }, Html: { Data: body_html } }
  } else {
    var body = { Text: { Data: body_text } }
  }
      
  var params = {
    Destination: {
      ToAddresses: [destination],
    },
    Message: {
      Body: body,
      Subject: { Data: subject },
    },
    Source: source,
  };
  
  return params;
}