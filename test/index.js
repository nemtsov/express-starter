const requireDirectory = require('require-directory');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSinon = require('sinon-chai');

chai.should();
chai.use(chaiHttp);
chai.use(chaiSinon);

const ENV_VARS = {
  BCRYPT_ROUNDS: 8,
  JWT_PRIVATE_KEY: `
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAqZWtiqDPE919zt7PVKSGmFGviO4a0T0zET13U4bi3fnmWWDH
OMPn/Epi6PCWuTAs7VRddtRGQoI/Rs2dLUpZSgxD8id/2Iv7mbGoHVIqqItMN0C1
55i/B9/eTn5r5Tbi7SEl+FtOZzvrw86erhPMPHtaawrQiLj/eoOsx7pIzy78VGrx
EHBpJ3tUWt4NFPffig2hM7df8xPOvbkcRkZqPZk8P+SiwxGSpIIwSwNG7sJfpJx9
tSmhPg0pyr8kjUDKHhr3Di5cbZAWqtF7gctOlVLyMwzhwRPiQuDaSqCNsTEEYa7l
RvyShFojJKa/9ReKfW4aF3R2o2W3xpIfbN5G8wIDAQABAoIBAHeFpNBl0k0f+IGL
C/mOE8bbG6qYlpIOXiWyep2GHfNxI+aujPr3KFPqYZfnqXNP/vouUclkhzhs8AgI
9tRq6E+GIYVUTYjj8Co8yk4QETzFIKx4kTxvrYPxRo9wDr94Vavnhwlp4PJlix9w
SupJzdJ65hk3gA48xOMmVupV4ucSAtF5bGkdlzKYxuTeQZWGVHVsyYNpuFcIFO4H
aRPO3tBEunNvHtkEX+SIGTSX+nu3tyStTszvNnrf8PqR5i9jcVj7bEJgvAESg2Yy
TB3Pk93D2uMehODe4JSYGgCNyGapzK/LTqm7l66kO1FLv174ttj9GfdJWgAzmaog
3MofNXECgYEA0nhFSTrSLR7u05cZ4LXNgVFeQCIF0o1tkKFAgPIE6BEAQ5XQKSNr
OIf0rIEwFwWhwJeKrPp0NbsvHwjBVRsPLmycisNmqe11jSjLTKZRbZYSMzq16xCA
0bHlXg3OTzP/ZDDEEZsx8eQbjOu3PZ/SRZk+vtkj9fkMl7utC8Ebw48CgYEAzkU0
wOep9dgnRQrmtelKs7rSs2TJ0WiHcEecVmi6wpHY51O7oUt6L4qcwfVWM6XahGbA
xGyM/IUmAR9Uln9A6XjTKIWLncjFkhg2NgoiEW33y1XMNLvh1dTqmZ6OSjbQ+KBt
zO/Zj8xUH9/MShuV6TNlbAusJ4lGFR1WNnimBF0CgYEAmdusItVqMevsASfzle6x
dXirIsz8Xqhe0RzgT6Mc7R0IiV+qVXh7+E6DEdw68ImAbo8ZpExOyby1vMUkt/dZ
CMIDSfmAQnbBuVh6DeWDn03WrjacKGPfF+wpVbFYAVRsvaxcmNZQE5mCfmkOgnEk
QRa+5LtN65GNoBplbTNU/YcCgYEAp9QBTy9uxxvfH7r16m7tm/zW8KWB28Nr53ws
hNXjlunqDJXBZUQvHz1tvBZs08sPV4jvMSKNN+zx9hnSzjytyQjI7gByj6fKsMrI
WQG3pGzQH/4oD4QLBNufIeyzI0kkkBagIA3K+8gpbmG+K1H0kHCEBfwdT3HOtuFO
wzU5BvUCgYEAx93qgenk7gMn+fYTEGetHX66BxaXcIq3mxVp/9sf7vR4k4KB9Oxq
TkpZ0WiXfXySp8cEJru74nxBurA3aRnk9fIGESsUvgnqhBXhOWiIU4xp+X4KCkXU
U8MRAEWARu0MCYEseuKBUI1DxDD5MlbuwCxylBO74alCSuUVoONdKf8=
-----END RSA PRIVATE KEY-----
`,
  JWT_PUBLIC_KEY: `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAqZWtiqDPE919zt7PVKSGmFGviO4a0T0zET13U4bi3fnmWWDHOMPn
/Epi6PCWuTAs7VRddtRGQoI/Rs2dLUpZSgxD8id/2Iv7mbGoHVIqqItMN0C155i/
B9/eTn5r5Tbi7SEl+FtOZzvrw86erhPMPHtaawrQiLj/eoOsx7pIzy78VGrxEHBp
J3tUWt4NFPffig2hM7df8xPOvbkcRkZqPZk8P+SiwxGSpIIwSwNG7sJfpJx9tSmh
Pg0pyr8kjUDKHhr3Di5cbZAWqtF7gctOlVLyMwzhwRPiQuDaSqCNsTEEYa7lRvyS
hFojJKa/9ReKfW4aF3R2o2W3xpIfbN5G8wIDAQAB
-----END RSA PUBLIC KEY-----
`,
  JWT_ISSUER: 'express-server-test',
};

Object.keys(ENV_VARS).forEach(key => process.env[key] = ENV_VARS[key]);

requireDirectory(module, '../lib', { exclude: /app\.js$/ })
