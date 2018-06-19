Using the following example

https://medium.com/prismapp/10-steps-how-to-automate-your-api-testing-effectively-af866fba942f

# Install
cd web-be-tests
npm install -g mocha
npm install

# run tests
cd web-be-tests
npm start

or

cd web-be-tests
JUNIT_REPORT_PATH=test-result/result.xml JUNIT_REPORT_STACK=1 mocha --timeout 25000 --colors --reporter mocha-jenkins-reporter

# un specific test:
mocha --grep create-credential
mocha --grep validate-username-email
 
