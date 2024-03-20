import { Resend } from 'resend';

const resend = new Resend('re_bm3wiLuG_5WDWVj9V4UVSe5evbCFsnw7b');

(async function() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'saquibshahid508@gmail.com',
    subject: 'Hello World',
    html: '<strong>it works!</strong>'
  });

  if (error) {
    return console.log(error);
  }

  console.log(data);
})();