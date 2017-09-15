/**
Title: Telegram bot 
Author: uday
Date: 09-01-2017
Date modified:
Description: The index.js file will subscribe to telegram setup and as soon as msg received by bot we will respond if commands are defined 
*/
// initializing modules 
const Telegraf = require('telegraf')
const Markup= require('markup')
const fs = require('fs')
const app = new Telegraf('<bot token>')  // const app = new Telegraf('404540093:AAFq0uGY95GCZ68BIXcnyUBi7e85d6_Msj4') 

// below syntax to set commands into bot memory
app.command('Start', ({ from, reply }) => {
  console.log('start', from)
  return reply('Welcome!')
})

// bot on sending the sticker   and reply with emoji 
app.on('sticker', (ctx) => ctx.reply('👍'))
// bot hears to the word  and reply to user with msg its case sensitive
app.hears('Uday', ({ from, reply }) => { 
  return reply('Na na i am his personal bot. working under him for money. and my boss is busy so he told me to interact with you')
})
app.hears('Hi', (ctx) => ctx.reply('Hey there!'))
app.hears('Are you uday?', (ctx) => ctx.reply('Na na i am his personal bot. working under him for money.'))
app.hears('Bandita', (ctx) => ctx.reply('👍 I knew her she is vmoksha DB abmin correct?'))
app.hears('Correct', (ctx) => ctx.reply('Thank you.'))
app.hears('Poulami', (ctx) => ctx.reply('I knew her she is current Uday Manager.... Hee.. Heee..'))
app.hears('More about poulami', (ctx) => ctx.reply('Poulami Banerjee has an extensive 14+ years of experience in Digital Marketing, Pre-Sales, Business Analyst, Competencies building, Program & Project Management, and Project Delivery. She has initiated Digital Marketing at Vmoksha and pilot the team in delivering tailor-made services integrating emerging trends and give clients a competitive edge to succeed. Her multi-disciplinary skills and expertise helped Vmoksha in streamlining the complex business operations and reinforces the team in addressing the critical challenges. Since her joining in 2013, she has always been an active part of Vmoksha processes in building products, Competencies building, Internal applications, Blogging initiatives, Business Systems Analysis, Pre-Sales & Proposals writing. She is a key member of Information Security Forum (ISF) team and assisted the team multiple times in achieving ISO 27001 Certification and recertification from 2015 and is also commendable in mentoring junior team members. '))
app.hears('More about ciby', (ctx) => ctx.reply('Ciby Baby Punnamparambil is a technology evangelist with 18+ years of experience in Mobility, IoT & Data Science Competencies, Program & Project Management, and Project Delivery. He has been associated with Vmoksha since 2012 and ardently delivered solutions for IoT, iOS and Android App Development, 3G protocols Development, Telecom Application Development (IBM), Bioinformatics Product Development, Embedded System Product Development, and FPGA based Product Development. He edifies the mobility team of Vmoksha in architecting and delivering IoT solutions across Hospitality, Enterprise, Industry, Women Safety, and Medical domains. Integrating his in-depth knowledge in the IoT Ecosystem and Vmoksha Labs amenities, Ciby has been organizing IoT Classroom and Online Bootcamps at Vmoksha for about a year and trained over 200 professionals. He has custom-designed an IoT starter kit for better hands-on practice at an affordable cost of $40.'))
app.hears('Ciby', (ctx) => ctx.reply('I knew her him is he is vmokshas Vice President – Research & Development '))


// reply with  images or videos based on the  command set 
const catPhoto = 'http://lorempixel.com/400/200/cats/'
app.hears('Cat', ({ replyWithPhoto }) => replyWithPhoto(catPhoto))

// to pump random images 
app.hears('Cat2', ({ replyWithPhoto }) => replyWithPhoto({ url: catPhoto }))

// Register logger middleware // just returns the time frame 
app.use((ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    console.log('response time %sms', ms)
  })
})



const downloadPhotoMiddleware = (ctx, next) => {
  return app.telegram.getFileLink(ctx.message.photo[0])
    .then((link) => {
      ctx.state.fileLink = link
      return next()
    })
}


// send a pic it replyswith a pic 
app.on('photo', downloadPhotoMiddleware, (ctx, next) => {
  console.log('Photo url:', ctx.state.fileLink)
  return ctx.replyWithPhoto({ source: '/directory/file.jpeg' })
})


// staring thr Webhook method for listening tothe bot 
	// const {PORT =3000} = process.env
	// app.setWebhook('/',null,PORT);

// staring thr pooling method for listening tothe bot 
app.startPolling()




// API BEHIND THIS IMPLEMENTATION PROVIDED BY TELEGRAM

//https://api.telegram.org/bot404540093:AAFq0uGY95GCZ68BIXcnyUBi7e85d6_Msj4/getupdates?timeout=60
// https://api.telegram.org/bot404540093:AAFq0uGY95GCZ68BIXcnyUBi7e85d6_Msj4/getme
//https://api.telegram.org/bot404540093:AAFq0uGY95GCZ68BIXcnyUBi7e85d6_Msj4/getupdates
//https://api.telegram.org/bot404540093:AAFq0uGY95GCZ68BIXcnyUBi7e85d6_Msj4/sendmessage?chat_id=427301434&text=hi%20i%20am%20good

