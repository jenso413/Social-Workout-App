const { User } = require("../models/User");
const cron = require('node-cron')

module.exports = cron.schedule('00 00 00 * * *', async () => {
    const allUsers = await User.find({})
    for (let user of allUsers) {
        if (user.loggedToday) {
            user.loggedToday = false
            user.save()
        } else {
            user.streak = 0
            user.save()
        }
    }
    console.log('Streaks updated')
})

// STREAKS TO DO LIST

// Plug in info for streaks in friends page
// Add leaderboard to display streaks, toggle between all friends and just community members
// Change toggle on posts: default is just community members, discover is all communities (list community next to user in post)
// need to set up a socket for streaks so it can constantly update along with DB
// need to make it so as long as you're following a program (including rest days) streak will update
// so streak doesn't reset to 0 if you're on a rest day