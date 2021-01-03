const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const { getText } = require('./lib/ocr')
const images = require('./lib/images')
const adminNumber = JSON.parse(fs.readFileSync('./lib/admin.json'))
const Math_js = require('mathjs');
const { langCheck } = require("./helpers/helperFunction")
const moment = require('moment-timezone')
const limit = JSON.parse(fs.readFileSync('./lib/limit.json'))
//const AntiLink = JSON.parse(fs.readFileSync('./lib/NoLink.json'))
let setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
//let KickLink = JSON.parse(fs.readFileSync('./lib/setting.json'));
const settings = require('./lib/setting.json')
const google = require('google-it')
const get = require('got')
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg') //paid
const color = require('./lib/color')
const { liriklagu, quotemaker, wall } = require('./lib/functions')
const { help, info, } = require('./lib/help')
const msgFilter = require('./lib/msgFilter')
const akaneko = require('akaneko');
const fetch = require('node-fetch');
const bent = require('bent')
const setting1 = require('./lib/setting1.json')
const muted = JSON.parse(fs.readFileSync('./lib/muted.json'))
//let setting = JSON.parse(fs.readFileSync('./lib/settings.json'))
let { KickLink } = setting
const msgLimit = JSON.parse(fs.readFileSync('./lib/msgLimit.json'))
const wel = JSON.parse(fs.readFileSync('./lib/welcome.json')) 
const nsfwgrp = JSON.parse(fs.readFileSync('./lib/nsfw.json')) 
const ban = JSON.parse(fs.readFileSync('./lib/banned.json'))
const AntiLink = JSON.parse(fs.readFileSync('./lib/NoLink.json'))
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    restartState: isRestart,
    mtc: mtcState
    } = setting1


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, mentionedJidList, author, quotedMsgObj } = message
        let { body } = message
        const { name } = chat
        let { pushname, verifiedName } = sender
        const prefix = ':'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const args = body.slice(prefix.length).trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')

        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        if (!isCmd && !isGroupMsg) return console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname))
        if (!isCmd && isGroupMsg) return console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname), 'in', color(name))
        if (isCmd && !isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        if ((!isGroupMsg) && message.type === 'chat' && !message.body.startsWith(':')) {
            get.get(`https://simsumi.herokuapp.com/api?text=${message.body}&lang=en`).json()
            .then((success) => {
                client.reply(from, `${success.success}`, id)
            })
            .catch((err) => {
                client.reply(from, `${err}`, id)
            })
        }
        const botNumber = await client.getHostNumber()
        const serial = sender.id
        //const officer = '919025374268@c.us'
    //const officer = '972547327796@c.us'
         //const unlimted = '972547327796@c.us'
        const botnumber = '27628472326@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const isBanned = ban.includes(chatId)
        const officer = '8562092310056@c.us'
        const isofficer = officer.includes(sender.id)
        const office = ['919025374268@c.us' ,'6281334692305@c.us','60143039770@c.us' , '447586620575@c.us', '6737229309@c.us']
        const isoffice = office.includes(sender.id)
        const Unlimited = ['8562092310056@c.us' , '27656035811@c.us','60143039770@c.us'  ,'6281334692305@c.us' ,'6285704661795@c.us', '27656035811@c.us', '2348100626435@c.us', '919744375687@c.us', '6281310168655@c.us', '6287820616223@c.us', '27679474539@c.us', 
        '27762747021@c.us',
        '6285707452971@c.us',
        '94786821098@c.us',
         '17272165228@c.us', '918412054787@c.us', ,'6281310168655@c.us', '6281334692305@C.US','919025374268@c.us' , '6281334692305@C.US' , '447586620575@c.us', '6737229309@c.us','6283151228661@c.us', '2347044905645@c.us', '97430449898@c.us', '27680918805@c.us', '972547327796@c.us']
        const isunlimted = Unlimited.includes(sender.id)
const paidusers = ['6285704661795@c.us','6281334692305@c.us','60143039770@c.us', '27656035811@c.us',  ,'6281334692305@c.us', '2348100626435@c.us','919025374268@c.us','6281334692305@C.US', '6281334692305@C.US' , '447586620575@c.us', '6737229309@c.us', '919025374268@c.us' , '447586620575@c.us', '6737229309@c.us', '6281310168655@c.us', '6287820616223@c.us', '27679474539@c.us', 
'27762747021@c.us',
'6285707452971@c.us',
'94786821098@c.us',
'27658930507@c.us',
 '17272165228@c.us', '918412054787@c.us', ,'6281310168655@c.us', '6283151228661@c.us', '6281334692305@C.US','2347044905645@c.us', '919025374268@c.us' , '447586620575@c.us', '6737229309@c.us','97430449898@c.us', '27680918805@c.us', '972547327796@c.us']
        const ispaid = paidusers.includes(sender.id)
        const botadmins = ['6285704661795@c.us', '8562092310056@c.us', '27656035811@c.us' ,'6281334692305@c.us','60143039770@c.us', ,'919744375687@c.us','6281334692305@C.US' , '2348100626435@c.us',
'6285707452971@c.us',
'94786821098@c.us',
 '6281310168655@c.us', '6287820616223@c.us', '27679474539@c.us', '8562092310056@c.us', '27762747021@c.us', '919025374268@c.us', '6281334692305@C.US'  , '6281334692305@C.US' , '447586620575@c.us', '6737229309@c.us','17272165228@c.us', '6281334692305@C.US', '8562092310056@c.us', '6281310168655@c.us', '6283151228661@c.us', '2347044905645@c.us', '97430449898@c.us', '972547327796@c.us'] //add the number of people that you want to the be bot admins
        const isbotadmin = botadmins.includes(sender.id)
        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = '27656035811@c.us'
        const isOwner = ownerNumber.includes(sender.id)
        
        const isNoLinks = AntiLink.includes(chatId)

         const mess = {
            wait: '[ WAIT ] In process⏳ please wait a moment',
            error: {
                St: '[❗] Send the image with the caption !Sticker or the image tag that has been sent',
                Qm: '[❗] An error has occurred, maybe the theme is not available!',
                Yt3: '[❗] An error occurred, unable to convert to mp3!',
                Yt4: '[❗] An error has occurred, maybe the error is caused by the system.',
                Ig: '[❗] An error occurred, maybe because the account is private',
                Ki: '[❗] Bot cannot issue group admins!',
                Ad: '[❗] Cannot add target, maybe because it is private',
                Iv: '[❗] The link you submitted is invalid!'
            }
        }

        msgFilter.addFilter(from)

        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+:=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.:?&/=]*)/gi)
                 // FUNCTION
                function isMsgLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 12) {
                                found === true 
                                client.reply(from, '*[ANTI-SPAM]*\n Sorry, your account we block because of SPAM, and can not be blocked!', id)
                                client.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 7){
                                found === true
                                client.reply(from, '*[ANTI-SPAM]*\nYour number detected spam!n Please do not spam 5 more messages or your number AUTO BLOCK!', id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
                function addMsgLimit(id){
                    if (isAdmin) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
                function isLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                client.reply(from, 'Your BOT command has reached the limit, try tomorrow :)', id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
                function limitAdd (id) {
                    if (isAdmin) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/limit.json',JSON.stringify(limit));
                    }
                }

                const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }
if(body === ':mute' && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isbotadmin) return client.reply(from, 'Sorry, this command can only be done by Risa admins!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                        client.reply(from, 'Bots have been mute on this chat! :unmute to unmute!', id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                        reply(from, 'Bots have been mute on this chat! :unmute to unmute!', id)
                    }
                }
                if(body === ':unmute' && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isbotadmin) return client.reply(from, 'Sorry, this command can only be done by Risa admin!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                        client.reply(from, 'Bot has been in unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                        client.reply(from, 'Bot has been in unmute!', id)                   
                    }
                }
                 if (!isGroupMsg && command.startsWith(':')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
                 if (isGroupMsg && command.startsWith(':')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
                 if (!isMuted(chatId)) return
                // END HELPER FUNCTION

               
             if (!isBanned) {
            switch (command) {
                case 'antilink':         
                    if (!isBotGroupAdmins) return client.reply(from, 'make the bot as admin to use this feature!', id)
                    if (isGroupMsg) {
                        if (args[0] == 'on') {
                            if (KickLink === true) return client.reply(from, 'The anti-link feature has been activated before!', id)
                            KickLink = true
                            AntiLink.push(chatId)
                            fs.writeFileSync('./lib/NoLink.json', JSON.stringify(AntiLink))
                            client.reply(from, 'successfully activated anti link!', id)
                        } else if (args[1] == 'off') {
                            if (KickLink === false) return client.reply(from, 'antilink has not been activated before', id)
                            KickLink = false
                            let inxx = AntiLink.indexOf(chatId)
                            AntiLink.splice(inxx, 1)
                            fs.writeFileSync('./lib/NoLink.json', JSON.stringify(AntiLink))
                            client.reply(from, 'successfully disabled anti link!', id)
                        } else {
                            client.reply(from, `To enable anti link in Group Chat\n\nUse\n${prefix}antilink on -enable\n${prefix}antilink off - deactivate\n`, id)
                        }
                    }
            break

            case 'write':
                if (args.length == 0) return client.reply(from, `${prefix}nulis i love you 3000`, id)
                const nulisq = body.slice(7)
                const nulisp = await rugaapi.tulis(nulisq)
                await client.sendImage(from, `${nulisp}`, '', 'BMS...', id)
                .catch(() => {
                    client.reply(from, 'Error!', id)
                })
                break


            case 'movie':
			if (args.length == 0) return cl.reply(from, `${prefix}movie welcome to the jungle`, id)
			rugaapi.movie((body.slice(7)))
			.then(async (res) => {
				if (res.status == 'error') return client.reply(from, res.hasil, id)
				await client.sendFileFromUrl(from, res.link, 'movie.jpg', res.hasil, id)
			})
			break
             case 'user':
        const username = body.slice(6)
        const result = await axios.get(`https://api.jikan.moe/v3/user/${username}`)
        const jikan =  result.data

var Data = `🔖️ Username: ${jikan.username}
📒️ User ID: ${jikan.user_id}
❤️ Gender: ${jikan.gender}
🌍️ Location: ${jikan.location}
📆️ Joined: ${jikan.joined}
⭐️ Anime Stats ⭐️
Days Watched: ${jikan.anime_stats.days_watched}
Mean Score: ${jikan.anime_stats.mean_score}
Currently Watching: ${jikan.anime_stats.watching}
Completed: ${jikan.anime_stats.completed}
On Hold: ${jikan.anime_stats.on_hold}
Dropped: ${jikan.anime_stats.dropped}
Plan to Watch: ${jikan.anime_stats.plan_to_watch}
🎯️ Manga Stats 🎯️
Days Read: ${jikan.manga_stats.days_read}
Mean Score: ${jikan.manga_stats.mean_score}
Currently Reading: ${jikan.manga_stats.reading}
Completed: ${jikan.manga_stats.completed}
On Hold: ${jikan.manga_stats.on_hold}
Dropped: ${jikan.manga_stats.dropped}
Plan to Read: ${jikan.manga_stats.plan_to_read}`
        await client.sendFileFromUrl(from, `${jikan.image_url}`,`user.png`, Data)
        break
          case 'addpro':
            if (!isbotadmin) return client.reply(from, 'This command can only be used by botadmins!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                paidusers.push(mentionedJidList[i])
                fs.writeFileSync('./lib/pro.json', JSON.stringify(paidusers))
                client.reply(from, `Success Added to Pro users!`, id)
                }
            break
        case 'delpro':
            if (!isbotadmin) return client.reply(from, 'This command can only be used by botadmins!', id)
                let inq = adminNumber.indexOf(mentionedJidList[0])
               paidusers.splice(inq, 1)
                fs.writeFileSync('./lib/pro.json', JSON.stringify(paidusers))
                client.reply(from, `Success removed from pro users!`, id)
            break
            case 'sticker':
            case 'stiker': 
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)         
                if (isMedia) {
                    const mediaData = await decryptMedia(message)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64,'', '', id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64, '', '', id)
                } else if (args.length >= 1) {
                    const url = args[1]
                    if (url.match(isUrl)) {
                        await client.sendStickerfromUrl(from, url, { method: 'get' })
                            .catch(err => console.log('Caught exception: ', err))
                    } else {
                        client.sendText(from, 'Invalid URL', message.id)
                    }
                } else {
                    if(isGroupMsg) {
                        client.sendTextWithMentions(from, `@${message.author} You did not tag a picture`)
                    } else {
                        client.reply(from, 'You did not tag a picture', message.id)
                    }
                }
            break
        //paid
        case 'tsticker':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
           if(!ispaid) return client.reply(from, 'Only paid users can use this commad', id)
            if (isMedia && type == 'image') {
              try {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                const base64img = imageBase64
                const filename = "./media/pic.jpg";
                //console.log(base64img)
                const outFile = './media/noBg.png'
                const result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'Ddsk2zrp1xx21LeQgxfrXk2x', size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch(err) {
                    console.log(err)
                }
            }
            break

            case 'nekopoi':
             rugapoi.getLatest()
            .then((result) => {
                rugapoi.getVideo(result.link)
                .then((res) => {
                    let heheq = '\n'
                    for (let i = 0; i < res.links.length; i++) {
                        heheq += `${res.links[i]}\n`
                    }
                    aruga.reply(from, `Title: ${res.title}\n\nLink:\n${heheq}\n\nNEKO :v`)
                })
            })
            .catch(() => {
                aruga.reply(from, 'Error!', id)
            })
            break

            case 'chord':
            if (args.length == 0) return aruga.reply(from, `Untuk mencari lirik dan chord dari sebuah lagu\bketik: ${prefix}chord [judul_lagu]`, id)
            const chordq = body.slice(7)
            const chordp = await rugaapi.chord(chordq)
            await client.reply(from, chordp, id)
            .catch(() => {
                client.reply(from, 'Error!', id)
            })
            break

            case 'qr':
           if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
        if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
           if(!args.lenght >= 2) return
           let qrcodes = body.slice(8)
           await client.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process success!')
           break
           //not work
             case 'math':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (args.length === 1) return client.reply(from, '[❗] Send command *:math [  Question ]*\nExample : :math 12*12\n*NOTE* :\n- For Multiplication Using * \n- For Increase Using + \n- For Subtraction Using - \n- For Division Using /')
            const mtk = body.slice(6)
            if (typeof Math_js.evaluate(mtk) !== "number") {
            client.reply(from, `"${mtk}", not numbers!\n[❗] Send command *:math [ Question ]*\nExample : :math 12*12\n*NOTE* :\n- For Multiplication Using * \n- For Increase Using + \n- For Subtraction Using - \n- For Division Using /`, id)
        } else {
            client.reply(from, `*「 MATH 」*\n\n*Calculator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
        }
        break
           //case 'bot':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            let bot = ''
            for (let admon of botnumber) {
                bot += `➸ @${admon.replace(/@c.us/g, '')}` 
            }
            await sleep(2000)
            await client.sendTextWithMentions(from, bot)
            break
             case 'images':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if (args.length == 0) return client.reply(from, `To use the cmd send: ${prefix}images [search]`, id)
            const cariwall = body.slice(8)
            const hasilwall = await images.fdci(cariwall)
            client.sendFileFromUrl(from, hasilwall, '', '', id)
            .catch(() => {
                client.reply(from, 'An error occured', id)
            })
            break
            //case 'sendto':
            client.sendFile(from, './msgHandler.js', 'msgHandler.js')
            break
case 'ship':
if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)                      
        arg = body.trim().split(' ')
        const per = Math.floor(Math.random() * 100)

if (per < 25) { 
var sentence = `${per}% Worse than average ♦️`
} else if (per < 50) {
var sentence = `${per}% I don't know how i feel about it ❇️` 
} else if (per < 75) {
var sentence = `${per}% Good, I guess... ⭐` 
} else if (per < 90) {
var sentence = `${per}% Sugoii! Go for it!🤩` 
} else {
var sentence = `${per}% Incredible! You two will be an amazing couple 😍` 
}

var shiptext = `❣️ Matchmaking...

---------------------------------
    ${arg[1]}  x  ${arg[2]}
---------------------------------

${sentence}`
        await client.sendTextWithMentions(from, shiptext)
        break
case 'adminlist':   
                if (!isGroupMsg) return await client.reply(from, 'This command can only be used in groups!', id)
                let mimin = ''
                for (let admon of groupAdmins) {
                    mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
                    }
                await sleep(2000)
                await client.sendTextWithMentions(from, mimin)
                break
            
                    case 'groups':    
                        client.sendText(from, 'support 1 - https://chat.whatsapp.com/Jwt8Nr4YAnQCq9lQWPn1D0 \n\nsupport 2 - https://chat.whatsapp.com/I2v7MHA7kyD8QHSDEZMV2s \n\nsupport ind - https://chat.whatsapp.com/ElKfPOllRpEIqcOg8qhihR');
                        break
                        case 'dts':
                        client.sendText(from, 'you make me sick I know a prick when I see one and devil slayer is the prefect one!');
                        break
                        case 'bms':
                            client.sendText(from, 'without ewh there would not  be bms thanks ewh!');
                            break
                                                                                                                                              
                    case 'hello':
                        await client.simulateTyping(from, true);
                        client.sendText(from, 'Hello there, How can I help?');
                        await client.simulateTyping(from, false);
                        break
                case 'Fuck' :
                case 'fuck' :
                        client.sendText(from, 'Hmph! crosses arms Take that back!');
                        break
                
                case 'freedom' :
                        client.sendFileFromUrl(from, 'https://i.ibb.co/6J9ST0d/IMG-20200731-WA0791.jpg','freedom.jpg','...')
                    break
                case 'Botw' :
                        client.sendFileFromUrl(from, 'https://mocah.org/uploads/posts/197514-princess-zelda-2350x1175.png','BOTW.jpg','...')
                    break
                
                case 'S':
                        client.sendText(from, 'Connection Status = Active')
                    break
                            
                case 'sex' :
                case 'Sex' :
                case 'nudes' :
                case 'porn' :
                        client.sendText(from, 'Go home, you are horny!')
             break

                
                        break
        case 'gsticker':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
           if(!ispaid) return client.reply(from, 'Only paid users can use this commad', id)
            if (isMedia && type == 'video') {
                if (mimetype === 'video/mp4' && message.duration < 30) {
                    const uploadToGiphy = require('./lib/giphy')
                    const mediaData = await decryptMedia(message, uaOverride)
                    client.reply(from, 'Hold on... This might take a while', id)
                    const filename = './media/aswu.mp4'
                    fs.writeFile(filename, mediaData, function (err) {
                        if (err) {
                            return console.log(err)
                        }
                        var postData = {
                            api_key: 'LBtGgqqQpp663mo1nIEADPcv1AddeLtb', // paid
                            file: {
                                value: fs.createReadStream(filename), 
                                options: {
                                    filename: filename,
                                    contentType: 'image/gif'
                                }
                            }
                        }
                        uploadToGiphy(postData).then((async (gifUrl) => {
                            console.log('Success upload : ' + gifUrl)
                            await sleep(130000)
                            await client.sendGiphyAsSticker(from, gifUrl)
                        })).catch(err => {
                            client.reply(from, `Error : ${err}`, id)
                        })
                    })
                }
            }
            
            break
        
        case 'tts':  
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if (args.length == 0) return client.reply(from, 'Wrong Fromat!')
                const ttsEn = require('node-gtts')('en')
            const ttsJp = require('node-gtts')('ja')
            const dataText = body.slice(8)
            if (dataText === '') return client.reply(from, 'Baka?', message.id)
            if (dataText.length > 250) return client.reply(from, 'Unable to convert', message.id)
            var dataBhs = body.slice(5, 7)
            if (dataBhs == 'id') {
            } else if (dataBhs == 'en') {
                ttsEn.save('./tts/resEn.mp3', dataText, function () {
                    client.sendPtt(from, './tts/resEn.mp3', message.id)
                })
            } else if (dataBhs == 'jp') {
                ttsJp.save('./tts/resJp.mp3', dataText, function () {
                    client.sendPtt(from, './tts/resJp.mp3', message.id)
                })
            } else {
                client.reply(from, 'Currently only English and Japanese are supported!', message.id)
            }
            break 
        case 'quotemaker':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            arg = body.trim().split('|')
            if (arg.length >= 3) {
            client.reply(from, 'Processing...', message.id) 
            const quotes = arg[1]
            const author = arg[2]
            const theme = arg[3]
            try {
            const resolt = await quotemaker(quotes, author, theme)
            client.sendFile(from, resolt, 'quotesmaker.jpg','neh...')
            } catch {
            client.reply(from, 'I\'m afraid to tell you that the image failed to process', message.id)
            }
            } else {
            client.reply(from, 'Usage: \n!quotemaker |text|watermark|theme\n\nEx :\n!quotemaker |...|...|random', message.id)
            }
            break
         // paid
        case 'groupinfo' :
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if (!isGroupMsg) return client.reply(from, '.', message.id) 
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = wel.includes(chat.id)
            var ngrp = nsfwgrp.includes(chat.id)
            var grouppic = await client.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await client.sendFileFromUrl(from, pfp, 'group.png', `${groupname} 

🌐 Members: ${totalMem}

💌 Welcome: ${welgrp}

⚜️ NSFW: ${ngrp}

📃 Group Description 

${desc}`)
        break
        case 'bc':  
            
            if(!isowner) return client.reply(from, 'Only Bot admins!', message.id)
            let msg = body.slice(4)
            const chatz = await client.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await client.getChatById(ids)
                if (!cvk.isReadOnly) client.sendText(ids, `[ BMS BOT Broadcast ]\n\n${msg}`)
            }
            client.reply(from, 'Broadcast Success!', message.id)
            break
        
       
        
        case 'ban':
            if(!isbotadmin) return client.reply(from, 'Only Bot admins can use this CMD!', message.id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                ban.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
                client.reply(from, 'Succes ban target!', message.id)
            }
            break
        case 'covid':
         
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const country = await slicedArgs.join(' ')
            console.log(country)
            const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
            const { cases, todayCases, deaths, todayDeaths, active } = response2.data
                await client.sendText(from, '🌎Covid Info -' + country + ' 🌍\n\n✨Total Cases: ' + `${cases}` + '\n📆Today\'s Cases: ' + `${todayCases}` + '\n☣️Total Deaths: ' + `${deaths}` + '\n☢️Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️Active Cases: ' + `${active}` + '.')
            break
        case 'ping':
            if (!isGroupMsg) return client.reply(from, 'Sorry, This command can only be used in groups', message.id)
            if (!isGroupAdmins) return client.reply(from, 'Well, only admins can use this command', message.id)
                //if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            const groupMem = await client.getGroupMembers(groupId)
            let hehe = `${body.slice(6)} - ${pushname} \n`
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '✨'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '----------------------'
            await client.sendTextWithMentions(from, hehe)
            break
        case 'kickall':
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if(!isGroupOwner) return client.reply(from, 'Sorry, Only group owner can use this CMD', message.id)
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to give me the power to do this before executing', message.id)
            const allMem = await client.getGroupMembers(groupId)
            console.log(isGroupAdmins)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) return
                await client.removeParticipant(groupId, allMem[i].id)
            }
            client.reply(from, 'Done!', message.id)
            break
        case 'clearall':
            if (!isbotadmin) return client.reply(from, 'Owner only', message.id)
            const allChatz = await client.getAllChats()
            for (let dchat of allChatz) {
                await client.deleteChat(dchat.id)
            }
            client.reply(from, 'Done', message.id)
            break
            case 'welcome':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (!isGroupAdmins) return client.reply(from, 'This command can only be used by the Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Select enable or disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Welcome feature successfully activated in this group!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Welcome feature successfully disabled in this group!', id)
            } else {
                client.reply(from, 'Choose enable or disable udin!', id)
            }
            brea
        //Paid
        if(!ispaid) return client.reply(from, 'Only paid users can use this commad', id)
        case 'act':
     if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
             arg = body.trim().split(' ')
             if (!isGroupAdmins) return client.reply(from, 'Only Admins can use this command', id)
             if (arg[1] == 'welcome') {
                wel.push(chat.id)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(wel))
                client.reply(from, `Welcome is now registered on ${name}`, message.id)
             } else if (arg[1] == 'nsfw') {
                nsfwgrp.push(chat.id)
                fs.writeFileSync('./lib/nsfw.json', JSON.stringify(nsfwgrp))
                client.reply(from, `NSFW is now registered on ${name}`, message.id)
             }
             break
        //paid
        case 'deact':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
        if(!isGroupAdmins) return client.reply(from, 'Only group admins can use this commad', id)
             arg = body.trim().split(' ')
             if (!isGroupAdmins) return client.reply(from, 'Only Admins can use this command', id)
             if (arg[1] == 'welcome') {
                let inx = ban.indexOf(from)
                wel.splice(inx, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(wel))
                client.reply(from, `Welcome is now unregistered on ${name}`, message.id)
             } else if (arg[1] == 'nsfw') {
                let inx = ban.indexOf(from)
                nsfwgrp.splice(inx, 1)
                fs.writeFileSync('./lib/nsfw.json', JSON.stringify(nsfwgrp))
                client.reply(from, `NSFW is now unregistered on ${name}`, message.id)
             }
            break
             case 'ocr':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if (isMedia) {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                const text = await getText(imageBase64)
                await client.sendText(from, text)
            } else if (quotedMsg && quotedMsg.type === 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                const text = await getText(imageBase64)
                await client.sendText(from, text)
            } else if (args.length === 1) {
                if (!url.match(isUrl)) await client.reply(from, 'Sorry, wrong message format please check help section.', id)
                const text = await getText(url)
                await client.sendText(from, text)
            } else {
                await client.reply(from, 'No pictures! To open the send command list :menu', id)
            }
            break
       // paid
        case 'cgc':
         if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
        if(!ispaid) return client.reply(from, 'Only paid users can use this commad', id)
            arg = body.trim().split(' ')
            const gcname = arg[1]
            client.createGroup(gcname, mentionedJidList)
            client.sendText(from, 'Group Created ✨')
            break
       
        case 'sr':
         if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
             arg = body.trim().split(' ')
             const sr = arg[1]
             try {
             const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + sr + '/');
             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = response1.data


                   // 1/2 paid
                if (nsfw == true) {
                      if ((isGroupMsg) && (isnsfw)) {
                                await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                      } else if ((isGroupMsg) && (!isnsfw)) {
                                await client.reply(from, `NSFW is not registered on ${name}`, id)
                      }
                } else { 
                      await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                }
                } catch(err) {
                    await client.reply(from, 'There is no such subreddit, Baka!', id) 
                }
                break
        case 'unban':
         
            
            
            if(!isbotadmin) return client.reply(from, 'Only bot admins can use this CMD', message.id)
            let inx = ban.indexOf(mentionedJidList[0])
            ban.splice(inx, 1)
            fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
            client.reply(from, 'Unbanned User!', message.id)
            break
            case 'section':
    if (isGroupMsg) {
        if (groupAdmins.includes(author) == true) {
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await client.setGroupIcon(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.setGroupIcon(from, imageBase64)
            }
        } else{ 
            await client.reply(from, 'only admins can use this command', message)
        }
    } else {
        client.sendText(from, 'It hast to be a group message')
    }
     break
        case 'kick':
            
            
            if(!isGroupMsg) return client.reply(from, '...', message.id)
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin, Sorry', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to make me admin to use this CMD', message.id)
            if(mentionedJidList.length === 0) return client.reply(from, 'Wrong format', message.id)
            await client.sendText(from, `Request Accepted! issued:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await client.reply(from, '....', message.id)
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case 'delete':
         if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if (!isGroupAdmins) return client.reply(from, 'Only admins can use this command', id)
            if (!quotedMsg) return client.reply(from, 'Wrong Format!', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Wrong Format!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case 'leave':
            
            if(!isGroupMsg) return client.reply(from, '...', message.id)
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin', message.id)
            await client.sendText(from,'Sayonara').then(() => client.leaveGroup(groupId))
            break
        case 'promote':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if(!ispaid) return client.reply(from, '.', message.id)
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to make me admin to use this CMD', message.id)
            if (mentionedJidList.length === 0) return await client.reply(from, 'Wrong format!', message.id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'One user at a time', message.id)
            if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'This user is already admin', message.id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `@${mentionedJidList[0].replace('@c.us', '')} is now an admin`)
            break
        case 'demote':
            
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to make me admin to use this CMD', message.id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Wrong Format', message.id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'One user at a time', message.id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'The user isn\'t an admin', message.id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Demoted @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'join.':
         if (!isbotadmin) return client.reply(from, 'Risa admins only', id) 
         if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if (args.length == 0) return client.reply(from, 'Wrong Format', message.id)
            const link = body.slice(6)
            const minMem = 30
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await client.inviteInfo(link)
            if (!isLink) return client.reply(from, 'Where\'s the link?', message.id)
            if (check.size < minMem) return client.reply(from, 'The group does not have 30+ members', message.id)
            await client.joinGroupViaLink(link).then( async () => {
                await client.reply(from, 'Joined ✨', message.id)
            }).catch(error => {
                client.reply(from, 'An error occured 💔', message.id)
            })
        break
        case 'sauce':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            if (isMedia) {
            const mediaData = await decryptMedia(message)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
             try {
                const raw = await fetch("https://trace.moe/api/search", {
                method: "POST",
                body: JSON.stringify({ image: imageBase64 }),
                headers: { "Content-Type": "application/json" }
                })
                const parsedResult = await raw.json()
                const { anime, episode, title_english } = parsedResult.docs[0]
                const content = `Anime Found! \n⛩️ Japanese Title: ${anime} \n✨ English Title: ${title_english} \n💚 Source Episode: ${episode} `
                await client.sendImage(from, imageBase64, 'sauce.png', content, id)
                console.log("Sent!")
             } catch (err) {
                await client.sendFileFromUrl(from, errorurl, 'error.png', '💔 An Error Occured', id)
             }
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                try {
                 const raw = await fetch("https://trace.moe/api/search", {
                 method: "POST",
                 body: JSON.stringify({ image: imageBase64 }),
                 headers: { "Content-Type": "application/json" }
                 })
                 const parsedResult = await raw.json()
                 const { anime, episode, title_english } = parsedResult.docs[0]
                 const content = `Anime Found! \n⛩️ Japanese Title: ${anime} \n✨ English Title: ${title_english} \n💚 *Source Episode: ${episode} `
                 await client.sendImage(from, imageBase64, 'sauce.png', content, id)
                 console.log("Sent!")
               } catch (err) {
                 throw new Error(err.message)
                 await client.sendFileFromUrl(from, errorurl, 'error.png', '💔 An Error Occured', id)
               }
            }
            break
           case 'add':
            if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
            if (!isGroupAdmins) return client.reply(from, 'Failed, this command can only be used by group admins!', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add, the bot must be the an admin!', id)
            if (args.length !== 1) return client.reply(from, `To use the ${prefix}add\nUse: ${prefix}add <number>`, id)
                try {
                    await client.addParticipant(from,`${args[0]}@c.us`)
                } catch {
                    client.reply(from, 'Cant add target', id)
                }
            break
             case 'bot':
            let admn = `List of current bots\nTotal : ${botnum.length}\n`
            for (let i of botnum) {
                admn += `➸ @${i.replace(/@c.us/g,'')}\n`
            }
          //  await client.reply(from, admn, id)
             await client.sendTextWithMentions(from, admn, message.id)
            break
        case 'lyrics':
         
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            if (args.length == 0) return client.reply(from, 'Wrong Format', message.id)
            const lagu = body.slice(7)
            console.log(lagu)
            var lirik = await liriklagu(lagu)
            client.sendText(from, lirik, id)
            break
        case 'anime':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            const keyword = message.body.replace(':anime', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔 Sorry, Couldn\'t find the requested anime', id)
              console.log("Sent!")
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `Anime Found!
✨ Title: ${title}

🎆 Episodes: ${episodes}

💌 Rating: ${rated}

❤️ Score: ${score}

💚 Synopsis: ${synopsis}

🌐 URL: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            client.sendImage(from, base64, title, content, '', message.id)
           } catch (err) {
             console.error(err.message)
             await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔 Sorry, Couldn\'t find the requested anime')
           }
          break
           case 'whatanime':
           if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                client.reply(from, 'Searching->->->', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        client.reply(from, 'Sorry, I dont know what anime this is, make sure the image that will be in Search is not Blurry/Intersecting', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*I have low confidence in this* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *R-18?* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Similarities* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    client.sendFileFromUrl(from, video, 'anime.mp4', teks, id).catch(() => {
                        client.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    client.reply(from, 'An error occured!', id)
                })
            } else {
                client.reply(from, `Sorry wrong format\n\nPlease send photo with captions ${prefix}whatanime\n\nOr reply to a photo with a caption ${prefix}whatanime`, id)
            }
            break
        case 'wallpaper': 
            if (args.length == 0) return client.reply(from, 'Wrong Format!', id)
            const query = body.slice(6)
            const walls = await wall(query)
            console.log(walls)
            await client.sendFileFromUrl(from, walls, 'walls.jpg', '', id)
            break
        case 'waifu':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            const data = fs.readFileSync('./lib/waifu.json')
            const dataJson = JSON.parse(data)
            const randIndex = Math.floor(Math.random() * dataJson.length)
            const randKey = dataJson[randIndex]
            client.sendFileFromUrl(from, randKey.image, 'Waifu.jpg', randKey.teks, id)
            break
            
        case 'animeneko':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            client.sendFileFromUrl(from, akaneko.neko(), 'neko.jpg', 'Neko Nyaa~')
            break
        case 'doggo':      
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Doggo ✨', id)
            break
        case 'neko':
                 if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko 🌠', id)
            break
        case 'roll':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            const dice = Math.floor(Math.random() * 6) + 1
            await client.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png')
            break
        case 'flip':
         
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
               client.sendStickerfromUrl(from, 'https://i.ibb.co/LJjkVK5/heads.png')
            } else {
               client.sendStickerfromUrl(from, 'https://i.ibb.co/wNnZ4QD/tails.png')
            }
            break
        case 'slap':
         
            
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            arg = body.trim().split(' ')
            const person = author.replace('@c.us', '')
            await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            client.sendTextWithMentions(from, '@' + person + ' slapped ' + arg[1])
            break

            case 'loli':
                if (!isGroupMsg) return client.reply(from, 'only use in group', id)
                if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, your limit quota is up use :limit to check your quota`, id)
                
                await limitAdd(serial)
                const loli = await axios.get('https://mhankbarbar.herokuapp.com/api/randomloli')
                client.sendFileFromUrl(from, loli.data.result, 'loli.jpeg', '*LOLI*', id)
                break
        case 'pokemon':
         if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            
            q7 = Math.floor(Math.random() * 890) + 1;
            client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png','.', id)
            break
        case 'rpaper' :
         
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            const walnime = ['https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            client.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', message.id)
            break
        case 'meme':
         
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            await client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            break
            case 'limit':
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return client.reply(from, `Your request limit has expired`, id)
                    client.reply(from, `The rest of your request limit remains : *${limitCounts}/100*`, id)
                    found = true
                }
            }
            console.log(limit)
            console.log(limidat)
            if (found === false){
                let obj = {id: `${serial}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./lib/limit.json',JSON.stringify(limit, 1));
                client.reply(from, `The rest of your request limit remains : *${limitCount}*\n\n_Note : The limit will be reset every 21:00 hours!_`, id)
            }
            break
             case 'restartlimit':
        case 'restart':
        case 'reset':
            if (!isbotadmin) return client.reply(from, 'Risa admins only', id) 
            client.reply(from, '⚠️*[INFO]* Reseting ...', id)
            //setting.restartState = true
            //setting.restartId = chat.id
            let obj = []
            fs.writeFileSync('./lib/limit.json', JSON.stringify(obj, 1));
            fs.writeFileSync('./lib/setting1.json', JSON.stringify(setting, null, 2));
            //fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null,2));
            fs.writeFileSync('./lib/msgLimit.json', JSON.stringify(obj));
            //fs.writeFileSync('./lib/banned.json', JSON.stringify(banned));
            await sleep(5000).then(() => client.reply(from, `_*RESTART SUCCESS*_`, id))
            break
         case 'listgroup':    
                client.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n═════════════════\n\n*No : ${i+1}*\n*Name* : ${res[i].name}\n*Unread Message* : ${res[i].unreadCount} chat\n*Not Spam* : ${res[i].notSpam}\n`
                }
                client.reply(from, gc, id)
            })
                break
        case 'help':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            client.reply(from, help.replace(undefined, pushname), message.id)
            break
        case 'info':    
            
            client.reply(from, info, id)
            break

case 'toimg': {
     
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            if(quotedMsg && quotedMsg.type == 'sticker'){
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.sendFile(from, imageBase64, 'imagesticker.jpg', 'CHOPS IS BAE', id)
            } else if (!quotedMsg) return client.reply(from, 'unable to find sticker!', id)}
            break
        
         case 'gay': {
             
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            let name = body.trim().split(' ').slice(1).toString().replace(/,/g, ' ')
            const random = await Math.floor(Math.random() * (100 - 1) + 1)
            if(random < 15) return await client.reply(from, `Gay ${name} Result ${random}%.\n==============================\nNote : Slow THE GAY ATTITUDE bro\n==============================`, id)
            if(random < 50) return await client.reply(from, `Gay ${name} Result*${random}%.\n==============================\nNote : *GOODLUCK BEING GAY\n==============================`, id)
            if(random < 75) return await client.reply(from, `Gay ${name} Result ${random}%.\n==============================\nNote : STAY AWAY FROM US GAY!!!\n==============================`, id)
            if(random <= 100) return await client.reply(from, `Gay ${name} Result ${random}%.\n==============================\nNote : THERE IS NO HOPE FOR YOU !!!\n==============================`, id)
            }
            break
            case 'google':
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
            client.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return client.reply(from, `Search Results : ${googleQuery} not found`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `Search Results : ${googleQuery}\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n═════════════════\n\n*↠Tile* : ${results[i].title}\n\n*↠Description* : ${results[i].snippet}\n\n*↠Link* : ${results[i].link}\n\n`
            }
                client.reply(from, vars, id);
            }).catch(e => {
                console.log(e)
                client.sendText(owner, 'Google Error : ' + e);
            })
            break

            case "voice":
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
                // get country language code
                if (body.split(" ").slice(1, 2).toString()) {
                    let lang = body.split(" ").slice(1, 2).toString();
                    lang = langCheck(lang);

                    let text = body.split(" ").slice(2).toString().replace(/,/g, " ");
                    if (lang === undefined) {
                        lang = "id";
                        text = body.split(" ").slice(1).toString().replace(/,/g, " ");
                    }

                    client
                        .sendFileFromUrl(from, `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${text}`, "voice", "voice chat", id)
                        .then((res) => console.log(`[INFO] ${from} Send Voice From google`))
                        .catch((err) => {
                            console.log(`[ERR] ${from} Failed sending voice note `);
                            client.reply(from, "Voice Retrieval Failed. Try again! 🤖", id);
                        });
                } else {
                    // when there is no country language code
                    console.log(`[FAIL] ${from} Should input Language country code`);
                    client.reply(from, `*Make sure you enter the Language and Message code you want to convert to voice!* 🤖`, id);
                }
                break

               

        case 'profile':
        if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)
            
              if (isGroupMsg) {
                  var role = 'NORMAL USER'
            if (isbotadmin) {
              role = 'BMS BOTS LEGION'
            }
            if (isofficer) {
                role = '*BMS CATGIRL*'
            }
            var free = 'FREE'
            if (ispaid) {
               free = 'PRO'
            }
            if (isoffice) {
                role = '*BMS ROYAL SPY*'
            }
            var free = 'FREE'
            if (isunlimted) {
               free = '*Unlimited*'
            }
              if (!quotedMsg) {
                 const limidat = JSON.parse(fs.readFileSync('./lib/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    var found = true
                    var cont = limitCounts
                    if (isunlimted){
                        cont = 'Unlimited'
                    }
                }
            }
              var block = ban.includes(author)
              var pic = await client.getProfilePicFromServer(author)
              var namae = pushname
              var sts = await client.getStatus(author)
              var adm = isGroupAdmins
              const { status } = sts
             let groupname = chat.contact.formattedName    
              let totalMem = chat.groupMetadata.participants.length
               if (pic == undefined) {
               var pfp = errorurl 
               } else {
               var pfp = pic
               } 
               await client.sendFileFromUrl(from, pfp, 'pfp.jpg', `USER PROFILE ♥̩͙♥̩̩̥͙♥̩̥̩⑅  \n\n ☭ USERNAME : ${namae}\n\n ✟ ABOUT : ${status}\n\n 卐 BLOCKED: ${block}\n\n ☬ ROLE : ${role}\n\n ♛ ADMIN : ${adm}\n\n ★ TYPE :  ${free}\n\n ♚ GROUP : ${groupname}\n\n ✣ GROUP MEMBERS : ${totalMem}\n\n[ ⌛ ] Limit : ${cont}/100`, message.id)
             } else if (quotedMsg) {
             var freee = ' FREE'
             var roled = 'NORMAL  USER'
                if (isbotadmin) {
              roled = 'BMS BOTS  LEGION'
            }
            if (ispaid) {
               freee = ' PRO'
            }    
            var free = 'FREE'
            if (isunlimted) {
               free = '*Unlimited*'
            }
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups!', id)
            if (isLimit(serial)) return client.reply(from, `Sorry ${pushname}, Your Limit Quota Is Up, Type :limit To Check Your Limit Quota`, id)
            
            await limitAdd(serial)

             var qmid = quotedMsgObj.sender.id    
             var block = ban.includes(qmid)
             var pic = await client.getProfilePicFromServer(qmid)
             var namae = quotedMsgObj.sender.formattedName
             var sts = await client.getStatus(qmid)
             var admgrp = await client.getGroupAdmins(from)
             var adm = admgrp.includes(qmid)
             const { status } = sts
             let groupname = chat.contact.formattedName  
             let totalMem = chat.groupMetadata.participants.length
              if (pic == undefined) {
              var pfp = errorurl 
              } else {
              var pfp = pic
              } 
          await client.sendFileFromUrl(from, pfp, 'pfp.jpg', `USER PROFILE ♥̩͙♥̩̩̥͙♥̩̥̩⑅  \n\n  ☭ USERNAME : ${namae}\n\n ✟ ABOUT : ${status}\n\n 卐 BLOCKED : ${block}\n\n ☬ ROLE : ${roled}\n\n ♛ ADMIN : ${adm}\n\n ★ TYPE : ${freee}\n\n  ♚ GROUP : ${groupname}\n\n ✣ GROUP MEMBERS : ${totalMem}\n\n[ ⌛ ] Limit : ${cont}/100`, message.id)
             }
            }
            break
        case'snk':  
        client.reply(from, snk, message.id)
        default:
            await client.reply(from, `Don't use unlisted commands, Baka!`, id)
            console.log(color('[UNLISTED]', 'red'), color(time, 'yellow'), 'Unregistered Command from', color(pushname))
            break
            
        }
    }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}