import { Vonage } from '@vonage/server-sdk';

import { Auth } from '@vonage/auth';

const auth = new Auth({
  apiKey: "4f13d178",
  apiSecret: "a5oV4LjmKnczWiyV"
});

const vonage = new Vonage(auth);

export default vonage.sms;